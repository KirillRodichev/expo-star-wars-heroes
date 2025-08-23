import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from 'react-native';
import { Person } from '../../../entities/character/model/types';
import { useCharactersStore } from '../../../entities/character/store/charactersStore';
import { 
  characterFormSchema, 
  CharacterFormData, 
  ValidatedCharacter 
} from '../../../entities/character/model/schema';
import { ALERT_MESSAGES, ALERT_STYLES } from './constants';

interface UseCharacterFormProps {
  initialCharacter: Person | undefined;
}

export const useCharacterForm = ({ initialCharacter }: UseCharacterFormProps) => {
  const { updateCharacter, getCharacter, resetCharacter, hasChanges } = useCharactersStore();
  const [isEditing, setIsEditing] = useState(false);

  const character = initialCharacter ? getCharacter(initialCharacter.url, initialCharacter) : undefined;

  const createFormValues = (char: typeof character): CharacterFormData => ({
    name: char?.name || '',
    birth_year: char?.birth_year || '',
    height: char?.height || '',
    mass: char?.mass || '',
    hair_color: char?.hair_color || '',
    skin_color: char?.skin_color || '',
    eye_color: char?.eye_color || '',
    gender: char?.gender || '',
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CharacterFormData>({
    resolver: zodResolver(characterFormSchema),
    defaultValues: createFormValues(character),
    mode: 'onBlur',
  });

  const handleSave = (formData: CharacterFormData) => {
    if (!character || !initialCharacter) return;
    
    const validatedCharacter: ValidatedCharacter = {
      ...character,
      ...formData,
    };
    
    updateCharacter(validatedCharacter);
    setIsEditing(false);
    Alert.alert(ALERT_MESSAGES.SUCCESS_SAVE_TITLE, ALERT_MESSAGES.SUCCESS_SAVE_MESSAGE);
  };

  const handleCancel = () => {
    if (!character) return;
    
    reset(createFormValues(character));
    setIsEditing(false);
  };

  const handleReset = () => {
    if (!initialCharacter) return;
    
    Alert.alert(
      ALERT_MESSAGES.RESET_TITLE,
      ALERT_MESSAGES.RESET_MESSAGE,
      [
        { text: ALERT_MESSAGES.CANCEL, style: ALERT_STYLES.CANCEL },
        {
          text: ALERT_MESSAGES.RESET,
          style: ALERT_STYLES.DESTRUCTIVE,
          onPress: () => {
            resetCharacter(initialCharacter.url);
            reset(createFormValues(initialCharacter));
            setIsEditing(false);
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const hasLocalChanges = initialCharacter ? hasChanges(initialCharacter.url) : false;

  return {
    character,
    hasLocalChanges,

    isEditing,
    control,
    errors,
    isValid,

    handleSave: handleSubmit(handleSave),
    handleCancel,
    handleReset,
    handleEdit,
  };
};
