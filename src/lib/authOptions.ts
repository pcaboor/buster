import { DefaultUser, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";

// Définir le type de session pour inclure l'ID utilisateur
declare module "next-auth" {
    interface Session {
        user: DefaultUser & {
            id: string; // Ajout de l'ID utilisateur
        };
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    session: {
        strategy: 'database'
    },
    callbacks: {
        session: async ({ session, user }) => {
            if (session.user) {
                session.user.id = user.id; // Assurez-vous que l'ID est attribué
                session.user.image = user.image;
                session.user.name = user.name;
                session.user.email = user.email;
            }
            return session;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id; // Assurez-vous que l'ID est attribué
                token.picture = user.image;
            }
            return token;
        }
    },

    debug: process.env.NODE_ENV === 'development',
}
