import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { createUserAccount } from "@/lib/appwrite/api";
// import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignUpValidationSchema } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";

import Loader from "@/lib/shared/Loader";

// DEBUG: 
import { appwriteConfig } from "@/lib/appwrite/config";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queiresAndMutations";

const SingupForm = () => {
  // DEBUG:
  function DEBUG() {
    toast({
      title: "Signed up successfully",
      description:
        appwriteConfig.userCollectionId +
        "post\n" +
        appwriteConfig.postCollectionId +
        "saves\n" +
        appwriteConfig.saveCollectionId,
    });
  }
  // DEBUG:END

  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount(); 

  // form template from shadcn
  const form = useForm<z.infer<typeof SignUpValidationSchema>>({
    resolver: zodResolver(SignUpValidationSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      // TODO: toast aesthetics, shall behave differently on different devices
      toast({
        title: "Signed up successfully",
        description: "Account Created on " + new Date().toLocaleString(),
      });
      const newUser = await createUserAccount(values);

      if (!newUser) throw new Error("Failed to create user");

      // SIGN in
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) throw new Error("Failed to sign in");

      console.log(newUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" className="mb-0" />
        <p className="h3-bold sm:h2-bold pt-5 sm:pt-12 mt-1"> Create Your Account</p>
        <p className="text-light-3 small-medium sm:base-regular">
          To Use Snapgram, please create an account.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="username" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              <div>Sign Up</div>
            )}
          </Button>
        </form>
        <Button className="shad-button_secondary" onClick={DEBUG}>
          Toast
        </Button>
      </div>
      
    </Form>
  );
};

export default SingupForm;
