"use client";

import Sidebar from "@/components/sidebar";
import { SessionProvider } from "next-auth/react";

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-BR">
			<body className="flex">
				<SessionProvider>
					<div className="flex">
						<Sidebar />
						<main className="flex-1 p-4">{children}</main>
					</div>
				</SessionProvider>
			</body>
		</html>
	);
}
