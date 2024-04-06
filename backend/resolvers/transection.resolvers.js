import { TransectionModel } from "./../models/transection.models.js";
const transectionResolver = {
  Query: {
    transections: async (_, _, context) => {
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
      try {
        const transaction = await TransectionModel.findById(transectionId);
        return transaction;
      } catch (error) {
        console.error("Error resolving getting single transections", error);
        throw new Error("Something went wrong" || error.message);
      }
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
      try {
        const updatedTransection = await TransectionModel.findByIdAndUpdate(
          input.transectionId,
          ...input,
          { new: true }
        );
        return updatedTransection;
      } catch (error) {
        console.error("Error updating transections", error);
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
