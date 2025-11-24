import { Card, CardContent, CardTitle } from '../ui/card';

type Stats = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
  name: string;
};

type Abilities = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

export const PokemonCard = ({ pokemon }: { pokemon: any }) => {
  return (
    <Card>
      <CardContent className="flex justify-center flex-col items-center p-4">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <CardTitle>
          (#{pokemon.id}) <span className="capitalize">{pokemon.name}</span>
        </CardTitle>
      </CardContent>

      <CardContent className="text-left">
        {pokemon.stats.map((p: Stats) => (
          <div key={p.stat.name} className="justify-between flex">
            <span className="font-semibold capitalize">{p.stat.name}:</span>
            <span>{p.base_stat}</span>
          </div>
        ))}
      </CardContent>
      <CardContent className="text-left">
        <p className="font-semibold">Abilities:</p>
        {pokemon.abilities.map((a: Abilities) => (
          <div key={a.ability.name} className="justify-between flex items-center gap-1">
            <span className="capitalize w-[100px] shrink-0">{a.ability.name}:</span>
            {Array.from({ length: a.slot }).map((_, index) => (
              <div key={index} className="w-full h-2 bg-amber-600" />
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
