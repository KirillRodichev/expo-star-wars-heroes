import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTestIDs } from '../lib/useTestIDs';

interface ErrorMessageProps {
  error: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  error, 
  onRetry, 
  retryText = 'Retry' 
}) => {
  const testIDs = useTestIDs('error-message', ['text', 'retry-button']);
  
  return (
    <View style={styles.container} testID={testIDs.root}>
      <Text style={styles.errorText} testID={testIDs.text}>{error}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry} testID={testIDs['retry-button']}>
          <Text style={styles.retryButtonText}>{retryText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
