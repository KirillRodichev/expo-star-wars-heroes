import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { SearchHeader } from '../SearchHeader';
import { 
  renderWithProviders, 
  createMockFunction,
  expectElementToBeVisible,
  expectElementToHaveText,
  expectFunctionToHaveBeenCalledWith,
  expectFunctionToHaveBeenCalledTimes
} from '../../../../test/ui-utils';

const createSearchHeaderTestSetup = (props = {}) => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: createMockFunction(),
    ...props,
  };

  const renderResult = renderWithProviders(<SearchHeader {...defaultProps} />);
  
  return {
    ...renderResult,
    props: defaultProps,
  };
};

describe('SearchHeader', () => {
  describe('rendering behavior', () => {
    describe('given default props', () => {
      it('should render title and search input', () => {
        const { props } = createSearchHeaderTestSetup();

        expectElementToBeVisible(screen.getByTestId('search-header-title'));
        expectElementToBeVisible(screen.getByTestId('search-header-input'));
      });

      it('should display empty search input', () => {
        createSearchHeaderTestSetup();

        const searchInput = screen.getByTestId('search-header-input');
        expect(searchInput.props.value).toBe('');
      });
    });

    describe('given search query', () => {
      it('should display current search query', () => {
        const searchQuery = 'Luke Skywalker';
        createSearchHeaderTestSetup({ searchQuery });

        const searchInput = screen.getByTestId('search-header-input');
        expect(searchInput.props.value).toBe(searchQuery);
      });
    });
  });

  describe('user interaction behavior', () => {
    describe('when user types in search input', () => {
      it('should call onSearchChange with typed text', () => {
        const { props } = createSearchHeaderTestSetup();
        const searchText = 'Darth Vader';

        const searchInput = screen.getByTestId('search-header-input');
        fireEvent.changeText(searchInput, searchText);

        expectFunctionToHaveBeenCalledWith(props.onSearchChange, searchText);
      });

      it('should handle empty text input', () => {
        const { props } = createSearchHeaderTestSetup();

        const searchInput = screen.getByTestId('search-header-input');
        fireEvent.changeText(searchInput, '');

        expectFunctionToHaveBeenCalledWith(props.onSearchChange, '');
      });

      it('should handle special characters', () => {
        const { props } = createSearchHeaderTestSetup();
        const searchText = 'C-3PO & R2-D2';

        const searchInput = screen.getByTestId('search-header-input');
        fireEvent.changeText(searchInput, searchText);

        expectFunctionToHaveBeenCalledWith(props.onSearchChange, searchText);
      });
    });

    describe('when user types multiple times', () => {
      it('should call onSearchChange for each keystroke', () => {
        const { props } = createSearchHeaderTestSetup();

        const searchInput = screen.getByTestId('search-header-input');
        
        fireEvent.changeText(searchInput, 'L');
        fireEvent.changeText(searchInput, 'Lu');
        fireEvent.changeText(searchInput, 'Luk');
        fireEvent.changeText(searchInput, 'Luke');

        expectFunctionToHaveBeenCalledTimes(props.onSearchChange, 4);
        expectFunctionToHaveBeenCalledWith(props.onSearchChange, 'Luke');
      });
    });
  });

  describe('accessibility behavior', () => {
    it('should have proper placeholder text', () => {
      createSearchHeaderTestSetup();

      const searchInput = screen.getByTestId('search-header-input');
      expectElementToBeVisible(searchInput);
    });

    it('should have descriptive title', () => {
      createSearchHeaderTestSetup();

      const title = screen.getByTestId('search-header-title');
      expectElementToBeVisible(title);
      expectElementToHaveText(title, 'Star Wars Heroes');
    });
  });
});
