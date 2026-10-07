import z from "zod";

const DeletePostSchema = z.object({
  postId: z.string(),
});

export default DeletePostSchema;
