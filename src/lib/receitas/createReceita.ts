import { Receita } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

type CreateReceitaParams = {
	descricao: string;
	valor: number;
	categoriaId: string;
	dataRecebimento: Date;
	userId: string;
};

export async function createReceita({
	descricao,
	valor,
	categoriaId,
	dataRecebimento,
	userId,
}: CreateReceitaParams): Promise<Receita> {
	const novaReceita = await prisma.receita.create({
		data: {
			descricao,
			valor,
			categoriaId,
			dataRecebimento,
			userId,
		},
	});
	return novaReceita;
}
