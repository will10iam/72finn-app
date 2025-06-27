import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	return (
		<main className="pl-20 lg:p-4 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Bem vindo, {session.user?.name}</h1>
		</main>
	);
}
