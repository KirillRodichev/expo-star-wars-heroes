import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { characterApi } from './character-api';
import { SearchParams } from '../model/types';
import { useDebounce } from '../../../shared/lib/useDebounce';

export const characterQueryKeys = {
  all: () => ['characters'] as const,
  lists: () => [...characterQueryKeys.all(), 'list'] as const,
  list: (params: SearchParams) => [...characterQueryKeys.lists(), params] as const,
  infinite: (search?: string) => [...characterQueryKeys.lists(), 'infinite', search] as const,
  details: () => [...characterQueryKeys.all(), 'detail'] as const,
  detail: (id: string) => [...characterQueryKeys.details(), id] as const,
};



export const useInfinitePeople = (_search?: string) => {
  const search = useDebounce(_search, 300);

  return useInfiniteQuery({
    queryKey: characterQueryKeys.infinite(search),
    queryFn: ({ pageParam = 1 }) => 
      characterApi.getPeople({ page: pageParam, search }),
    getNextPageParam: (lastPage, allPages) => 
      lastPage.next ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePerson = (id: string) => {
  return useQuery({
    queryKey: characterQueryKeys.detail(id),
    queryFn: () => characterApi.getPerson(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};
