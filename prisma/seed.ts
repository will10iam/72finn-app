// prisma/seed.ts
import { PrismaClient, TipoCategoria } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	let user = await prisma.user.findFirst();

	if (!user) {
		const hashedPassword = await bcrypt.hash("senha123", 10);
		user = await prisma.user.create({
			data: {
				name: "Usuário",
				email: "email@exemplo.com",
				password: hashedPassword,
			},
		});
		console.log("✅ Usuário criado com sucesso.");
	}

	const userId = user.id;

	const categoriasConta = [
		"Despesas de Casa",
		"Gastos Extras",
		"Mercado",
		"Carro",
		"Igreja",
		"Cartão de Crédito",
		"Saúde",
		"Outros",
	];

	const categoriasReceita = [
		"Salário",
		"Freelance",
		"Investimentos",
		"Reembolso",
		"Outros",
	];

	// Inserir categorias do tipo CONTA
	for (const nome of categoriasConta) {
		await prisma.categoria.upsert({
			where: {
				nome_userId: {
					nome,
					userId,
				},
			},
			update: {},
			create: {
				nome,
				tipo: TipoCategoria.CONTA,
				userId,
			},
		});
	}

	// Inserir categorias do tipo RECEITA
	for (const nome of categoriasReceita) {
		await prisma.categoria.upsert({
			where: {
				nome_userId: {
					nome,
					userId,
				},
			},
			update: {},
			create: {
				nome,
				tipo: TipoCategoria.RECEITA,
				userId,
			},
		});
	}

	console.log("✅ Categorias inseridas com sucesso.");
}

main()
	.catch((e) => {
		console.error("❌ Erro ao rodar seed:", e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
