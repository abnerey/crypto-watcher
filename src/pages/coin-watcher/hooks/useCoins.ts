import { useQuery } from "@tanstack/react-query";
import { COIN_STATS_API } from "shared/config/api-config";

const fetchCoins = async () => {
    const response = await fetch(`${COIN_STATS_API}/coins?skip=0&limit=20&currency=USD`);

    if (!response.ok) throw new Error('An error has happened while getting the coins');

    const { coins } = await response.json();
    return coins;
}

export function useCoins<T>() {
    return useQuery<T>(['coins'], fetchCoins);
}