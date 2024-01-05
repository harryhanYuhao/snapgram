import { ID } from "appwrite";

import { INewUser } from "@/types";
import { account, avatars, databases} from "./config";
import { appwriteConfig } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    // response will be type of appwrite User
    // https://appwrite.io/docs/references/cloud/models/user
    const response = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.lastName.concat(", ").concat(user.firstName),
    );

    const avatarUrl = avatars.getInitials(response.name);

    const newUser = await saveUserToDB({
      accountId: response.$id,
      email: response.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: avatarUrl,
      userName: user.username,
    });

    return newUser; // Return the response upon successful creation
  } catch (error) {
    throw error; // Throw the error for the caller to handle
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: URL;
  userName: string;
}) {
  try {
    // https://appwrite.io/docs/references/cloud/client-web/databases
    const newUser = await databases.createDocument(
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
      })
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
