import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/utils/db';
import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials) return;
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!user) {
          throw new Error('User not found!');
        }

        if (!(await compare(password, user.password))) {
          throw new Error('Incorrect password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          role: user.Role,
          applies: user.applies,
        };
      },
    }),
  ],
  pages: {
    signIn: `${process.env.BASE_PATH}/auth/signin`,
    newUser: process.env.BASE_PATH,
  },
  callbacks: {
    async jwt({ token }: any) {
      return token;
    },
    session: async ({ session, token }: any) => {
      if (!token.email) return null;

      const user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!user) return null;

      session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        role: user.Role,
        applies: user.applies,
      };

      return session;
    },
  },
} as NextAuthOptions;
