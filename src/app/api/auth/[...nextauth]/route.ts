// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Senha", type: "password" },
			},
			async authorize(credentials) {
				const user = await prisma.user.findUnique({
					where: { email: credentials?.email },
				});

				if (!user || !user.password) return null;

				const isValid = await compare(credentials!.password, user.password);
				if (!isValid) return null;

				return user;
			},
		}),
	],
	pages: {
		signIn: "/login",
		error: "/login", // opcional
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
