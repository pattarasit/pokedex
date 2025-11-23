import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const PokemonCard = ({ pokemon }: { pokemon: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </CardContent>
      <CardContent>
        <p>Type: {pokemon.types.map((type: any) => type.type.name).join(', ')}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
      </CardContent>
    </Card>
  );
};
