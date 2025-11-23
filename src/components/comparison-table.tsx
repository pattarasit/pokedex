import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataPokemonList } from '@/types/pokemon';

type ComparisonTableProps = {
  dataPokemon: DataPokemonList[];
  onClick: (ur: string) => void;
};

export const ComparisonTable = ({ dataPokemon, onClick }: ComparisonTableProps) => {
  console.log('🚀 ~ ComparisonTable ~ dataPokemon:', dataPokemon);
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState<string>('all');

  return (
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
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Tablet">Tablet</SelectItem>
              <SelectItem value="Smartphone">Smartphone</SelectItem>
              <SelectItem value="Monitor">Monitor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataPokemon.map(item => (
              <TableRow
                key={item.id}
                onClick={() => onClick(item.url)}
                className="hover:cursor-pointer hover:bg-gray-100"
              >
                <TableCell className="p-2">
                  <img src={item.image} alt={item.name} />
                </TableCell>
                <TableCell className="p-2">{item.id}</TableCell>
                <TableCell className="p-2">{item.name}</TableCell>
                <TableCell className="p-2">{item.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
