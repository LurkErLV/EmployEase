import prisma from "@/utils/db";
import {hash} from "bcryptjs";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    console.log(data)
    if (!data || !data.email || !data.password) {
        return NextResponse.json({
            message: "Missing required parameter"
        }, {
            status: 400,
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    }).finally(() => {
        prisma.$disconnect();
    });

    if (user) {
        return NextResponse.json({
            message: "Email already used"
        }, {
            status: 422,
        });
    }

    const newUser = await prisma.user.create({
        data: {
            email: data.email,
            password: await hash(data.password, 10),
        }
    }).catch((_) => {
        return NextResponse.json({}, {status: 500});
    }).finally(() => {
        prisma.$disconnect();
    });

    return NextResponse.json({
        message: newUser
    }, {
        status: 200,
    });
}