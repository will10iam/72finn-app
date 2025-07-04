import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { createReceita } from "@/lib/receitas/createReceita";

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session.user?.email) {
			return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
		}

		const body = await req.json();
		const { descricao, valor, dataRecebimento, categoriaId, userId } = body;

		if (!descricao || !valor || !dataRecebimento || !categoriaId || !userId) {
			return NextResponse.json(
				{ error: "Todos os campos são obrigatórios." },
				{ status: 400 }
			);
		}

		const receita = await createReceita({
			descricao,
			valor,
			dataRecebimento: new Date(dataRecebimento),
			categoriaId,
			userId: session.user.id,
		});

		return NextResponse.json(receita, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Erro ao cadastrar receita." },
			{ status: 500 }
		);
	}
}
