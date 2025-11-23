import { Button } from "@/components/ui/button";
import { useGetAllPokemon, useGetPokemon } from "../../hook/use-get-pokemon";
import { Pokemon } from "../../types/pokemon";
import { useState } from "react";

export const Pokedex = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(undefined);
  const {data} = useGetAllPokemon();
  const {data: pokemon} = useGetPokemon(selectedPokemon);
  console.log('dpokemonata => ', pokemon);

  return (
    <div>
      <h1>Pokedex</h1>
      <div className="grid grid-cols-4 gap-4">
        {data?.results.map((pokemon: Pokemon) => (
          <Button onClick={() => setSelectedPokemon(pokemon.url)} key={pokemon.name}>{pokemon.name}</Button>
        ))}
      </div>


<div>
  {pokemon && (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </div>
  )}
</div>
    </div>
  )
}
