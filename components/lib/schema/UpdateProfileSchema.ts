import z from "zod";

const UpdateProfileSchema = z.object({
  username: z.string(),
  name: z.string(),
  image: z.string(),
  bio: z.string(),
});

export default UpdateProfileSchema;
