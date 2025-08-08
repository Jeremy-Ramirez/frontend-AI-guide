# AI Image Classifier Guide

This project is a web application that uses a small, custom-trained image classifier based on a Convolutional Neural Network (CNN). The app allows users to upload or take a photo, and the model predicts which of five traditional objects appears in the image, providing a brief audio description in Spanish.

## Demo

![Carousel Example](public/images/cacao.jpg)
*Example of the image carousel on the main page.*

## Features

- **Image Classification:** Upload or take a photo and get a prediction of which object is present.
- **Audio Description:** Listen to a short audio description of the predicted object (in Spanish).
- **Image Carousel:** Browse sample images of the five categories.
- **Modern UI:** Built with Next.js, React, and Tailwind CSS for a responsive and clean interface.

## Categories Detected

The model can classify images into the following categories:
- Cacao
- Metate
- Molinillo
- Mortero
- U-shaped chair

## How It Works

1. **Upload/Take a Photo:** Use the form on the main page to upload or capture an image.
2. **Prediction:** The image is sent to a FastAPI backend (not included in this repo) at `http://127.0.0.1:8000/uploadfile`.
3. **Result:** The predicted category and an audio description are displayed.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd frontend-AI-guide
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend

This frontend expects a backend running at `http://127.0.0.1:8000/uploadfile` that accepts image uploads and returns predictions and audio files.  
**Note:** The backend is not included in this repository.

## Project Structure

```
src/
  app/
    components/
      NavBar.tsx         # Navigation bar component
    server_actions/
      predict.ts         # Handles API requests to the backend
    page.tsx             # Main page with carousel, upload form, and results
    layout.tsx           # App layout and font setup
  public/
    images/              # Sample images for the carousel
      cacao.jpg
      metate.jpg
      molinillo.jpg
      mortero.jpg
      silla_u.jpg
```

## Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/icons/) (for icons)

## Customization

- To change the categories or images, update the `carouselImages` array in `src/app/page.tsx` and add/remove images in `public/images/`.
- To change the backend endpoint, update the URL in `src/app/server_actions/predict.ts`.

## License

MIT License

Copyright (c) 2025 Jeremy Alexander Ramírez Galeotti