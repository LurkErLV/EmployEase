import {ReactNode} from "react";
import {useSession} from "next-auth/react";

type Props = {
    type: string,
    children: ReactNode,
}
export default function AuthButton(props: Props) {
    if (!props) return;
    const session = useSession();
    console.log(session)

    return (
      <>
        <button className="">
            {session.status}
        </button>
      </>
    );
}