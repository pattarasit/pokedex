import { useGetPokemon } from '../../hook/use-get-pokemon';
import { useState } from 'react';
import { PokemonCard } from '@/components/pokemon/pokemon-card';
import PokemonTable from '@/components/pokemon/pokemon-table';

export const Pokedex = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(undefined);
  const { data: pokemon } = useGetPokemon(selectedPokemon);

  const handleSelectPokemon = (url: string) => {
    setSelectedPokemon(url);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1>Pokedex</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <PokemonTable handleSelectPokemon={handleSelectPokemon} />
        </div>

        <div className="col-span-5 sticky top-4 self-start">
          {pokemon && <PokemonCard pokemon={pokemon} />}
        </div>
      </div>
    </div>
  );
};
