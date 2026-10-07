import z from "zod";

const GetPostByIdSchema = z.object({
  postId: z.string(),
});

export default GetPostByIdSchema;
