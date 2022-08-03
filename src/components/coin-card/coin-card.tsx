import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled from '@emotion/styled';
import { Coin } from "shared/types/coin";

interface CoinCardProps {
  item: Coin;
  style?: Record<string, number|string>;
}

const CoinImage = styled.img`
  height: 24px;
  width: 24px;
`;

const CoinName = styled.p`
  paddingLeft: 16px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex: 1;
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: center;
`;

export const CoinCard = ({ item, style }: CoinCardProps) => {
  return (
    <Card variant="outlined" style={style}>
      <CardContent>
        <div>
          <FlexContainer>
            <CoinImage src={item.icon} alt={item.name} />
            <CoinName>{item.name}</CoinName>
          </FlexContainer>
          <p>{item.symbol}</p>
        </div>
      </CardContent>
    </Card>
  );
};
