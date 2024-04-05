import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolvers.js";
import transectionResolver from "./transection.resolvers.js";

const mergeResolver = mergeResolvers([userResolver, transectionResolver]);
export default mergeResolver;
