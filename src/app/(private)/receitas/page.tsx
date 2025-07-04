import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdicionarReceitaButton from "@/components/receita-button";

export default async function ReceitasPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	return (
		<main className="pl-20 lg:p-4 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">
				{session.user?.name}, essas são as suas receitas
			</h1>

			<div className="w-full flex justify-start mt-4">
				<AdicionarReceitaButton />
			</div>

			<div className="w-full overflow-x-auto mt-6">
				<table className="w-full text-left border border-zinc-700 rounded min-w-[600px]">
					<thead className="bg-zinc-800 text-white text-sm md:text-base">
						<tr>
							<th className="p-2 whitespace-nowrap">ID</th>
							<th className="p-2 whitespace-nowrap">Descrição</th>
							<th className="p-2 whitespace-nowrap">Valor</th>
							<th className="p-2 whitespace-nowrap">Data Recebida</th>
							<th className="p-2 whitespace-nowrap">Cadastrado em</th>
						</tr>
					</thead>
					<tbody className="text-sm md:text-base">
						<tr className="border-t border-zinc-700 hover:bg-zinc-800">
							<td className="p-2">1</td>
							<td className="p-2">Salário</td>
							<td className="p-2">R$ 5.000,00</td>
							<td className="p-2">01/10/2023</td>
							<td>30/09/2023</td>
						</tr>
					</tbody>
				</table>
			</div>
		</main>
	);
}
