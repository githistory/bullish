'use client';

import { isEmpty } from "lodash";
import { Transaction as TransactionType } from "../types/Transaction";

interface TransactionsProps {
  transactions: TransactionType[];
}

export const Transactions = ({ transactions }: TransactionsProps) => {
  return (
    <div>
      <div className='text-lg'>Transactions</div>
      <div className="flex flex-row">
        <div className="basis-full">From</div>
        <div className="basis-full">To</div>
        <div className="basis-full">Amount</div>
        <div className="basis-full">Currency</div>
        <div className="basis-full">Description</div>
        <div className="basis-full">Created At</div>
      </div>
      {!isEmpty(transactions) && transactions.map(x =>
        <div key={x.id} className="flex flex-row">
          <div className="basis-full">{x.from}</div>
          <div className="basis-full">{x.to}</div>
          <div className="basis-full">{x.amount}</div>
          <div className="basis-full">{x.currency}</div>
          <div className="basis-full">{x.description}</div>
          <div className="basis-full">{x.createdAt}</div>
        </div>
      )}
    </div>
  )
}