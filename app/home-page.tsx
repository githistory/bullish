'use client'

import { gql, useSuspenseQuery } from "@apollo/client";
import { flatMap } from "lodash";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { Accounts } from '../components/Accounts';
import { Transactions } from "../components/Transactions";
import { AccountsQuery } from "../gql/AccountsQuery";

export function HomePage() {
    const { data, refetch } = useSuspenseQuery(AccountsQuery, { context: { fetchOptions: { duplex: 'half' }}});

    const transactions = flatMap(data.accounts, (x) => x.transactions);

    useEffect(() => {
        refetch()
    }, [])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="flex flex-row justify-end items-center">
                    <Link className="btn btn-blue" href="/transfer">Transfer</Link>
                </div>
                <main className="p-2">
                    <div className="flex flex-col md:flex-row md:justify-start">
                        <div className="basis-1/3">
                            <Accounts accounts={data.accounts} />
                        </div>
                        <div className="basis-2/3">
                            <Transactions transactions={transactions} />
                        </div>
                    </div>
                </main>
            </div>
        </Suspense>
    );
}