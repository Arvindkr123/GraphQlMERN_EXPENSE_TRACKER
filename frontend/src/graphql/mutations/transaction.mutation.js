import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTransectionInput!) {
    createTransection(input: $input) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($input: UpdateTransectionInput!) {
    updateTransection(input: $input) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transectionId: ID!) {
    updateTransection(transectionId: $transectionId) {
      _id
    }
  }
`;
