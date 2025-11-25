import { Card, CardContent, CardTitle } from '../ui/card';
import { PokemonDetail, PokemonStat, PokemonAbility } from '@/types/pokemon';

type PokemonCardProps = {
  pokemon: PokemonDetail;
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <Card>
      <CardContent className="flex justify-center flex-col items-center p-4">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <CardTitle>
          (#{pokemon.id}) <span className="capitalize">{pokemon.name}</span>
        </CardTitle>
      </CardContent>

      <CardContent className="text-left">
        {pokemon.stats.map((p: PokemonStat) => (
          <div key={p.stat.name} className="justify-between flex">
            <span className="font-semibold capitalize">{p.stat.name}:</span>
            <span>{p.base_stat}</span>
          </div>
        ))}
      </CardContent>
      <CardContent className="text-left">
        <p className="font-semibold">Abilities:</p>
        {pokemon.abilities.map((a: PokemonAbility) => (
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
