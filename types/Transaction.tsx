export type Transaction = {
  id: number;
  from: number;
  to: number;
  amount: number;
  currency: string;
  description?: string;
  createdAt: number;
}