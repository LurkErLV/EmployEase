import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import prisma from "@/utils/db";

export default async function (req: NextApiRequest,
                               res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(403).end();
    console.log(1)
    console.log(session.user.role)

    if (session.user.role !== "Employer") {
        return res.status(403).end();
        /*
        {
          "user": {
            "id": 6,
            "email": "alberts@matrozis.dev",
            "name": null,
            "surname": null,
            "role": "Employee",
            "applies": "[]"
          },
          "expires": "2024-01-20T03:39:36.300Z"
        }
        */
    }
    console.log(2)
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
    console.log(3)

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
    }).catch((e: any) => {
        console.log(e)
    });
    console.log(4)
    return res.status(200).end();
}