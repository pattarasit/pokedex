import { useParams } from 'react-router';

export const Pokemon = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>Pokemon {id}</div>
  );
};
