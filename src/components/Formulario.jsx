
import React, { useState } from "react";

const perguntas = [
  { id: "nome", label: "1. NOME" },
  { id: "medo", label: "2. VOCÊ ESTÁ COM MEDO DE QUE?" },
  { id: "origem", label: "2.1. DE ONDE VEM ESSE MEDO?" },
  { id: "inicio", label: "2.2. QUANDO ELE COMEÇOU?" },
  { id: "aprendeu", label: "2.3. COM QUEM VOCÊ APRENDEU ISSO?" },
  { id: "nucleo1", label: "2.4. ONDE ESSA PESSOA ESTÁ NO SEU NÚCLEO?" },
  { id: "alguem", label: "2.5. ALGUÉM ALIMENTA ESSE MEDO? QUEM?" },
  { id: "nucleo2", label: "2.6. ONDE ESSA PESSOA ESTÁ NO SEU NÚCLEO?" },
  { id: "faz", label: "3. O que você está fazendo ou deixando de fazer por causa desse medo?" },
  { id: "ruim", label: "4. O que acontece de ruim quando você sente esse medo e acredita nele?" },
  { id: "bom", label: "5. O que de bom deixa de acontecer quando você sente esse medo e acredita nele?" },
  { id: "pensamento", label: "6. O QUE VOCÊ PENSA QUE FAZ VOCÊ SENTIR ESSE MEDO?" },
];

export default function Formulario() {
  const [respostas, setRespostas] = useState({});

  const handleChange = (e) => {
    setRespostas({ ...respostas, [e.target.name]: e.target.value });
  };

  const analisarRespostas = () => {
    alert("Futuramente a IA fará uma análise aqui com base nas suas respostas.");
  };

  return (
    <form className="space-y-4">
      {perguntas.map((p) => (
        <div key={p.id}>
          <label className="block font-semibold">{p.label}</label>
          <textarea
            name={p.id}
            value={respostas[p.id] || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            rows={3}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={analisarRespostas}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Analisar com IA
      </button>
    </form>
  );
}
