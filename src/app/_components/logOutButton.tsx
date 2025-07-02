"use client";

import { signOut } from "next-auth/react";
import { Power } from "lucide-react";

export default function LogoutButton() {
	return (
		<button
			onClick={() => signOut({ callbackUrl: "/login" })}
			className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center"
		>
			<Power size={30} />
		</button>
	);
}
