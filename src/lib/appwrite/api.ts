import { ID } from "appwrite";

import { INewUser } from "@/types";
import { account, avatars, databases } from "./config";
import { appwriteConfig } from "./config";

// ------------------ APPWRITE API ------------------ //
export async function APPWRITE_saveUserToDB(user: {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: URL;
  userName: string;
}) {
  try {
    // https://appwrite.io/docs/references/cloud/client-web/databases
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: user.accountId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        userName: user.userName,
      },
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUserAccount(user: INewUser) {
  try {
    // response will be type of appwrite User
    // https://appwrite.io/docs/references/cloud/models/user
    // appwrite api requires four field. Last one being name
    const response = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.lastName.concat(", ").concat(user.firstName),
    );

    if (!response) {
      throw new Error("Account creation response is null or undefined");
    }

    const avatarUrl = avatars.getInitials(response.name);

    const newUser = await APPWRITE_saveUserToDB({
      accountId: response.$id,
      email: response.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: avatarUrl,
      userName: user.username,
    });

    if (!newUser) {
      throw new Error("Saving user details to database resulted in null or undefined");
    }

    return newUser; // Return the response upon successful creation
  } catch (error) {
    throw error; // Throw the error for the caller to handle
  }
}

export async function signInAccount_EmailPassword(email: string, password: string) {
  try {
    // https://appwrite.io/docs/references/cloud/client-web/account
    return await account.createEmailSession(email, password);
  } catch (error) {
    throw error;
  }
}
