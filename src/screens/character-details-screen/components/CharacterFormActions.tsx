import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CharacterFormActionsProps {
  isEditing: boolean;
  hasLocalChanges: boolean;
  isValid: boolean;
  onSave: () => void;
  onCancel: () => void;
  onReset: () => void;
  onEdit: () => void;
}

export const CharacterFormActions: React.FC<CharacterFormActionsProps> = ({
  isEditing,
  hasLocalChanges,
  isValid,
  onSave,
  onCancel,
  onReset,
  onEdit,
}) => {
  return (
    <View style={styles.buttonContainer}>
      {isEditing ? (
        <View style={styles.editingButtons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
            testID="cancel-button"
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button, 
              styles.saveButton,
              !isValid && styles.disabledButton
            ]}
            onPress={onSave}
            disabled={!isValid}
            testID="save-button"
          >
            <Text style={[
              styles.saveButtonText,
              !isValid && styles.disabledButtonText
            ]}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.viewingButtons}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={onEdit}
            testID="edit-button"
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          {hasLocalChanges && (
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={onReset}
              testID="reset-button"
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  editingButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  viewingButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  disabledButtonText: {
    color: '#888888',
  },
});
