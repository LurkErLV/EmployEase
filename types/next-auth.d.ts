import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as page prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string,
            email: string,
            name: string | null | undefined,
            surname: string | null | undefined,
            role: string,
            applies: string,
        } & DefaultSession["user"]
    }
}