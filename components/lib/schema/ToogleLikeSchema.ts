import z from "zod";

const ToogleLikeSchema = z.object({
  postId: z.string(),
});

export default ToogleLikeSchema;
