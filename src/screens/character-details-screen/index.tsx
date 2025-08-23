import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation.types';
import { 
  ErrorContent, 
  LoadingContent, 
  CharacterFormContent 
} from './components';
import { useCharacterForm } from './hooks/useCharacterForm';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetail'>;

export const CharacterDetailScreen = ({ route, navigation }: ScreenProps) => {
  const { character: initialCharacter, characterId } = route.params;

  const {
    character,
    hasLocalChanges,
    isEditing,
    control,
    errors,
    isValid,
    handleSave,
    handleCancel,
    handleReset,
    handleEdit,
  } = useCharacterForm({ initialCharacter });

  if (!initialCharacter) {
    return (
      <ErrorContent 
        characterId={characterId} 
        onGoBack={() => navigation.goBack()} 
      />
    );
  }

  if (!character) {
    return <LoadingContent />;
  }

  return (
    <CharacterFormContent
      character={character}
      hasLocalChanges={hasLocalChanges}
      isEditing={isEditing}
      control={control}
      errors={errors}
      isValid={isValid}
      onSave={handleSave}
      onCancel={handleCancel}
      onReset={handleReset}
      onEdit={handleEdit}
    />
  );
};


