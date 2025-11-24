import React, { useMemo, useState } from 'react';
import { ComparisonTable } from '../comparison-table';
import { PokemonPagination } from './pokemon-pagination';
import { useGetAllPokemon } from '@/hook/use-get-pokemon';
import { useQueries } from '@tanstack/react-query';
import { DataPokemonList, Pokemon } from '@/types/pokemon';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

type PokemonTableProps = {
  handleSelectPokemon: (url: string) => void;
};

const PokemonTable = ({ handleSelectPokemon }: PokemonTableProps) => {
  const { data } = useGetAllPokemon();
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState<string>('all');

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
    if (!data?.results) return [];
    if (!search.trim()) return data.results;

    const searchLower = search.toLowerCase().trim();
    return data.results.filter((pokemon: Pokemon) => {
      const id = extractIdFromUrl(pokemon.url);
      return pokemon.name.toLowerCase().includes(searchLower) || id.includes(searchLower);
    });
  }, [data, search]);

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

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-3">
          <h2 className="text-xl font-semibold mb-4">Pokemon</h2>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <Input
              placeholder="Search pokemon..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <Button variant="default">
                  <SelectValue placeholder="Filter by category" />
                </Button>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="type">Type</SelectItem>
                <SelectItem value="ability">Ability</SelectItem>
                <SelectItem value="move">Move</SelectItem>
                <SelectItem value="item">Item</SelectItem>
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
