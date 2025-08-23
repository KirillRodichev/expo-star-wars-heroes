import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  describe('basic functionality', () => {
    it('should return initial value immediately', () => {
      const { result } = renderHook(() => useDebounce('initial', 300));
      
      expect(result.current).toBe('initial');
    });

    it('should return debounced value after delay', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 300 } }
      );

      expect(result.current).toBe('initial');

      rerender({ value: 'updated', delay: 300 });
      expect(result.current).toBe('initial');

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(result.current).toBe('updated');
    });

    it('should cancel previous timer when value changes quickly', () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: 'initial', delay: 300 } }
      );

      rerender({ value: 'first', delay: 300 });
      
      act(() => {
        jest.advanceTimersByTime(150);
      });
      expect(result.current).toBe('initial');

      rerender({ value: 'second', delay: 300 });
      
      act(() => {
        jest.advanceTimersByTime(150);
      });
      expect(result.current).toBe('initial');

      act(() => {
        jest.advanceTimersByTime(150);
      });
      expect(result.current).toBe('second');
    });
  });

  describe('cleanup', () => {
    it('should cleanup timer on unmount', () => {
      const clearTimeoutSpy = jest.spyOn(globalThis, 'clearTimeout');
      
      const { result, rerender, unmount } = renderHook(
        ({ value }) => useDebounce(value, 300),
        { initialProps: { value: 'initial' } }
      );

      rerender({ value: 'updated' });
      
      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      clearTimeoutSpy.mockRestore();
    });
  });

  describe('integration scenarios', () => {
    it('should work in search scenario', () => {
      const { result, rerender } = renderHook(
        ({ searchTerm }) => useDebounce(searchTerm, 300),
        { initialProps: { searchTerm: '' } }
      );

      const searchSequence = ['l', 'lu', 'luk', 'luke'];
      
      searchSequence.forEach((term, index) => {
        rerender({ searchTerm: term });
        if (index < searchSequence.length - 1) {
          act(() => {
            jest.advanceTimersByTime(100);
          });
        }
      });

      expect(result.current).toBe('');

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(result.current).toBe('luke');
    });

    it('should handle backspace in search', () => {
      const { result, rerender } = renderHook(
        ({ searchTerm }) => useDebounce(searchTerm, 200),
        { initialProps: { searchTerm: 'luke' } }
      );

      rerender({ searchTerm: 'luk' });
      rerender({ searchTerm: 'lu' });
      rerender({ searchTerm: 'l' });
      rerender({ searchTerm: '' });

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(result.current).toBe('');
    });
  });
});
