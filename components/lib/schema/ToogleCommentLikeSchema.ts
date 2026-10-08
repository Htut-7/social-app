import z from "zod";

const ToogleCommentLikeSchema = z.object({
  commentId: z.string(),
});

export default ToogleCommentLikeSchema;
