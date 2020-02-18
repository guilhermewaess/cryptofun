import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { GlobalStyles } from './styles/GlobalStyles';
import styled from 'styled-components';
import { SearchInput } from './components/SearchInput';
import { getCurrency, getCryptoValue } from './services/cryptoService';
import { CryptoValueCard } from './components/CryptoValueCard';
import { CurrencyRates } from './interfaces';

const CryptoContainer = styled.section`
  width: 80%;
  margin: auto;
`;

const CryptoCardsContainer = styled.section`
  display: flex;
`;

export const App: React.FC = () => {
  const [currencyRates, setCurrencyRates] = useState({} as CurrencyRates);
  const [cryptoValue, setCryptoValue] = useState(0);

  useEffect(() => {
    getCurrency().then(({ rates }) => setCurrencyRates(rates));
  }, []);

  const onSearch = async (searchTerm: string): Promise<void> => {
    const { data } = await getCryptoValue(searchTerm);
    const cryptoValue = data[searchTerm].quote.EUR.price;

    setCryptoValue(cryptoValue);
  };

  return (
    <Home>
      <GlobalStyles />
      <CryptoContainer>
        <SearchInput onSearch={onSearch}></SearchInput>
        <CryptoCardsContainer>
          {Object.keys(currencyRates).map(key => (
            <CryptoValueCard
              currencySymbol={key}
              currencyValue={currencyRates[key]}
              cryptoValue={cryptoValue}
              key={key}
            />
          ))}
          <CryptoValueCard currencySymbol="EUR" currencyValue={1} cryptoValue={cryptoValue} />
        </CryptoCardsContainer>
      </CryptoContainer>
    </Home>
  );
};
