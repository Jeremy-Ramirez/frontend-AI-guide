"use client";
import { getPrediction } from "../server_actions/predict";
import { useState, FormEvent, useRef } from "react";

export default function GuiaPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(event.target as HTMLFormElement);
    console.log(formData)
    try {
      const response = await getPrediction(formData);
      console.log(response)
      if (response.error) {
        setError(response.message || "Error en la predicción");
      } else {
        setResult(response);
      }
    } catch (err) {
      setError("Error al procesar la solicitud");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  
  return (
    <>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Subir foto
        </label>
        <input
          className="block w-full text-sm text-white border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-5"
          name="file"
          type="file"
          accept="image/*"
          capture="environment" 
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="p-5 mt-2 border rounded-md text-white bg-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Procesando..." : "Predecir"}
        </button>

        <div className="mt-1 text-sm text-black dark:text-black">
          Sube una imagen para escuchar su descripción
        </div>
      </form>

      {/* Error */}
      {error && (
        <div className="max-w-lg mx-auto mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">Error:</h3>
          <p>{error}</p>
        </div>
      )}
      {/* Resultado */}
      {result && (
        <div className="max-w-lg mx-auto mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-bold mb-2">Resultado de la predicción:</h3>
          <p><strong>Nombre:</strong> {result.data.nombre}</p>
          
          
          <audio controls  className="mt-2">
            <source src={`http://192.168.98.8:8000${result.data.audio}`} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}
    </>
  );
}
