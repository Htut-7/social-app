import z from "zod";

const GetSavedSchema = z.object({
  page: z.number().positive(),
  pageSize: z.number().positive(),
});

export default GetSavedSchema;
