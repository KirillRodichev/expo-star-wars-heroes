import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTestIDs } from '../lib/useTestIDs';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = 'Loading...', 
  size = 'large',
  color = '#007AFF' 
}) => {
  const testIDs = useTestIDs('loading-spinner', ['indicator', 'text']);
  
  return (
    <View style={styles.container} testID={testIDs.root}>
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size={size} color={color} testID={testIDs.indicator} />
      </View>
      {text && <Text style={styles.text} testID={testIDs.text}>{text}</Text>}
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
  spinnerWrapper: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});
