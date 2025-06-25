"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Register() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password, name }),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || "Erro ao cadastrar usuário");
			}
			router.push("/login");
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message || "Erro ao cadastrar usuário");
			} else {
				setError("Erro ao cadastrar usuário");
			}
		}
	}

	return (
		<main className="flex flex-col items-center justify-center min-h-screen p-4">
			<h1 className="text-2xl font-bold mb-4">Cadastrar-se</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-full max-w-sm"
			>
				<input
					type="text"
					placeholder="Nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className="border rounded px-3 py-2"
				/>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="border rounded px-3 py-2"
				/>
				<input
					type="password"
					placeholder="Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="border rounded px-3 py-2"
				/>
				{error && <p className="text-red-600">{error}</p>}
				<button
					type="submit"
					className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
				>
					Cadastrar
				</button>
			</form>
			<p className="mt-4 text-sm">
				Já tem uma conta?{" "}
				<Link href="/login" className="text-green-600 underline">
					Entrar
				</Link>
			</p>
		</main>
	);
}
