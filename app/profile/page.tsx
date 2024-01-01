import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/authOptions";

export default async function page() {
    const session = await getServerSession(authOptions);
    return (
        <>
            {session ? session.user.email : "null"}
        </>
    );
}