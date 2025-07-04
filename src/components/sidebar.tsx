"use client";

import { useState } from "react";
import Link from "next/link";
import {
	Menu,
	X,
	LayoutDashboard,
	TrendingUp,
	ArrowDownCircle,
	PiggyBank,
	Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "@/app/_components/logOutButton";

const navItems = [
	{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
	{ label: "Receitas", href: "/receitas", icon: TrendingUp },
	{ label: "Despesas", href: "/despesas", icon: ArrowDownCircle },
	{ label: "Investimentos", href: "/investimentos", icon: PiggyBank },
	{ label: "Configurações", href: "/configuracoes", icon: Settings },
];

export default function Sidebar() {
	const [open, setOpen] = useState(false);

	return (
		<div className="relative">
			{/* Botão mobile */}
			<button
				onClick={() => setOpen(!open)}
				className="lg:hidden p-2 m-2 z-50 fixed top-2 left-2 rounded-md shadow"
			>
				{open ? <X /> : <Menu />}
			</button>

			{/*Sidebar */}
			<aside
				className={cn(
					"fixed top-0 left-0 h-full lg:h-screen bg-zinc-900 text-white p-4 flex flex-col justify-between transform transition-all duration-300 z-40",
					open ? "w-64 translate-x-0" : "w-20",
					"lg:translate-x-0 lg:static"
				)}
			>
				<div>
					{/* Botão desktop (lg+) */}
					<button
						onClick={() => setOpen(!open)}
						className="hidden lg:block p-2 mb-4 rounded-md transition"
					>
						{open ? <X /> : <Menu />}
					</button>
					<h2
						className={cn(
							"text-2xl font-bold mt-12 md:mt-4 mb-6 transition-all",
							!open && "opacity-0"
						)}
					>
						72finn
					</h2>
					<nav className="flex flex-col gap-2">
						{navItems.map(({ href, label, icon: Icon }) => (
							<Link
								key={href}
								href={href}
								className="p-2 rounded hover:bg-zinc-800 transition flex items-center gap-2"
								onClick={() => setOpen(false)}
							>
								<Icon size={25} />
								{/* Label que desaparece quando sidebar está fechado */}
								<span
									className={cn(
										"transition-all duration-300",
										open ? "opacity-100" : "opacity-0 hidden"
									)}
								>
									{label}
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
