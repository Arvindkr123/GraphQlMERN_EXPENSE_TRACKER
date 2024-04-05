import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typeDef.js";
import transectionsTypeDef from "./transection.typeDef.js";

// type Defs

const mergeTypeDef = mergeTypeDefs([userTypeDef, transectionsTypeDef]);

export default mergeTypeDef;
