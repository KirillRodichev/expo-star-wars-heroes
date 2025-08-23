import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage';
import { useTestIDs } from '../../../shared/lib/useTestIDs';

interface ErrorContentProps {
  characterId?: string;
  onGoBack: () => void;
}

export const ErrorContent: React.FC<ErrorContentProps> = ({ 
  characterId, 
  onGoBack 
}) => {
  const testIDs = useTestIDs('error-content', []);
  
  return (
    <SafeAreaView style={styles.container} testID={testIDs.root}>
      <View style={styles.fallbackContainer}>
        <ErrorMessage
          error={`Character not found${characterId ? ` (ID: ${characterId})` : ''}. Please go back and try again.`}
          onRetry={onGoBack}
          retryText="Go Back"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
