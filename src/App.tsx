import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CoinWatcherLayout } from "pages/coin-watcher/coin-watcher";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CoinWatcherLayout />
    </QueryClientProvider> 
  );
}

export default App;
