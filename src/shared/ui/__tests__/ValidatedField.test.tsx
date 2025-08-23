import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import { ValidatedField } from '../ValidatedField';
import { CharacterFormData } from '../../../entities/character/model/schema';
import {
  renderWithProviders,
  createMockFunction,
  expectElementToBeVisible,
  expectElementToHaveText,
  expectFunctionToHaveBeenCalledWith,
  expectFunctionToHaveBeenCalledTimes
} from '../../../test/ui-utils';

const TestComponent: React.FC<{ props?: any }> = ({ props = {} }) => {
  const { control } = useForm<CharacterFormData>({
    defaultValues: {
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
    },
  });

  return (
    <ValidatedField
      name="height"
      label="Height"
      control={control}
      placeholder="Enter height"
      {...props}
    />
  );
};

const createValidatedFieldTestSetup = (props = {}) => {
  const defaultProps = {
    name: 'height' as keyof CharacterFormData,
    label: 'Height',
    placeholder: 'Enter height',
    ...props,
  };

  return {
    props: defaultProps,
    render: () => renderWithProviders(<TestComponent props={defaultProps} />),
  };
};

describe('ValidatedField', () => {
  describe('rendering behavior', () => {
    it('should render with label and placeholder', () => {
      const setup = createValidatedFieldTestSetup();
      setup.render();

      expectElementToBeVisible(screen.getByText('Height'));
      expectElementToBeVisible(screen.getByPlaceholderText('Enter height'));
    });

    it('should render input field with correct testID', () => {
      const setup = createValidatedFieldTestSetup();
      setup.render();

      const input = screen.getByTestId('validated-field-input');
      expect(input).toBeTruthy();
    });

    it('should render multiline input when specified', () => {
      const setup = createValidatedFieldTestSetup({ multiline: true });
      setup.render();

      const input = screen.getByTestId('validated-field-input');
      expect(input.props.multiline).toBe(true);
      expect(input.props.numberOfLines).toBe(3);
    });
  });

  describe('user interactions', () => {
    it('should handle text input changes', () => {
      const setup = createValidatedFieldTestSetup();
      setup.render();

      const input = screen.getByTestId('validated-field-input');
      fireEvent.changeText(input, '180');

      expect(input.props.value).toBe('180');
    });

    it('should handle onBlur event', () => {
      const setup = createValidatedFieldTestSetup();
      setup.render();

      const input = screen.getByTestId('validated-field-input');
      fireEvent(input, 'blur');

      expect(input).toBeTruthy();
    });

    it('should handle multiline text input', () => {
      const setup = createValidatedFieldTestSetup({ 
        multiline: true,
        placeholder: 'Enter description'
      });
      setup.render();

      const input = screen.getByTestId('validated-field-input');
      fireEvent.changeText(input, 'This is a\nmultiline\ntext');

      expect(input.props.value).toBe('This is a\nmultiline\ntext');
    });
  });

  describe('error handling', () => {
    it('should display error message when error is provided', () => {
      const setup = createValidatedFieldTestSetup({
        error: { type: 'required', message: 'Height is required' }
      });
      setup.render();

      expectElementToBeVisible(screen.getByText('Height is required'));
    });

    it('should apply error styling to input when error is present', () => {
      const setup = createValidatedFieldTestSetup({
        error: { type: 'required', message: 'Height is required' }
      });
      setup.render();

      const input = screen.getByTestId('validated-field-input');
      expect(input.props.style).toContainEqual(
        expect.objectContaining({ borderColor: '#FF3B30' })
      );
    });

    it('should not display error message when no error is provided', () => {
      const setup = createValidatedFieldTestSetup();
      setup.render();

      expect(screen.queryByText('Height is required')).toBeNull();
    });
  });

  describe('different field types', () => {
    it('should render height field correctly', () => {
      const setup = createValidatedFieldTestSetup({
        name: 'height',
        label: 'Height',
        placeholder: 'Enter height'
      });
      setup.render();

      expectElementToBeVisible(screen.getByText('Height'));
      expectElementToBeVisible(screen.getByPlaceholderText('Enter height'));
    });

    it('should render mass field correctly', () => {
      const setup = createValidatedFieldTestSetup({
        name: 'mass',
        label: 'Mass',
        placeholder: 'Enter mass'
      });
      setup.render();

      expectElementToBeVisible(screen.getByText('Mass'));
      expectElementToBeVisible(screen.getByPlaceholderText('Enter mass'));
    });

    it('should render gender field correctly', () => {
      const setup = createValidatedFieldTestSetup({
        name: 'gender',
        label: 'Gender',
        placeholder: 'Enter gender'
      });
      setup.render();

      expectElementToBeVisible(screen.getByText('Gender'));
      expectElementToBeVisible(screen.getByPlaceholderText('Enter gender'));
    });
  });

  describe('accessibility', () => {
    it('should have proper accessibility labels', () => {
      const setup = createValidatedFieldTestSetup();
      setup.render();

      const input = screen.getByPlaceholderText('Enter height');
      expect(input).toBeTruthy();
    });

    it('should handle placeholder text color', () => {
      const setup = createValidatedFieldTestSetup();
      setup.render();

      const input = screen.getByPlaceholderText('Enter height');
      expect(input.props.placeholderTextColor).toBe('#999');
    });
  });
});
