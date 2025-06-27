"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "@/app/_components/logOutButton";

const navItems = [
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Receitas", href: "/receitas" },
	{ label: "Despesas", href: "/despesas" },
	{ label: "Investimentos", href: "/investimentos" },
	{ label: "Configurações", href: "/configuracoes" },
];

export default function Sidebar() {
	const [open, setOpen] = useState(true);

	return (
		<div className="relative">
			{/* Botão mobile */}
			<button
				onClick={() => setOpen(!open)}
				className="lg:hidden p-2 m-2 z-50 fixed top-2 left-2 bg-white rounded-md shadow"
			>
				{open ? <X /> : <Menu />}
			</button>

			{/*Sidebar */}
			<aside
				className={cn(
					"fixed top-0 left-0 h-full lg:h-screen bg-zinc-900 text-white p-4 flex flex-col justify-between transform transition-transform duration-300 z-40",
					open ? "w-64 translate-x-0" : "w-20 -translate-x-full",
					"lg:translate-x-0 lg:static"
				)}
			>
				<div>
					{/* Botão desktop (lg+) */}
					<button
						onClick={() => setOpen(!open)}
						className="hidden lg:block p-2 mb-4 bg-zinc-800 rounded-md hover:bg-zinc-700 transition"
					>
						{open ? <X /> : <Menu />}
					</button>
					<h2
						className={cn(
							"text-2xl font-bold mb-6 transition-all",
							!open && "opacity-0"
						)}
					>
						72finn
					</h2>
					<nav className="flex flex-col gap-2">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="p-2 rounded hover:bg-zinc-800 transition flex items-center"
								onClick={() => setOpen(false)}
							>
								{/* Label que desaparece quando sidebar está fechado */}
								<span
									className={cn(
										"transition-all duration-300",
										open ? "opacity-100 ml-2" : "opacity-0 w-0"
									)}
								>
									{item.label}
								</span>
							</Link>
						))}
					</nav>
				</div>
				<LogoutButton />
			</aside>
		</div>
	);
}
