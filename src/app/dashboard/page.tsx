import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	return (
		<main className="p-4">
			<h1 className="text-2xl font-bold">Bem vindo, {session.user?.name}</h1>
			<p className="mt-2">Você está logado, sucesso!</p>
		</main>
	);
}
