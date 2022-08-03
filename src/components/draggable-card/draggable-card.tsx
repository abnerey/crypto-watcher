import { CoinCard } from "components/coin-card/coin-card";
import { Draggable } from "react-beautiful-dnd";
import { Coin } from "shared/types/coin";

interface CoinCardProps {
  item: Coin;
  index: number;
}

const grid = 8;

export const DraggableCard = ({ item, index }: CoinCardProps) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: "none",
              padding: grid * 0.25,
              margin: `0 0 ${grid}px 0`,
              ...provided.draggableProps.style,
            }}
          >
            <CoinCard item={item} style={{backgroundColor: snapshot.isDragging ? "lightyellow" : 'white',}} />
          </div>
        );
      }}
    </Draggable>
  );
};
