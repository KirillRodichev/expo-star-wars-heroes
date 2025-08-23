import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { ErrorContent } from '../ErrorContent';
import { 
  renderWithProviders, 
  createMockFunction,
  expectElementToBeVisible,
  expectFunctionToHaveBeenCalledWith,
  expectFunctionToHaveBeenCalledTimes
} from '../../../../test/ui-utils';

const createErrorContentTestSetup = (props = {}) => {
  const defaultProps = {
    onGoBack: createMockFunction(),
    ...props,
  };

  const renderResult = renderWithProviders(<ErrorContent {...defaultProps} />);
  
  return {
    ...renderResult,
    props: defaultProps,
  };
};

describe('ErrorContent', () => {
  describe('rendering behavior', () => {
    describe('given no character ID', () => {
      it('should render error message without ID', () => {
        createErrorContentTestSetup();

        expectElementToBeVisible(screen.getByTestId('error-message-text'));
      });

      it('should render go back button', () => {
        createErrorContentTestSetup();

        expectElementToBeVisible(screen.getByTestId('error-message-retry-button'));
      });
    });

    describe('given character ID', () => {
      it('should render error message with ID', () => {
        const characterId = '123';
        createErrorContentTestSetup({ characterId });

        expectElementToBeVisible(screen.getByTestId('error-message-text'));
      });

      it('should render go back button with ID present', () => {
        const characterId = '456';
        createErrorContentTestSetup({ characterId });

        expectElementToBeVisible(screen.getByTestId('error-message-retry-button'));
      });
    });
  });

  describe('user interaction behavior', () => {
    describe('when user taps go back button', () => {
      it('should call onGoBack function', () => {
        const { props } = createErrorContentTestSetup();

        const goBackButton = screen.getByTestId('error-message-retry-button');
        fireEvent.press(goBackButton);

        expectFunctionToHaveBeenCalledWith(props.onGoBack);
      });

      it('should call onGoBack only once per tap', () => {
        const { props } = createErrorContentTestSetup();

        const goBackButton = screen.getByTestId('error-message-retry-button');
        fireEvent.press(goBackButton);

        expectFunctionToHaveBeenCalledTimes(props.onGoBack, 1);
      });
    });

    describe('when user taps go back button multiple times', () => {
      it('should call onGoBack for each tap', () => {
        const { props } = createErrorContentTestSetup();

        const goBackButton = screen.getByTestId('error-message-retry-button');
        fireEvent.press(goBackButton);
        fireEvent.press(goBackButton);
        fireEvent.press(goBackButton);

        expectFunctionToHaveBeenCalledTimes(props.onGoBack, 3);
      });
    });
  });

  describe('accessibility behavior', () => {
    it('should have descriptive error message', () => {
      createErrorContentTestSetup();

      const errorMessage = screen.getByTestId('error-message-text');
      expectElementToBeVisible(errorMessage);
    });

    it('should have descriptive error message with ID', () => {
      const characterId = '789';
      createErrorContentTestSetup({ characterId });

      const errorMessage = screen.getByTestId('error-message-text');
      expectElementToBeVisible(errorMessage);
    });

    it('should have accessible go back button', () => {
      createErrorContentTestSetup();

      const goBackButton = screen.getByTestId('error-message-retry-button');
      expectElementToBeVisible(goBackButton);
    });
  });

  describe('edge cases', () => {
    it('should handle empty character ID', () => {
      createErrorContentTestSetup({ characterId: '' });

      expectElementToBeVisible(screen.getByTestId('error-message-text'));
    });

    it('should handle undefined character ID', () => {
      createErrorContentTestSetup({ characterId: undefined });

      expectElementToBeVisible(screen.getByTestId('error-message-text'));
    });

    it('should handle very long character ID', () => {
      const longCharacterId = 'very-long-character-id-that-might-be-too-long-for-display';
      createErrorContentTestSetup({ characterId: longCharacterId });

      expectElementToBeVisible(screen.getByTestId('error-message-text'));
    });
  });
});
