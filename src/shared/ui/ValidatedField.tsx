import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Control, Controller, FieldError } from 'react-hook-form';
import { CharacterFormData } from '../../entities/character/model/schema';
import { useTestIDs } from '../lib/useTestIDs';

interface ValidatedFieldProps {
  name: keyof CharacterFormData;
  label: string;
  control: Control<CharacterFormData>;
  placeholder?: string;
  multiline?: boolean;
  error?: FieldError;
  testID?: string;
}

export const ValidatedField: React.FC<ValidatedFieldProps> = ({
  name,
  label,
  control,
  placeholder,
  multiline = false,
  error,
  testID,
}) => {
  const fieldTestID = testID || 'validated-field';
  const testIDs = useTestIDs(fieldTestID, ['label', 'input', 'error']);
  return (
    <View style={styles.fieldContainer} testID={testIDs.root}>
      <Text style={styles.fieldLabel} testID={testIDs.label}>{label}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.fieldInput,
              multiline && styles.multilineInput,
              error && styles.errorInput,
            ]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="#999"
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}
            testID={testIDs.input}
          />
        )}
      />
      {error && <Text style={styles.errorText} testID={testIDs.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  fieldInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#333',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
});
