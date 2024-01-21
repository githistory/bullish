import { Transaction } from "./Transaction";

export type Account = {
  id: string;
  name: string;
  email: string;
  transactions: Transaction;
}