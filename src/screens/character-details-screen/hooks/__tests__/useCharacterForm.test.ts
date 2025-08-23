import { act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import {
  createUseCharacterFormTestSetup,
  expectCharacterWasResetInStore,
  expectCharacterWasUpdatedInStore,
  expectResetConfirmationDialog,
  expectSuccessfulSave,
  getResetButton,
  mockLuke,
  setupMocks
} from './test-utils';

jest.mock('react-native', () => ({
  Alert: { alert: jest.fn() },
}));

jest.mock('../../../../entities/character/store/charactersStore');

describe('useCharacterForm', () => {
  beforeEach(() => {
    setupMocks();
  });

  describe('initialization behavior', () => {
    describe('given a valid character', () => {
      it('should initialize in view mode with character data', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        
        const { result } = setup.renderHook();

        expect(result.current.character).toEqual(mockLuke);
        expect(result.current.isEditing).toBe(false);
        expect(result.current.hasLocalChanges).toBe(false);
      });
    });

    describe('given no character', () => {
      it('should initialize with undefined character and safe defaults', () => {
        const setup = createUseCharacterFormTestSetup(undefined);
        
        const { result } = setup.renderHook();
        expect(result.current.character).toBeUndefined();
        expect(result.current.isEditing).toBe(false);
        expect(result.current.hasLocalChanges).toBe(false);
      });
    });
  });

  describe('editing mode transitions', () => {
    describe('when starting to edit', () => {
      it('should enter editing mode', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();
        expect(result.current.isEditing).toBe(false);

        act(() => {
          result.current.handleEdit();
        });

        expect(result.current.isEditing).toBe(true);
      });
    });

    describe('when canceling edit', () => {
      it('should exit editing mode and reset form', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();
        
        act(() => {
          result.current.handleEdit();
        });
        expect(result.current.isEditing).toBe(true);

        act(() => {
          result.current.handleCancel();
        });

        expect(result.current.isEditing).toBe(false);
      });

      it('should handle cancel gracefully when no character exists', () => {
        const setup = createUseCharacterFormTestSetup(undefined);
        const { result } = setup.renderHook();

        expect(() => {
          act(() => {
            result.current.handleCancel();
          });
        }).not.toThrow();
      });
    });
  });

  describe('save functionality', () => {
    describe('when saving valid character changes', () => {
      it('should persist changes and exit editing mode', async () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();
        
        act(() => {
          result.current.handleEdit();
        });

        await act(async () => {
          await result.current.handleSave();
        });

        expect(result.current.isEditing).toBe(false);
        expectSuccessfulSave();
        expectCharacterWasUpdatedInStore(setup.mockStore, mockLuke);
      });
    });

    describe('when attempting to save without character', () => {
      it('should not perform save operation', () => {
        const setup = createUseCharacterFormTestSetup(undefined);
        const { result } = setup.renderHook();

        act(() => {
          result.current.handleSave();
        });

        expect(setup.mockStore.updateCharacter).not.toHaveBeenCalled();
        expect(Alert.alert).not.toHaveBeenCalled();
      });
    });
  });

  describe('reset functionality', () => {
    describe('when requesting reset', () => {
      it('should show confirmation dialog', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();

        act(() => {
          result.current.handleReset();
        });

        expectResetConfirmationDialog();
      });
    });

    describe('when confirming reset', () => {
      it('should reset character to original state', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();
        
        act(() => {
          result.current.handleReset();
        });

        const resetButton = getResetButton();
        act(() => {
          resetButton?.onPress?.();
        });

        expectCharacterWasResetInStore(setup.mockStore);
        expect(result.current.isEditing).toBe(false);
      });
    });

    describe('when character is undefined', () => {
      it('should not show reset dialog', () => {
        const setup = createUseCharacterFormTestSetup(undefined);
        const { result } = setup.renderHook();

        act(() => {
          result.current.handleReset();
        });

        expect(Alert.alert).not.toHaveBeenCalled();
      });
    });
  });

  describe('form state management', () => {
    describe('form controls and validation', () => {
      it('should expose necessary form controls', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        
        const { result } = setup.renderHook();

        expect(result.current.control).toBeDefined();
        expect(result.current.errors).toBeDefined();
        expect(typeof result.current.isValid).toBe('boolean');
      });
    });

    describe('local changes tracking', () => {
      it('should reflect store state changes', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        setup.mockStore.hasChanges.mockReturnValue(false);
        
        const { result } = setup.renderHook();
        expect(result.current.hasLocalChanges).toBe(false);

        setup.mockStore.hasChanges.mockReturnValue(true);
        const { result: result2 } = setup.renderHook();
        expect(result2.current.hasLocalChanges).toBe(true);
      });
    });
  });

  describe('character data synchronization', () => {
    describe('when character data changes in store', () => {
      it('should reflect updated character data', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();
        expect(result.current.character).toEqual(mockLuke);

        const updatedCharacter = { ...mockLuke, name: 'Updated Luke' };
        setup.mockStore.getCharacter.mockReturnValue(updatedCharacter);
        const { result: result2 } = setup.renderHook();
        expect(result2.current.character).toEqual(updatedCharacter);
      });
    });

    describe('when character becomes unavailable', () => {
      it('should handle transition to undefined character', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();
        expect(result.current.character).toEqual(mockLuke);

        const setup2 = createUseCharacterFormTestSetup(undefined);
        const { result: result2 } = setup2.renderHook();
        expect(result2.current.character).toBeUndefined();
      });
    });
  });

  describe('workflow scenarios', () => {
    describe('typical editing workflow', () => {
      it('should support complete edit-save cycle', async () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();

        act(() => {
          result.current.handleEdit();
        });
        expect(result.current.isEditing).toBe(true);

        await act(async () => {
          await result.current.handleSave();
        });
        expect(result.current.isEditing).toBe(false);

        act(() => {
          result.current.handleEdit();
        });
        
        expect(result.current.isEditing).toBe(true);
      });

      it('should support edit-cancel-edit cycle', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();

        act(() => {
          result.current.handleEdit();
          result.current.handleCancel();
          result.current.handleEdit();
        });

        expect(result.current.isEditing).toBe(true);
      });
    });

    describe('rapid state changes', () => {
      it('should maintain consistent state during rapid transitions', () => {
        const setup = createUseCharacterFormTestSetup(mockLuke);
        const { result } = setup.renderHook();

        act(() => {
          result.current.handleEdit();
          result.current.handleCancel();
          result.current.handleEdit();
          result.current.handleCancel();
        });

        expect(result.current.isEditing).toBe(false);
      });
    });
  });
});