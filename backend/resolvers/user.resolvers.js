import { UserModel } from "../models/users.models.js";
import { users } from "./dummyData/index.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new UserModel({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error("Error in signUp: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, passowrd } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          passowrd,
        });
        await context.login(user);
        return user;
      } catch (error) {
        console.log("Error in login", error);
        throw new Error("Login failed" || error.message);
      }
    },

    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "logout successfully" };
      } catch (error) {
        console.log("Error in logout", error);
        throw new Error("Something went wrong" || error.message);
      }
    },
  },
  Query: {
    authUser: (_, __, context) => {
      try {
        const user = context.getUser();
        return user;
      } catch (error) {
        console.error("Error in authUser : ", error);
        throw new Error("Something went wrong" || error.message);
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await UserModel.findById(userId);
        return user;
      } catch (error) {
        console.error("Error in get single user : ", error);
        throw new Error("Something went wrong" || error.message);
      }
    },
  },
};

export default userResolver;
