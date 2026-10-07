import z from "zod";

const UpdatePostSchema = z.object({
  postId: z.string(),
  content: z.string(),
});

export default UpdatePostSchema;
