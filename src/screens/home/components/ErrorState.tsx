import React from 'react';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <ErrorMessage
      error={`Error loading characters: ${error}`}
      onRetry={onRetry}
    />
  );
};
