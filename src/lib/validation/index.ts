import * as z from "zod";

export const SignUpValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Firstname must contain more than 1 characters" })
    .max(64, { message: "Firstname must be less than 128 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Lastname must contain more than 1 characters" })
    .max(64, { message: "Lastname must be less than 128 characters" }),
  username: z
    .string()
    .min(2, { message: "Username must contain more than 2 characters" })
    .max(64, { message: "Username must be less than 128 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must contain more than 8 characters" }),
});
