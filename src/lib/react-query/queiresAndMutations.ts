import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { createUserAccount, signInAccount_EmailPassword } from "../appwrite/api";
import { INewUser } from "@/types";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount_EmailPassword(user.email, user.password),
  });
};
