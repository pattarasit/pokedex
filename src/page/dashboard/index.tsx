import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to Pokedex</h1>
      <div className="card">
        <Button onClick={() => navigate('/pokedex')}>Show All Pokemon</Button>
      </div>
    </>
  );
};
