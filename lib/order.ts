import useSWR from 'swr';
import { fetcher } from './fetcher';

export type Order = {
  id: string;
  createdAt: string;
  status: 'PENDING'|'CONFIRMED'|'FAILED'|'REFUNDED'|string;
  fiatAmount: string; fiatCurrency: string;
  cryptoAmount: string; cryptoSymbol: string;
  address: string; txHash?: string; network: string;
};

export function useOrders(params = 'page=1&pageSize=200'){
  const { data, error, isLoading } = useSWR<{ok:boolean; rows:Order[]; total:number}>(`/orders?${params}`, fetcher, { refreshInterval: 15000 });
  return { rows: data?.rows ?? [], total: data?.total ?? 0, isLoading, error };
}
