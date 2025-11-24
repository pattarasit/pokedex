import { useGetEvolutionChain, useGetPokemon } from '../../hook/use-get-pokemon';
import { useState } from 'react';
import { PokemonCard } from '@/components/pokemon/pokemon-card';
import PokemonTable from '@/components/pokemon/pokemon-table';
import { Pokemon } from '@/types/pokemon';
import { PokemonChain } from '@/components/pokemon/pokemon-chain';

export const Pokedex = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(undefined);
  const { data: pokemon } = useGetPokemon(selectedPokemon?.url);
  const { data: evolutionChain } = useGetEvolutionChain(selectedPokemon?.name);

  const handleSelectPokemon = (data: Pokemon) => {
    setSelectedPokemon(data);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1>Pokedex</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <PokemonTable handleSelectPokemon={handleSelectPokemon} />
        </div>

        <div className="col-span-5 sticky top-4 self-start flex flex-col gap-4">
          {pokemon && <PokemonCard pokemon={pokemon} />}
          {evolutionChain && <PokemonChain evolutionChain={evolutionChain} />}
        </div>
      </div>
    </div>
  );
};
