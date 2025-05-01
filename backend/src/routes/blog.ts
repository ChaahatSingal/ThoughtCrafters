import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
export const bookRouter =new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    },
    Variables:{
        userid:string
    }
}>();
bookRouter.use(async(c,next)=>{
const jwt=  c.req.header('Authorisation');
if(!jwt){
    c.status(401);
    return c.json({ error:"unauthorised"})

}
const token=jwt.split('')[1];
const payload= await verify(token,c.env.JWT_SECRET);
if(!payload){
    c.status(401);
		return c.json({ error: "unauthorized" });
}
c.set('userid',payload.id as string);
await next()
})
bookRouter.post('/',async(c)=>{
    const userid=c.get('userid');
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const body= await c.req.json();
    const post= await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:body.authorId
        }
    });
    return c.json({
        id:post.id
    });


})
bookRouter.put('/',async(c)=>{
    const userId=c.get('userid');
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const body=await c.req.json();
    prisma.post.update({
        where:{
            id:body.id,
            authorId:body.authorId
        },
            data:{
                title:body.title,
                content:body.content

            }
            });
            return c.text('updated post');    
});
bookRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})
