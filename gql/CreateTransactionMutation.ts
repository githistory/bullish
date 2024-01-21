import { gql } from "@apollo/client";

export const CreateTransactionMutation = gql`
  mutation CreateTransactionMutation(
    $from: Int!
    $to: Int!
    $amount: Float!
    $currency: String!
    $date: String!
    $description: String
  ) {
    createTransaction(from: $from, to: $to, amount: $amount, currency: $currency, date: $date, description: $description) {
      id
      from
      to
      amount
      currency
      date
      description
    }
  }
`;