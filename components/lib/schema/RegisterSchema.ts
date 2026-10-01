import z from "zod";

const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .trim()
    .max(100, "Name must contain at most 100 characters"),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Username must contain at least 3 characters")
    .max(30, "Username must contain at most 30 characters"),
  email: z.string().toLowerCase().trim().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export default RegisterSchema;
