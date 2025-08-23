import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';

interface LoadingContentProps {
  text?: string;
}

export const LoadingContent: React.FC<LoadingContentProps> = ({ 
  text = 'Loading character details...' 
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <LoadingSpinner text={text} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
