import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  currencySymbol: string;
  currencyValue: number;
  cryptoValue: number;
}

const CardContainer = styled.div`
  width: calc(25% - 16px);
  height: 80px;
  background-color: darkgrey;
  color: white;
  display: flex;
  flex-direction: column;
  margin: 0 8px 0 8px;
`;

export const CryptoValueCard: React.FC<Props> = (props: Props) => {
  const [cryptoQuote, setCryptoQuote] = useState(0);

  const calculateQuote = (): number => {
    const { currencyValue, cryptoValue } = props;
    return currencyValue * cryptoValue;
  };

  useEffect(() => {
    const quote = calculateQuote();
    setCryptoQuote(quote);
  }, [props.cryptoValue]); // eslint-disable-line react-hooks/exhaustive-deps
  //https://github.com/facebook/create-react-app/issues/6880#issuecomment-488158024

  return (
    <CardContainer>
      <span>{props.currencySymbol}</span>
      <span>{cryptoQuote}</span>
    </CardContainer>
  );
};
