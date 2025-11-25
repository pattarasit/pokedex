import { EvolutionChain, EvolutionDetail, PokemonSpecies } from '@/types/pokemon';
import { Card, CardContent } from '../ui/card';

type PokemonChainType = {
  evolutionChain: EvolutionChain;
};

export const PokemonChain = ({ evolutionChain }: PokemonChainType) => {
  const flattenEvolutionChain = (
    chain: EvolutionChain
  ): Array<{ species: PokemonSpecies; details: EvolutionDetail | null }> => {
    const result: Array<{ species: PokemonSpecies; details: EvolutionDetail | null }> = [
      { species: chain.chain.species, details: null },
    ];

    if (chain.chain.evolves_to && chain.chain.evolves_to.length > 0) {
      const nextEvolution = chain.chain.evolves_to[0];
      const evolutionDetail = nextEvolution.evolution_details[0] || null;
      result.push({
        species: nextEvolution.species,
        details: evolutionDetail,
      });

      if (nextEvolution.evolves_to && nextEvolution.evolves_to.length > 0) {
        const finalEvolution = nextEvolution.evolves_to[0];
        const finalDetail = finalEvolution.evolution_details[0] || null;
        result.push({
          species: finalEvolution.species,
          details: finalDetail,
        });
      }
    }

    return result;
  };

  const evolutionStages = flattenEvolutionChain(evolutionChain as EvolutionChain);

  return (
    <Card>
      <CardContent className="flex justify-center items-center p-6 gap-4">
        {evolutionStages.map((stage, index) => (
          <div key={stage?.species?.name} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center border-2 border-gray-200">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.species.url.split('/').slice(-2)[0]}.png`}
                  alt={stage.species.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <span className="capitalize font-semibold text-sm">{stage?.species?.name}</span> 
            </div>
            {index < evolutionStages.length - 1 && <div className="text-2xl text-gray-400">→</div>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
