import z from "zod";

const UnSaveSchema = z.object({
  postId: z.string(),
});

export default UnSaveSchema;
