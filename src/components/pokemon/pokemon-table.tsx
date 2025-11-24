import React, { useMemo, useState } from 'react';
import { ComparisonTable } from '../comparison-table';
import { PokemonPagination } from './pokemon-pagination';
import { useGetAllPokemon, useGetPokemonByType, useGetPokemonType } from '@/hook/use-get-pokemon';
import { useQueries } from '@tanstack/react-query';
import { DataPokemonList, Pokemon } from '@/types/pokemon';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

type PokemonTableProps = {
  handleSelectPokemon: (data: Pokemon) => void;
};

const PokemonTable = ({ handleSelectPokemon }: PokemonTableProps) => {
  const { data } = useGetAllPokemon();
  const { data: pokemonType } = useGetPokemonType();
  const [search, setSearch] = React.useState('');
  const [type, setType] = React.useState<string>('all');
  const { data: pokemonByType } = useGetPokemonByType(type);

  const pokeData = useMemo(() => {
    if (type === 'all') return data;
    return pokemonByType;
  }, [type, data, pokemonByType]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const extractIdFromUrl = (url: string): string => {
    const regex = /\/pokemon\/(\d+)\//;
    const matches = regex.exec(url);
    return matches ? matches[1] : '';
  };

  const filteredData = useMemo(() => {
    if (!pokeData) return [];
    if (!search.trim()) return pokeData;

    const searchLower = search.toLowerCase().trim();
    return pokeData.filter((pokemon: Pokemon) => {
      const id = extractIdFromUrl(pokemon.url);
      return pokemon.name.toLowerCase().includes(searchLower) || id.includes(searchLower);
    });
  }, [pokeData, search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const dataForDisplay = filteredData.slice(
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

  const handleSelectType = (type: string) => {
    setType(type);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-3">
          <h2 className="text-xl font-semibold mb-4">Pokemon</h2>

          <div className="flex items-center gap-3 mb-4">
            <Input
              placeholder="Search pokemon..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Select value={type} onValueChange={handleSelectType}>
              <SelectTrigger className="w-[180px]">
                <Button variant="default">
                  <SelectValue placeholder="Filter by type" />
                </Button>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {pokemonType?.map((type: Pokemon) => (
                  <SelectItem key={type.name} value={type.url}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ComparisonTable dataPokemon={dataPokemon} onClick={handleSelectPokemon} />
        </CardContent>
      </Card>
      <PokemonPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default PokemonTable;
