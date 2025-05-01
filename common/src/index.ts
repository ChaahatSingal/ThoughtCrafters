import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional(),
});
<<<<<<< HEAD
export type SignupType=z.infer< typeof signupInput>
export const signinInput=z.object({
    email:z.string().email(),
    password:z.string(),
});
export type SigninType=z.infer<typeof signinInput>;
export const createpostInput=z.object({
    title:z.string(),
    content:z.string(),
})
export type CreatePostInput=z.infer<typeof createpostInput>
export const updatePostInput=z.object({
    title:z.string().optional(),
    content:z.string().optional(),
})
export type UpdatePostInput=z.infer<typeof updatePostInput>
=======

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type UpdatePostType = z.infer<typeof updatePostInput>;
>>>>>>> 315af2e5e90167a6397f20e1630c7e247c3a1ade
