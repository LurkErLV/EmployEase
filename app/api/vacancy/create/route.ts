import {getServerSession} from "next-auth";
import prisma from "@/utils/db";
import {authOptions} from "@/utils/authOptions";
import {NextRequest, NextResponse} from "next/server";
import {NextApiRequest, NextApiResponse} from "next";

export async function POST(req: Request, res: NextApiResponse) {
    // @ts-ignore
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({message: "Access Restricted"}, {status: 403});
    if (session.user.role.toString() !== "Employer" && session.user.role.toString() !== "Admin") {
        return NextResponse.json({message: "Access Restricted"}, {status: 403});
    }

    const {
        title,
        company,
        companyLogo,
        workSchedule,
        minSalary,
        maxSalary,
        location,
        education,
        jobLevel,
        experience,
        description
    } = await req.json();


    if (!title || !company || !workSchedule || !minSalary || !maxSalary || !location || !education || !jobLevel || !experience || !description) {
        return NextResponse.json({message: "Missing required parameter"}, {status: 400});
    }

    await prisma.vacancies.create({
        data: {
            title,
            company,
            companyLogo: companyLogo ? companyLogo : "",
            workSchedule,
            minSalary,
            maxSalary,
            location,
            education,
            jobLevel,
            experience,
            description,
            authorId: parseInt(session.user.id)
        }
    });

    return NextResponse.json({}, {status: 200});
}