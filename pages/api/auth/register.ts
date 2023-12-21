import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/utils/db";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse) {
    const data = req.body;

    if (!data || !data.email || !data.password) {
        res.status(400).send("Missing required parameter");
    }

    const user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    });

    if (user) {
        res.status(422).send("Email already used");
    }

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            password: await bcrypt.hash(data.password, 10),
        }
    }).catch((_) => {
        return res.status(500);
    });

    return res.status(200).json(newUser);
}