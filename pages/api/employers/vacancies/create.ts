import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/utils/db";

export default async function (req: NextApiRequest,
                               res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(403).end();
    if (session.user.role.toString() !== "Employer" || session.user.role.toString() !== "Admin") {
        return res.status(403).end();
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
    } = req.body;

    if (!title || !company || !workSchedule || !minSalary || !maxSalary || !location || !education || !jobLevel || !experience || !description) {
        return res.status(400).send("Missing required parameter");
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
    
    return res.status(200).end();
}