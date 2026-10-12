import z from "zod";

const SavePostSchema = z.object({
  postId: z.string(),
});

export default SavePostSchema;
