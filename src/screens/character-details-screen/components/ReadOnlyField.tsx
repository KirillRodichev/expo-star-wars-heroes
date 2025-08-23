import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTestIDs } from '../../../shared/lib/useTestIDs';

interface ReadOnlyFieldProps {
  label: string;
  value: string | number;
  testID?: string;
}

export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({ label, value, testID }) => {
  const fieldTestID = testID || 'read-only-field';
  const testIDs = useTestIDs(fieldTestID, ['label', 'value']);
  
  return (
    <View style={styles.readOnlyField} testID={testIDs.root}>
      <Text style={styles.readOnlyLabel} testID={testIDs.label}>{label}</Text>
      <Text style={styles.readOnlyValue} testID={testIDs.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  readOnlyField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  readOnlyLabel: {
    fontSize: 16,
    color: '#666',
  },
  readOnlyValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
