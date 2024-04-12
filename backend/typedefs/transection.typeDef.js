const transectionsTypeDef = `#graphql
    type Transection{
        _id:ID!
        userId:ID!
        description:String!
        paymentType:String!
        category:String!
        amount:Float!
        location:String!
        date:String!
    }

    type Query{
        transections:[Transection!]
        transection(transectionId:ID!):Transection
        categoryStatistics:[CategoryStatistics!]
    }

    type Mutation{
        createTransection(input:CreateTransectionInput!):Transection
        updateTransection(input:UpdateTransectionInput!):Transection
        deleteTransection(transectionId:ID!):Transection
    }

    type CategoryStatistics{
        category:String!
        totalAmount:Float!
    }

    input CreateTransectionInput{
        description:String!
        paymentType:String!
        category:String!
        amount:Float!
        location:String!
        date:String!
    }

    input UpdateTransectionInput{
        transectionId:ID!
        description:String!
        paymentType:String!
        category:String!
        amount:Float!
        location:String!
        date:String!
    }

`;

export default transectionsTypeDef;
