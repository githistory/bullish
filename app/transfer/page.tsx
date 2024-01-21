'use client';

import { useMutation, useSuspenseQuery } from "@apollo/client";
import { filter } from "lodash";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AccountsQuery } from "../../gql/AccountsQuery";
import { CreateTransactionMutation } from "../../gql/CreateTransactionMutation";
import { Account } from "../../types/Account";

export default function Page() {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [amount, setAmount] = useState<number>()
    const [currency, setCurrency] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    const router = useRouter()
    const { data: { accounts } } = useSuspenseQuery(AccountsQuery, { context: { fetchOptions: { duplex: 'half' }}});
    const [createTransaction] = useMutation(CreateTransactionMutation)

    const getOtherAccounts = (accounts: Account[], excludedId: string) =>
        filter(accounts, (account) => 
            account.id !== excludedId
        )
    const fromAccounts = useMemo(() => getOtherAccounts(accounts, to), [to])
    const toAccounts = useMemo(() => getOtherAccounts(accounts, from), [from])

    const now = new Date().toISOString().slice(0, -14);

    return (
        <form
            className="flex flex-col items-start p-2 space-y-2"
            onSubmit={async (e) => {
                e.preventDefault()

                await createTransaction({
                    variables: {
                        from: parseInt(from),
                        to: parseInt(to),
                        amount, currency,
                        date, description
                    },
                })
                router.push("/")
            }}
        >
            <h1 className="text-lg">Transfer</h1>
            <select onChange={(e) => setFrom(e.target.value)}>
                <option value=''>Pick From</option>
                {fromAccounts.map(({id, name}) => 
                    <option key={id} value={id}>{name}</option>
                )}
            </select>
            <select onChange={(e) => setTo(e.target.value)}>
                <option value=''>Pick To</option>
                {toAccounts.map(({id, name}) => 
                    <option key={id} value={id}>{name}</option>
                )}
            </select>
            <input
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Amount"
                type="number"
                value={amount}
            />
            <select onChange={(e) => setCurrency(e.target.value)}>
                <option value=''>Pick Currency</option>
                <option value='HKD'>HKD</option>
                <option value='USD'>USD</option>
                <option value='CNY'>CNY</option>
            </select>
            <input
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
                type="date"
                value={date}
                min={now}
            />
            <input
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                type="text"
                value={description}
            />
            <input
                className="btn btn-blue"
                disabled={!from || !to || !amount || !currency || !date}
                type="submit"
                value="Transfer"
            />
            <button
                className="btn btn-blue"
                onClick={() => router.push("/")}>
                Cancel
            </button>
        </form>
    )
}