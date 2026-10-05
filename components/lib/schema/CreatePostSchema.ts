import z from "zod";

const CreatePostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Post Content is required")
    .max(500, "Post must be 5000 characters or fewer"),
});

export default CreatePostSchema;
