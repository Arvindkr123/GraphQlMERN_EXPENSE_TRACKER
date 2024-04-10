import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transections {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
