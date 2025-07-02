"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function AdicionarReceitaButton() {
	const [isOpen, setIsOpen] = useState(false);

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
							<h2 className="text-lg font-semibold">Nova Receita</h2>
							<button
								onClick={() => setIsOpen(false)}
								className="text-zinc-500 hover:text-zinc-800"
							>
								<X />
							</button>
						</div>
						<p className="text-sm text-zinc-600 dark:text-zinc-300">
							Aqui vai o formulário.
						</p>
					</div>
				</div>
			)}
		</>
	);
}
