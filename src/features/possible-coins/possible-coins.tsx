import { Droppable } from "react-beautiful-dnd";
import { Coin } from "shared/types/coin";
import { getBackgroundColor } from "shared/lib/getBackgroundColor";
import { Column } from "components/column/column";
import { Title } from "components/title/title";
import { DraggableCard } from "components/draggable-card/draggable-card";

type PossibleCoinsProps = {
  unwatchedCoins: Coin[];
};

export const PossibleCoins = ({ unwatchedCoins }: PossibleCoinsProps) => {
  return (
    <Droppable droppableId="possibleCoins">
      {(provided, snapshot) => (
        <Column
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            backgroundColor: getBackgroundColor(snapshot),
          }}
        >
          <Title>Possible Coins</Title>
          {unwatchedCoins.map((coin, index) => 
            <DraggableCard key={coin.id} item={coin} index={index} />
          )}
          {provided.placeholder}
        </Column>
      )}
    </Droppable>
  );
};
