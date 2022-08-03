import { Line } from 'react-chartjs-2';
import { Coin } from "shared/types/coin";
import { CoinHistorical } from 'shared/types/coin-historical';
import { useCoinHistorical } from "./hooks/useCoinHistorical";

type ChartProps = {
    coin: Coin;
}

export const Chart = ({ coin }: ChartProps) => {
    const { data: chart = [] } = useCoinHistorical<CoinHistorical>(coin.id);

    return (
        <div>
            <Line
                datasetIdKey='id' 
                data={{
                    labels: chart?.map((array: number[]) => (chart as CoinHistorical)?.indexOf(array)),
                    datasets: [
                        {
                            label: coin.name,
                            data: chart?.map((m: any) => m[1]),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        }
                    ]
                }}
            />
        </div>
    );
};