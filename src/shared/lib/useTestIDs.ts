import { useMemo } from 'react';

export function useTestIDs(base?: string, parts: string[] = []) {
  return useMemo(() => {
    const make = (s: string) => (base ? `${base}-${s}` : undefined);
    return parts.reduce<Record<string, string | undefined>>((acc, p) => {
      acc[p] = make(p);
      return acc;
    }, { root: base });
  }, [base, parts.join('|')]);
}
