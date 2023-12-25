import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/utils/db";
import {hash} from "bcryptjs";

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse) {
    const data = req.body;

    if (!data || !data.email || !data.password) {
        return res.status(400).send("Missing required parameter");
    }

    const user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    }).finally(() => {
        prisma.$disconnect()
    });

    if (user) {
        return res.status(422).send("Email already used");
    }

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            password: await hash(data.password, 10),
        }
    }).catch((_) => {
        return res.status(500);
    }).finally(() => {
        prisma.$disconnect()
    });

    return res.status(200).json(newUser);
}