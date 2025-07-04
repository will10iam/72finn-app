import { Register } from "../_components/register";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/dashboard");
	}
	return <Register />;
}
