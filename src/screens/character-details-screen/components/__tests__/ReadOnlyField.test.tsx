import React from 'react';
import { screen } from '@testing-library/react-native';
import { ReadOnlyField } from '../ReadOnlyField';
import { 
  renderWithProviders, 
  expectElementToBeVisible,
} from '../../../../test/ui-utils';

const createReadOnlyFieldTestSetup = (props = {}) => {
  const defaultProps = {
    label: 'Name',
    value: 'Luke Skywalker',
    testID: 'test-field',
    ...props,
  };

  const renderResult = renderWithProviders(<ReadOnlyField {...defaultProps} />);
  
  return {
    ...renderResult,
    props: defaultProps,
  };
};

describe('ReadOnlyField', () => {
  describe('rendering behavior', () => {
    describe('given string value', () => {
      it('should render label and value', () => {
        createReadOnlyFieldTestSetup();

        expectElementToBeVisible(screen.getByTestId('test-field-label'));
        expectElementToBeVisible(screen.getByTestId('test-field-value'));
      });

      it('should render different label and value', () => {
        createReadOnlyFieldTestSetup({
          label: 'Birth Year',
          value: '19BBY',
        });

        expectElementToBeVisible(screen.getByTestId('test-field-label'));
        expectElementToBeVisible(screen.getByTestId('test-field-value'));
      });
    });

    describe('given number value', () => {
      it('should render number value as string', () => {
        createReadOnlyFieldTestSetup({
          label: 'Height',
          value: 172,
        });

        expectElementToBeVisible(screen.getByTestId('test-field-label'));
        expectElementToBeVisible(screen.getByTestId('test-field-value'));
      });

      it('should render zero value', () => {
        createReadOnlyFieldTestSetup({
          label: 'Mass',
          value: 0,
        });

        expectElementToBeVisible(screen.getByTestId('test-field-label'));
        expectElementToBeVisible(screen.getByTestId('test-field-value'));
      });
    });
  });

  describe('accessibility behavior', () => {
    it('should have descriptive label', () => {
      createReadOnlyFieldTestSetup();

      const label = screen.getByTestId('test-field-label');
      expectElementToBeVisible(label);
    });

    it('should have readable value', () => {
      createReadOnlyFieldTestSetup();

      const value = screen.getByTestId('test-field-value');
      expectElementToBeVisible(value);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string value', () => {
      createReadOnlyFieldTestSetup({
        label: 'Species',
        value: '',
      });

      expectElementToBeVisible(screen.getByTestId('test-field-label'));
      expectElementToBeVisible(screen.getByTestId('test-field-value'));
    });

    it('should handle special characters in label', () => {
      createReadOnlyFieldTestSetup({
        label: 'Eye Color (RGB)',
        value: 'Blue',
      });

      expectElementToBeVisible(screen.getByTestId('test-field-label'));
      expectElementToBeVisible(screen.getByTestId('test-field-value'));
    });

    it('should handle special characters in value', () => {
      createReadOnlyFieldTestSetup({
        label: 'Name',
        value: 'C-3PO & R2-D2',
      });

      expectElementToBeVisible(screen.getByTestId('test-field-label'));
      expectElementToBeVisible(screen.getByTestId('test-field-value'));
    });
  });

  describe('multiple fields behavior', () => {
    it('should handle multiple fields with different testIDs', () => {
      renderWithProviders(
        <>
          <ReadOnlyField label="Name" value="Luke Skywalker" testID="name-field" />
          <ReadOnlyField label="Height" value="172" testID="height-field" />
          <ReadOnlyField label="Mass" value="77" testID="mass-field" />
        </>
      );

      expectElementToBeVisible(screen.getByTestId('name-field-label'));
      expectElementToBeVisible(screen.getByTestId('name-field-value'));
      expectElementToBeVisible(screen.getByTestId('height-field-label'));
      expectElementToBeVisible(screen.getByTestId('height-field-value'));
      expectElementToBeVisible(screen.getByTestId('mass-field-label'));
      expectElementToBeVisible(screen.getByTestId('mass-field-value'));
    });

    it('should use default testID when not provided', () => {
      renderWithProviders(
        <>
          <ReadOnlyField label="Name" value="Luke Skywalker" />
          <ReadOnlyField label="Height" value="172" />
        </>
      );

      const labels = screen.getAllByTestId('read-only-field-label');
      const values = screen.getAllByTestId('read-only-field-value');
      
      expect(labels).toHaveLength(2);
      expect(values).toHaveLength(2);
      expectElementToBeVisible(labels[0]);
      expectElementToBeVisible(labels[1]);
      expectElementToBeVisible(values[0]);
      expectElementToBeVisible(values[1]);
    });
  });
});
