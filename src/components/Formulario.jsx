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
  const [feedback, setFeedback] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    setRespostas({ ...respostas, [e.target.name]: e.target.value });
  };

  const analisarRespostas = async () => {
    setCarregando(true);
    const prompt = `Abaixo estão respostas de um formulário chamado Protocolo de Combate ao Medo. Gere um feedback analítico e resumido com foco em: origem e padrão do medo, distorções cognitivas, ações práticas possíveis e nova visão alternativa.\n\nRespostas:\n${Object.entries(respostas)
      .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
      .join("\n")}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Erro na resposta da IA.";
    setFeedback(reply);
    setCarregando(false);
  };

  return (
    <div className="space-y-4">
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
      </form>
      <button
        type="button"
        onClick={analisarRespostas}
        disabled={carregando}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {carregando ? "Analisando..." : "Analisar com IA"}
      </button>
      {feedback && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg whitespace-pre-line">
          <h2 className="font-bold text-lg mb-2">Feedback da IA:</h2>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}
