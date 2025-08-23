import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Control, FieldErrors } from 'react-hook-form';
import { ValidatedField } from '../../../shared/ui/ValidatedField';
import { CharacterFormData, ValidatedCharacter } from '../../../entities/character/model/schema';
import { ReadOnlySection } from './ReadOnlySection';
import { CharacterFormActions } from './CharacterFormActions';

interface CharacterFormContentProps {
  character: ValidatedCharacter;
  hasLocalChanges: boolean;
  isEditing: boolean;
  control: Control<CharacterFormData>;
  errors: FieldErrors<CharacterFormData>;
  isValid: boolean;
  onSave: () => void;
  onCancel: () => void;
  onReset: () => void;
  onEdit: () => void;
}

export const CharacterFormContent: React.FC<CharacterFormContentProps> = ({
  character,
  hasLocalChanges,
  isEditing,
  control,
  errors,
  isValid,
  onSave,
  onCancel,
  onReset,
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <ValidatedField
              name="birth_year"
              label="Birth Year"
              control={control}
              placeholder="e.g., 19BBY"
              error={errors.birth_year}
              testID="birth-year-field"
            />

            <ValidatedField
              name="height"
              label="Height (cm)"
              control={control}
              placeholder="Enter height in centimeters"
              error={errors.height}
              testID="height-field"
            />

            <ValidatedField
              name="mass"
              label="Mass (kg)"
              control={control}
              placeholder="Enter mass in kilograms"
              error={errors.mass}
              testID="mass-field"
            />

            <ValidatedField
              name="hair_color"
              label="Hair Color"
              control={control}
              placeholder="Enter hair color"
              error={errors.hair_color}
              testID="hair-color-field"
            />

            <ValidatedField
              name="skin_color"
              label="Skin Color"
              control={control}
              placeholder="Enter skin color"
              error={errors.skin_color}
              testID="skin-color-field"
            />

            <ValidatedField
              name="eye_color"
              label="Eye Color"
              control={control}
              placeholder="Enter eye color"
              error={errors.eye_color}
              testID="eye-color-field"
            />

            <ValidatedField
              name="gender"
              label="Gender"
              control={control}
              placeholder="Enter gender"
              error={errors.gender}
              testID="gender-field"
            />

            <ReadOnlySection character={character} />
          </View>
        </ScrollView>

        <CharacterFormActions
          isEditing={isEditing}
          hasLocalChanges={hasLocalChanges}
          isValid={isValid}
          onSave={onSave}
          onCancel={onCancel}
          onReset={onReset}
          onEdit={onEdit}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  editedBadge: {
    backgroundColor: '#ff9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  editedBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
});
