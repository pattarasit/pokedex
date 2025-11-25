import { EvolutionChain, Pokemon } from '@/types/pokemon';
import { useQuery } from '@tanstack/react-query';

export const useGetAllPokemon = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon-all'],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`).then(res => res.json()),
  });

  return { data: data?.results as Pokemon[] | undefined, isLoading, error };
};

export const useGetPokemon = (url: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon-', url],
    queryFn: () => fetch(url || '').then(res => res.json()),
    enabled: !!url,
  });

  return { data, isLoading, error };
};

export const useGetPokemonSpecies = (name: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['evolution-chain', name],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(res => res.json()),
    enabled: !!name,
  });

  return { data, isLoading, error };
};

export const useGetEvolutionChain = (name: string | undefined) => {
  const { data: species } = useGetPokemonSpecies(name);
  const url = species?.evolution_chain?.url;

  const { data, isLoading, error } = useQuery({
    queryKey: ['evolution-chain', url],
    queryFn: () => fetch(url || '').then(res => res.json()),
    enabled: !!url,
  });

  return { data: data as EvolutionChain | undefined, isLoading, error };
};

export const useGetPokemonType = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon-type'],
    queryFn: () => fetch('https://pokeapi.co/api/v2/type').then(res => res.json()),
  });

  return { data: data?.results as Pokemon[] | undefined, isLoading, error };
};

export const useGetPokemonByType = (url: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon-by-type', url],
    queryFn: () => fetch(url || '').then(res => res.json()),
    enabled: !!url,
  });

  const pokemonData = data?.pokemon.map((pokemon: { pokemon: Pokemon }) => ({
    name: pokemon?.pokemon.name,
    url: pokemon?.pokemon.url,
  }));

  return { data: pokemonData, isLoading, error };
};
