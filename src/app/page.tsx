"use client";

import Image from "next/image";
import { useState, FormEvent, useRef } from "react";
import { getPrediction } from "./server_actions/predict";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const carouselImages = [
  { src: "/images/cacao.jpg", alt: "Cacao" },
  { src: "/images/metate.jpg", alt: "Metate" },
  { src: "/images/molinillo.jpg", alt: "Molinillo" },
  { src: "/images/mortero.jpg", alt: "Mortero" },
  { src: "/images/silla_u.jpg", alt: "U-shaped chair" },
];

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePrev = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCarouselIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await getPrediction(formData);
      console.log(response);
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
    <div className=" bg-gray-100">
      
      <h1 className="text-center mt-10">
        Discover art and history with artificial intelligence. Explore, learn,
        and connect with each piece through a personalized and intelligent
        experience.
      </h1>

      <div className="max-w-2xl mx-auto mt-8 mb-8 p-6 bg-gray-100 rounded shadow text-gray-800">
        <h2 className="text-xl font-bold mb-2">What is this project about?</h2>
        <p>
          This project uses a small trained image classifier model based on a
          convolutional neural network (CNN). The system is designed to detect
          and classify images into one of the following five categories:
        </p>
        <ul className="list-disc list-inside my-2">
          <li>Cacao</li>
          <li>Metate</li>
          <li>Molinillo</li>
          <li>Mortero</li>
          <li>U-shaped chair</li>
        </ul>
        <p>
          Users can upload or take a photo, and the model will predict which of
          these categories it belongs to, also providing a brief audio
          description in spanish.
        </p>
      </div>

      {/* Image Carousel */}
      <div className="max-w-xl mx-auto mb-10 flex flex-col items-center">
        <div className="relative w-full h-64 flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10"
            aria-label="Previous"
          >
            <ArrowBigLeft />
          </button>
          <Image
            src={carouselImages[carouselIndex].src}
            alt={carouselImages[carouselIndex].alt}
            width={400}
            height={256}
            className="object-contain w-full h-full"
            priority
          />
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100 z-10"
            aria-label="Next"
          >
            <ArrowBigRight />
          </button>
        </div>
        <div className="mt-2 text-center text-gray-700 font-medium">
          {carouselImages[carouselIndex].alt}
        </div>
        <div className="flex justify-center mt-2 space-x-2">
          {carouselImages.map((img, idx) => (
            <button
              key={img.src}
              onClick={() => setCarouselIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                carouselIndex === idx ? "bg-blue-500" : "bg-gray-400"
              }`}
              aria-label={`Go to ${img.alt}`}
            />
          ))}
        </div>
      </div>

      <>
        <form className="max-w-lg mx-auto mb-10" onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload photo
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
            {loading ? "Processing..." : "Predict"}
          </button>

          <div className="mt-1 text-sm text-black dark:text-black">
            Upload an image to hear its description
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className=" mt-10 max-w-lg mx-auto  p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <h3 className="font-bold">Error:</h3>
            <p>{error}</p>
          </div>
        )}
        {/* Result */}
        {result && (
          <div className="max-w-lg mx-auto mb-10 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <h3 className="font-bold mb-2">Prediction result:</h3>
            <p>
              <strong>Name:</strong> {result?.data?.nombre}
            </p>
            <audio controls className="mt-2">
              <source
                src={`http://192.168.98.8:8000${result?.data?.audio}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </>
    </div>
  );
}
