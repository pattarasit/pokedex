import { useGetAllPokemon, useGetPokemon } from '../../hook/use-get-pokemon';
import { Pokemon, DataPokemonList } from '../../types/pokemon';
import { useMemo, useState } from 'react';
import { PokemonCard } from '@/components/pokemon/pokemon-card';
import { ComparisonTable } from '@/components/comparison-table';
import { PokemonPagination } from '@/components/pokemon/pokemon-pagination';
import { useQueries } from '@tanstack/react-query';

export const Pokedex = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(undefined);
  const { data } = useGetAllPokemon();
  const { data: pokemon } = useGetPokemon(selectedPokemon);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.count / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const dataForDisplay = data?.results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pokemonQueries = useQueries({
    queries: (dataForDisplay || []).map((pokemon: Pokemon) => ({
      queryKey: ['pokemon', pokemon.url],
      queryFn: () => fetch(pokemon.url).then(res => res.json()),
      staleTime: Infinity,
    })),
  });

  const dataPokemon: DataPokemonList[] = useMemo(() => {
    const allLoaded = pokemonQueries.every(query => query.isSuccess);
    if (!allLoaded) return [];

    return pokemonQueries.map(query => {
      const pokemonData = query.data as any;
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        type: pokemonData.types[0]?.type?.name || 'unknown',
        image: pokemonData.sprites?.front_default || '',
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}`,
      };
    });
  }, [pokemonQueries]);

  const handleClick = (url: string) => {
    setSelectedPokemon(url);
  };

  return (
    <div className="flex flex-col gap-8 ">
      <h1>Pokedex</h1>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <ComparisonTable dataPokemon={dataPokemon} onClick={handleClick} />
          <PokemonPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>

        <div className="col-span-2 sticky top-4 self-start">
          {pokemon && <PokemonCard pokemon={pokemon} />}
        </div>
      </div>
    </div>
  );
};
