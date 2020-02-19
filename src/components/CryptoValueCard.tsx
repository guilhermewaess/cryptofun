import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import currency from 'currency.js';

export interface Props {
  currencySymbol: string;
  currencyValue: number;
  cryptoValue: number;
}

const CardContainer = styled.div`
  width: calc(25% - 16px);
  height: 200px;
  background-color: #f6f5f6;
  color: #535557;
  display: flex;
  flex-direction: column;
  margin: 0 8px 0 8px;
  border-radius: 4px;
  padding: 8px;
`;

const SymbolText = styled.span`
  text-align: center;
  font-size: 32px;
`;

const QuoteValue = styled.span`
  text-align: center;
  font-size: 32px;
  margin-top: 50px;
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
    <CardContainer data-testid="crypto-value-card">
      <SymbolText data-testid="quote-symbol">{props.currencySymbol}</SymbolText>
      <QuoteValue data-testid="quote-value">
        {currency(cryptoQuote, {
          precision: 2,
          decimal: ',',
          separator: '.',
        }).format()}
      </QuoteValue>
    </CardContainer>
  );
};
