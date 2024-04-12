import { TransectionModel } from "./../models/transection.models.js";
const transectionResolver = {
  Query: {
    transections: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized user");

        const userId = await context.getUser()._id;
        const transections = await TransectionModel.find({ userId });
        return transections;
      } catch (error) {
        console.error("Error resolving transections", error);
        throw new Error("Something went wrong" || error.message);
      }
    },

    // get single transection
    transection: async (_, { transectionId }) => {
      //console.log(transectionId);
      try {
        const transaction = await TransectionModel.findById(transectionId);
        console.log(transaction);
        return transaction;
      } catch (error) {
        console.error("Error resolving getting single transections", error);
        throw new Error("Something went wrong" || error.message);
      }
    },

    // get category estimation information
    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) {
        throw new Error("Unauthorized");
      }

      const userId = context.getUser()._id;
      const transactions = await TransectionModel.find({ userId });
      const categoryMap = {};
      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });
      console.log(categoryMap);
      // categoryMap = {expnese:125, saving:232, investment:234}

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },
  Mutation: {
    createTransection: async (_, { input }, context) => {
      try {
        const newTransection = new TransectionModel({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransection.save();
        return newTransection;
      } catch (error) {
        console.error("Error creating transections", error);
        throw new Error("Something went wrong" || error.message);
      }
    },

    updateTransection: async (_, { input }, context) => {
      console.log(input);
      try {
        const updatedTransection = await TransectionModel.findByIdAndUpdate(
          input.transectionId,
          {
            description: input.description,
            paymentType: input.paymentType,
            category: input.category,
            amount: input.amount,
            location: input.location,
            date: input.date,
          },
          { new: true }
        );
        return updatedTransection;
      } catch (error) {
        console.error("Error updating transactions", error);
        throw new Error("Something went wrong" || error.message);
      }
    },

    deleteTransection: async (_, { transectionId }, context) => {
      try {
        const deleteTransection = await TransectionModel.findByIdAndDelete(
          transectionId
        );
        return deleteTransection;
      } catch (error) {
        console.error("Error deleting transections", error);
        throw new Error("Something went wrong" || error.message);
      }
    },
  },
};
export default transectionResolver;
