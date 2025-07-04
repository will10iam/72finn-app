"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

export default function AdicionarReceitaButton() {
	const [isOpen, setIsOpen] = useState(false);
	const [descricao, setDescricao] = useState("");
	const [valor, setValor] = useState("");
	const [valorNumerico, setValorNumerico] = useState<number | null>(null);
	const [dataCadastro, setDataCadastro] = useState("");

	useEffect(() => {
		const hoje = new Date();
		const formatada = hoje.toISOString().slice(0, 10);
		setDataCadastro(formatada);
	}, []);

	const formatarMoeda = (valor: string) =>
		new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(Number(valor));

	const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const valorDigitado = e.target.value.replace(/\D/g, "");
		const valorCentavos = parseInt(valorDigitado || "0", 10);
		const valorReal = valorCentavos / 100;

		setValorNumerico(valorReal);
		setValor(formatarMoeda(valorReal.toString()));
	};

	const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const texto = e.target.value;
		const palavras = texto.trim().split(/\s+/);
		if (palavras.length <= 10) {
			setDescricao(texto);
		} else {
			alert("A descrição deve ter no máximo 10 palavras.");
			e.target.value = descricao;
		}
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2 mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
			>
				<Plus size={20} />
				Adicionar receita
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
					<div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-md shadow-lg p-6 mx-4">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold">
								Cadastre uma nova receita
							</h2>
							<button
								onClick={() => setIsOpen(false)}
								className="text-zinc-500 hover:text-zinc-800"
							>
								<X />
							</button>
						</div>
						<form className="text-sm text-zinc-600 dark:text-zinc-300">
							<label className="block mb-4">
								<input
									type="text"
									value={descricao}
									onChange={handleDescricaoChange}
									className="border border-zinc-300 dark:border-zinc-700 rounded-md p-2 mt-1 block w-full"
									placeholder="Ex: Salário empresa X"
								/>
								<small className="text-xs text-zinc-400">
									{descricao.trim().split(/\s+/).length} de 10 palavras
								</small>
							</label>
							<label className="block mb-4">
								<input
									type="number"
									value={valor}
									onChange={handleValorChange}
									className="border border-zinc-300 dark:border-zinc-700 rounded-md p-2 mt-1 block w-full"
									placeholder="R$ 0,00"
								/>
							</label>
							<label className="block mb-4">
								<input
									type="date"
									className="border border-zinc-300 dark:border-zinc-700 rounded-md p-2 mt-1 block w-full"
									placeholder="Data recebida (DD/MM/AAAA)"
								/>
							</label>
							<label className="block mb-4">
								<input
									type="date"
									value={dataCadastro}
									disabled
									className="border border-zinc-300 dark:border-zinc-700 rounded-md p-2 mt-1 block w-full"
									placeholder="Data de cadastro (DD/MM/AAAA)"
								/>
							</label>
							<button
								type="submit"
								className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full"
							>
								Cadastrar
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
}
