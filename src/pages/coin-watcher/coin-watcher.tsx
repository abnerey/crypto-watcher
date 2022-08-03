import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { usePersistentState } from "shared/hooks/usePersistentState";
import { CoinsWatchlist } from "features/coins-watchlist/coins-watchlist";
import { PossibleCoins } from "features/possible-coins/possible-coins";
import { Coin } from "shared/types/coin";
import { isEmpty } from "shared/lib/isEmpty";
import { useCoins } from "./hooks/useCoins";
import { CoinCharts } from "features/coin-charts/coin-charts";

const grid = 8;

const POSSIBLE_COINS_ID = "possibleCoins";
const WATCHLIST_COINS_ID = "watchlistCoins";

type DroppableId = typeof POSSIBLE_COINS_ID | typeof WATCHLIST_COINS_ID;

interface DraggableResult extends DropResult {
  source: { droppableId: DroppableId; index: number };
  destination: { droppableId: DroppableId; index: number };
}

export const CoinWatcherLayout = () => {
  const { data: coins } = useCoins<Coin[]>();
  const draggableStates = {
    [POSSIBLE_COINS_ID]: usePersistentState<Coin[]>(POSSIBLE_COINS_ID, []),
    [WATCHLIST_COINS_ID]: usePersistentState<Coin[]>(WATCHLIST_COINS_ID, []),
  };

  const [unwatchedCoins, setUnwatchedCoins] =
    draggableStates[POSSIBLE_COINS_ID];
  const [watchedCoins] = draggableStates[WATCHLIST_COINS_ID];

  const moveCoin = (result: DraggableResult) => {
    const { source, destination } = result;
    const [sourceState, setSourceState] = draggableStates[source.droppableId];
    const [destinationState, setDestinationState] = draggableStates[destination.droppableId];

    const newSourceState = [...sourceState];
    const [movedItem] = newSourceState.splice(source.index, 1);
    const newDestinationState = [...destinationState]
    newDestinationState.splice(destination.index, 0, movedItem);

    setSourceState(newSourceState);
    setDestinationState(newDestinationState);
  }

  const reorderCoin = (result: DraggableResult) => {
    const { source, destination } = result;

    const [sourceState, setSourceState] = draggableStates[source.droppableId];

    const newSourceState = [...sourceState];
    const [movedItem] = newSourceState.splice(source.index, 1);
    newSourceState.splice(destination.index, 0, movedItem);

    setSourceState(newSourceState);
  }

  const onDragEnd = (result: DraggableResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // when the source and destination are not the same the item is being moved
    const dragItem = source.droppableId === destination.droppableId ? reorderCoin: moveCoin;
    dragItem(result);
  };

  useEffect(() => {
    if (isEmpty(unwatchedCoins) && !isEmpty(coins)) {
      setUnwatchedCoins(coins!);
    }
  }, [coins, unwatchedCoins]);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <PossibleCoins unwatchedCoins={unwatchedCoins} />
          <CoinsWatchlist watchedCoins={watchedCoins} />
        </div>
      </DragDropContext>
      <div style={{ padding: grid }}>
        <CoinCharts watchlistCoins={watchedCoins} />
      </div>
    </div>
  );
};
