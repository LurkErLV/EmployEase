import prisma from "@/utils/db";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/authOptions";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";

export async function POST(req: Request, { params }: Params) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({message: "You are unauthorized"},{status: 401});

    const vacancy = await prisma.vacancies.findFirst({
        where: {
            id: parseInt(params.id)
        }
    });

    if (!vacancy) {
        return NextResponse.json({message: "Vacancy not found!"},{status: 404})
    }

    

    return NextResponse.json({}, {status: 200});
}