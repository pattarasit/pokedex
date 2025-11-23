import { useQuery } from '@tanstack/react-query';

export const useGetAllPokemon = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon-all'],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`).then(res => res.json()),
  });

  return { data, isLoading, error };
};

export const useGetPokemon = (url: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon-', url],
    queryFn: () => fetch(url || '').then(res => res.json()),
    enabled: !!url,
  });

  return { data, isLoading, error };
};
