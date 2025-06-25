import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Login } from "../_components/login";

export default async function LoginPage() {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect("/dashboard");
	}

	return <Login />;
}
