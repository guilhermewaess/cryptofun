export interface CurrencyResponse {
  rates: CurrencyRates;
  base: 'EUR';
  date: string;
}

export interface CurrencyRates {
  [key: string]: number;
}

export interface CryptoResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: null | string;
    elapsed: number;
    credit_count: number;
    notice: null | string;
  };
  data: {
    [key: string]: {
      id: number;
      name: string;
      symbol: string;
      slug: string;
      num_market_pairs: number;
      date_added: string;
      tags: string[];
      max_supply: number;
      circulating_supply: number;
      total_supply: number;
      platform: null;
      cmc_rank: number;
      last_updated: string;
      quote: {
        EUR: {
          price: number;
          volume_24h: number;
          percent_change_1h: number;
          percent_change_24h: number;
          percent_change_7d: number;
          market_cap: number;
          last_updated: string;
        };
      };
    };
  };
}
