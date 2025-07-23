
import React from "react";
import Formulario from "./components/Formulario";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Protocolo de Combate ao Medo
        </h1>
        <Formulario />
      </div>
    </div>
  );
}
