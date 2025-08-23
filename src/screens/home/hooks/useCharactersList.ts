import { useState, useMemo } from 'react';
import { useInfinitePeople } from '../../../entities/character/api';

export const useCharactersList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfinitePeople(searchQuery);

  const allCharacters = useMemo(() => {
    return data?.pages.flatMap(page => page.results) ?? [];
  }, [data]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    searchQuery,
    allCharacters,
    isLoading,
    isError,
    error: error?.message || 'Unknown error',
    isFetchingNextPage,
    
    handleSearchChange,
    handleEndReached,
    refetch,
  };
};
