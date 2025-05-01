import { PrismaClient } from "@prisma/client/edge";
<<<<<<< HEAD
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwt } from "hono/jwt";
export const userRouter =new Hono<{
Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
}
}>();
userRouter.post('/signup',async(c)=>{
    const prisma = new PrismaClient({
          datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body=  await c.req.json();
    const user= await prisma.user.create({
        data:{
            email:body.email,
            password:body.password
        },
    });
    const token= await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({
        jwt:token
    })

    
})
userRouter.get('signin',async(c)=>{
    const prisma =new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body= await c.req.json();
    const user=await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })
    if(!user){
        c.status(403);
        return c.json({error:'not found'});
    }
    const jwt= await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({jwt});
})
=======
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.json({
      jwt: token
    })
})
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
    password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})

>>>>>>> 315af2e5e90167a6397f20e1630c7e247c3a1ade
