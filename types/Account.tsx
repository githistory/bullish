import { Transaction } from "./Transaction";

export type Account = {
  id: number;
  name: string;
  email: string;
  transactions: Transaction;
}