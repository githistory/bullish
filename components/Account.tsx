import React from 'react'
import { Account as AccountType } from '../types/Account'

interface AccountProps {
  account: AccountType;
}

export const Account = ({ account }: AccountProps) => {
  return (
    <div>
        <h3>Name: {account.name}</h3>
        <small>Email: {account.email}</small>
    </div>
  );
}