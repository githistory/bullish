import { gql } from "@apollo/client";

export const AccountsQuery = gql`query AccountsQuery {
    accounts {
        id
        email
        name
        transactions {
            id
            from
            to
            amount
            currency
            date
            description
            createdAt
        }
    }
}`;