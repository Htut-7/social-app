import z from "zod";

const GetCommentSchema = z.object({
  postId: z.string(),
});

export default GetCommentSchema;
