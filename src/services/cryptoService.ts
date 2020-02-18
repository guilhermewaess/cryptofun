/* eslint-disable @typescript-eslint/camelcase */
import { CurrencyResponse, CryptoResponse } from '../interfaces';

export async function getCurrency(): Promise<CurrencyResponse> {
  const response = await fetch('https://api.exchangeratesapi.io/latest?symbols=USD,BRL,GBP,AUD');
  if (response.ok) {
    return response.json();
  }
  throw new Error('Error on getting currency values');
}

export async function getCryptoValue(cryptoSymbol: string): Promise<CryptoResponse> {
  const response = await fetch(`/cryptocurrency/quotes/latest?symbol=${cryptoSymbol}&convert=EUR`, {
    headers: { 'X-CMC_PRO_API_KEY': '5579485c-802f-4af9-b091-20a1d97f7019' },
  });

  const parsedResponse = (await response.json()) as CryptoResponse;
  if (response.ok) {
    return parsedResponse;
  }

  if (parsedResponse?.status?.error_code) {
    throw new Error(parsedResponse.status?.error_message as string);
  }

  throw new Error('Error on getting crypto value');
}
