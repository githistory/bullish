'use client';

import { Account as AccountType } from '../types/Account';
import { Account } from './Account';

interface AccountsProps {
  accounts: AccountType[];
}

export const Accounts = ({ accounts }: AccountsProps) => {
  return (
    <div>
      <div className='text-lg'>Accounts</div>
      {accounts.map(account =>
        <Account key={account.id} account={account} />
      )}
    </div>
  )
}