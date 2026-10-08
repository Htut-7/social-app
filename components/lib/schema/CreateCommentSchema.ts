import z from "zod";

const CreateCommentSchema = z.object({
  postId: z.string(),
  content: z.string(),
});

export default CreateCommentSchema;
