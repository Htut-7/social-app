import z from "zod";

const GetPostSchema = z.object({
  page: z.number().positive(),
  pageSize: z.number().positive(),
});

export default GetPostSchema;
