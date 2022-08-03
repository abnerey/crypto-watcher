import { useQuery } from "@tanstack/react-query";
import { COIN_STATS_API } from "shared/config/api-config";

const fetchHistorical = (coinId: string) => async () => {
    const response = await fetch(`${COIN_STATS_API}/charts?period=1y&coinId=${coinId}`);

    if(!response.ok) throw new Error('An error occured while fetching the historical');

    const { chart } = await response.json();
    return chart;
}

export function useCoinHistorical<T>(coinId: string) {
    return useQuery<T>(['charts', coinId], fetchHistorical(coinId));
}