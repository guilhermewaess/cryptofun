import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { GlobalStyles } from './styles/GlobalStyles';
import styled from 'styled-components';
import { Search } from './components/Search';
import { getCurrency, getCryptoValue } from './services/cryptoService';
import { CryptoValueCard } from './components/CryptoValueCard';
import { CurrencyRates } from './interfaces';
import { ApiError } from './components/ApiError';

const CryptoContainer = styled.section`
  width: 80%;
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;

const CryptoCardsContainer = styled.section`
  display: flex;
`;

// const ApiErrorWrapper = styled(ApiError)`
//   margin-top: 48px;
// `;

export const App: React.FC = () => {
  const [currencyRates, setCurrencyRates] = useState({} as CurrencyRates);
  const [cryptoValue, setCryptoValue] = useState(0);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    getCurrency().then(({ rates }) => setCurrencyRates(rates));
  }, []);

  const onSearch = async (searchTerm: string): Promise<void> => {
    try {
      const { data } = await getCryptoValue(searchTerm);
      const cryptoValue = data[searchTerm].quote.EUR.price;

      setCryptoValue(cryptoValue);
    } catch (error) {
      setApiError(error.message);
    }
  };

  const onErrorDismiss = (): void => {
    setApiError('');
  };

  return (
    <Home>
      <GlobalStyles />
      <CryptoContainer>
        <Search onSearch={onSearch}></Search>
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
        {!!apiError && <ApiError error={apiError} onDismiss={onErrorDismiss} />}
      </CryptoContainer>
    </Home>
  );
};
