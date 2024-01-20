'use client';

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

const CreateTransactionMutation = gql`
  mutation CreateTransactionMutation(
    $from: Int!
    $to: Int!
    $amount: Float!
    $currency: String!
    $description: String
  ) {
    createTransaction(from: $from, to: $to, amount: $amount, currency: $currency, description: $description) {
      id
      from
      to
      amount
      currency
      description
    }
  }
`
export default function Page() {
    const [from, setFrom] = useState<number>()
    const [to, setTo] = useState<number>()
    const [amount, setAmount] = useState<number>()
    const [currency, setCurrency] = useState("")
    const [description, setDescription] = useState("")

    const router = useRouter()
    const [createTransaction] = useMutation(CreateTransactionMutation)

    return (
        <form
            className="p-2"
            onSubmit={async (e) => {
                e.preventDefault()

                await createTransaction({
                    variables: {
                        from, to, amount, currency, description
                    },
                })
                router.push("/")
            }}
        >
            <h1>Transfer</h1>
            <input
                autoFocus
                onChange={(e) => setFrom(parseInt(e.target.value))}
                placeholder="From"
                type="number"
                value={from}
            />
            <input
                onChange={(e) => setTo(parseInt(e.target.value))}
                placeholder="To"
                type="number"
                value={to}
            />
            <input
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Amount"
                type="number"
                value={amount}
            />
            <input
                onChange={(e) => setCurrency(e.target.value)}
                placeholder="Currency"
                type="text"
                value={currency}
            />
            <input
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                type="text"
                value={description}
            />
            <input
                className="btn btn-blue"
                disabled={!from || !to || !amount || !currency}
                type="submit"
                value="Transfer"
            />
            <button
                className="btn btn-blue ml-2"
                onClick={() => router.push("/")}>
                Cancel
            </button>
        </form>
    )
}