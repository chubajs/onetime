import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const BitmapEditor = () => {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedShade, setSelectedShade] = useState('#000000');
  const [bitmap, setBitmap] = useState(() => Array(50).fill().map(() => Array(50).fill('#FFFFFF')));
  const canvasRef = useRef(null);

  const cellSize = 11.5; // Increased by 15% from 10
  const canvasSize = cellSize * 50;

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    setSelectedShade(e.target.value);
  };

  const generateShades = useMemo(() => {
    return (color) => {
      const shades = [];
      if (color === '#000000') {
        // For black, generate a grayscale palette
        for (let i = 0; i < 10; i++) {
          const value = Math.round((i / 9) * 255);
          shades.push(`rgb(${value},${value},${value})`);
        }
      } else {
        // For other colors, use the existing logic
        for (let i = 0; i < 10; i++) {
          const shade = adjustBrightness(color, (i - 5) * 20);
          shades.push(shade);
        }
      }
      return shades;
    };
  }, []);

  const adjustBrightness = (hex, percent) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(Math.min((num >> 16) + amt, 255), 0);
    const G = Math.max(Math.min((num >> 8 & 0x00FF) + amt, 255), 0);
    const B = Math.max(Math.min((num & 0x0000FF) + amt, 255), 0);
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
  };

  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    
    setBitmap(prevBitmap => {
      const newBitmap = [...prevBitmap];
      newBitmap[y] = [...newBitmap[y]];
      newBitmap[y][x] = selectedShade;
      return newBitmap;
    });
  }, [selectedShade]);

  const handleFillAll = useCallback(() => {
    setBitmap(prevBitmap => prevBitmap.map(row => row.map(() => selectedShade)));
  }, [selectedShade]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    bitmap.forEach((row, y) => {
      row.forEach((color, x) => {
        ctx.fillStyle = color;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
      });
    });

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    for (let i = 0; i <= canvasSize; i += cellSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvasSize, i);
      ctx.stroke();
    }
  }, [bitmap]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 bg-gradient-to-br from-blue-50 to-pink-50">
      <Helmet>
        <html lang="ru" />
        <title>Просто редактор Emoji</title>
        <meta name="description" content="Простой редактор 50x50 Emoji с выбором оттенков цвета." />
        <meta property="og:title" content="Просто редактор Emoji" />
        <meta property="og:description" content="Создавайте и редактируйте 50x50 Emoji с различными оттенками цветов." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onetime.bulaev.net/100x100/" />
        <meta property="og:image" content="https://onetime.bulaev.net/apps.jpg" />
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Просто редактор Emoji</h1>
        <div className="flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            onClick={handleCanvasClick}
            className="border border-gray-300 cursor-pointer rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center mb-4">
            <input
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
              className="w-12 h-12 mr-4 border-2 border-gray-300 rounded-full cursor-pointer"
            />
            <span className="text-lg font-semibold text-gray-700 mr-4">Выбранный цвет: {selectedColor}</span>
            <button
              onClick={handleFillAll}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Заполнить все
            </button>
          </div>
          <div className="flex space-x-2 p-4 bg-gray-100 rounded-lg shadow-inner">
            {generateShades(selectedColor).map((shade, index) => (
              <div
                key={index}
                className={`w-10 h-10 cursor-pointer rounded-full transition duration-300 ease-in-out transform hover:scale-110 ${shade === selectedShade ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
                style={{ backgroundColor: shade }}
                onClick={() => setSelectedShade(shade)}
              />
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-6">
          <a href="https://t.me/sergiobulaev/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-blue-600 transition-colors">
            Сергей Булаев AI 🤖
          </a>
          {" - об AI и не только "}
          <span className="text-gray-500">(@sergiobulaev)</span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <Link to="/">
          <img 
            src="https://onetime.bulaev.net/apps.jpg" 
            alt="Одноразовые приложения баннер" 
            className="w-[200px] mb-2 rounded-lg shadow-md"
          />
        </Link>
        <Link 
          to="/"
          className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-semibold"
        >
          Одноразовые приложения
        </Link>
      </div>
    </div>
  );
};

export default BitmapEditor;