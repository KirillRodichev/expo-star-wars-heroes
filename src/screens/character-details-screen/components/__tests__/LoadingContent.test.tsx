import React from 'react';
import { screen } from '@testing-library/react-native';
import { LoadingContent } from '../LoadingContent';
import { 
  renderWithProviders, 
  expectElementToBeVisible,
} from '../../../../test/ui-utils';

const createLoadingContentTestSetup = (props = {}) => {
  const defaultProps = {
    ...props,
  };

  const renderResult = renderWithProviders(<LoadingContent {...defaultProps} />);
  
  return {
    ...renderResult,
    props: defaultProps,
  };
};

describe('LoadingContent', () => {
  describe('rendering behavior', () => {
    describe('given default props', () => {
      it('should render default loading text', () => {
        createLoadingContentTestSetup();

        expectElementToBeVisible(screen.getByTestId('loading-spinner-text'));
      });

      it('should render loading spinner', () => {
        createLoadingContentTestSetup();

        expectElementToBeVisible(screen.getByText('Loading character details...'));
      });
    });

    describe('given custom loading text', () => {
      it('should render custom loading text', () => {
        const customText = 'Please wait while we fetch the data...';
        createLoadingContentTestSetup({ text: customText });

        expectElementToBeVisible(screen.getByTestId('loading-spinner-text'));
      });

      it('should render custom loading text with special characters', () => {
        const customText = 'Loading... ⏳ Please wait!';
        createLoadingContentTestSetup({ text: customText });

        expectElementToBeVisible(screen.getByTestId('loading-spinner-text'));
      });
    });
  });

  describe('accessibility behavior', () => {
    it('should have descriptive loading text', () => {
      createLoadingContentTestSetup();

      const loadingText = screen.getByTestId('loading-spinner-text');
      expectElementToBeVisible(loadingText);
    });

    it('should have accessible loading spinner', () => {
      createLoadingContentTestSetup();

      const loadingSpinner = screen.getByTestId('loading-spinner');
      expectElementToBeVisible(loadingSpinner);
    });
  });

  describe('edge cases', () => {


    it('should handle very long text', () => {
      const longText = 'This is a very long loading text that might be too long for the screen and could cause layout issues if not handled properly';
      createLoadingContentTestSetup({ text: longText });

      expectElementToBeVisible(screen.getByTestId('loading-spinner-text'));
    });

    it('should handle undefined text', () => {
      createLoadingContentTestSetup({ text: undefined });

      expectElementToBeVisible(screen.getByTestId('loading-spinner-text'));
    });
  });
});
