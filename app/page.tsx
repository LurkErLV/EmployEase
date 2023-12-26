import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/authOptions";
import AllVacancies from "@/app/components/server/AllVacancies";

export default async function page() {
    const session = await getServerSession(authOptions);
    return (
        <>
            <div className="mt-[64px]">
                Signed in as {session ? session.user.email : "none"}
                <div className="w-full max-w-[1140px] flex gap-6 flex-wrap justify-center items-center mx-auto">
                    <AllVacancies/>
                </div>
            </div>
        </>
    )
}