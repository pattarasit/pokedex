import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataPokemonList, Pokemon } from '@/types/pokemon';

type ComparisonTableProps = {
  dataPokemon: DataPokemonList[];
  onClick: (data: Pokemon) => void;
};

export const ComparisonTable = ({ dataPokemon, onClick }: ComparisonTableProps) => {
  return (
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
            onClick={() => onClick(item)}
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
  );
};
