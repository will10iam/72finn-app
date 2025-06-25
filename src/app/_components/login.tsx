"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result?.error) {
			setError("Email ou senha inválidos");
		} else {
			router.push(callbackUrl);
		}
	}

	return (
		<main className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-gray-50">
			<h1 className="text-2xl font-bold mb-6 text-gray-900">Entrar</h1>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
			>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
				/>
				<input
					type="password"
					placeholder="Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
				/>
				{error && <p className="mb-4 text-sm text-red-600">{error}</p>}
				<button
					type="submit"
					className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
				>
					Entrar
				</button>
			</form>
			<p>
				Ainda não tem uma conta?{" "}
				<Link href="/register" className="text-green-600 underline">
					Cadastrar
				</Link>
			</p>
		</main>
	);
}
