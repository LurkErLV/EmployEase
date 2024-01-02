import prisma from "@/utils/db";
import {NextResponse} from 'next/server';
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: Request, {params}: Params) {

    const allApplies = await prisma.applies.findMany({
        where: {
            userId: parseInt(params.id)
        }
    });

    if (!allApplies) {
        return NextResponse.json({message: "Nothing was found"}, {status: 404});
    }

    const ids = allApplies.map((item) => {
        return item.vacancyId;
    });

    const vacancies = await prisma.vacancies.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });

    return NextResponse.json({allApplies, vacancies}, {status: 200});
}