import * as z from "zod";

export const SignUpValidationSchema = z.object({
  first_name: z.string().min(1, {message: "Firstname must contain more than 1 characters"}),
  last_name: z.string().min(1, {message: "Lastname must contain more than 1 characters"}),
  username: z.string().min(2, {message: "Username must contain more than 2 characters"}),
  email: z.string().email({message: "Invalid email"}),
  password: z.string().min(8, {message: "Password must contain more than 8 characters"}),
});
