import {NextApiResponse} from "next";
import prisma from "@/utils/db";
import {NextResponse} from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
    const allVacancies = await prisma.vacancies.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return NextResponse.json({allVacancies}, {status: 200});
}