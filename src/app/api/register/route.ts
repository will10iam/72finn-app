import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();
		if (!name || !email || !password) {
			return NextResponse.json(
				{ message: "Todos os campos são obrigatórios" },
				{ status: 400 }
			);
		}
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});
		if (existingUser) {
			return NextResponse.json(
				{ message: "Email já está cadastrado" },
				{ status: 400 }
			);
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
		return NextResponse.json(
			{ message: "Usuário criado com sucesso", user: newUser },
			{ status: 201 }
		);
	} catch (error) {
		console.error("Erro ao criar usuário:", error);
		return NextResponse.json(
			{ message: "Erro interno no servidor." },
			{ status: 500 }
		);
	}
}
