import { Column } from "components/column/column";
import { Title } from "components/title/title";
import { Coin } from "shared/types/coin";
import { Chart } from "./components/chart/chart";

type CoinChartsProps = {
  watchlistCoins: Coin[];
};

export const CoinCharts = ({ watchlistCoins }: CoinChartsProps) => {
  return (
    <Column>
      <Title>Possible Coins</Title>
      {watchlistCoins.map((coin) => (
        <Chart key={coin.id} coin={coin} />
      ))}
    </Column>
  );
};
