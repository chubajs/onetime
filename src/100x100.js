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
      for (let i = 0; i < 10; i++) {
        const shade = adjustBrightness(color, (i - 5) * 10);
        shades.push(shade);
      }
      return shades;
    };
  }, []);

  const adjustBrightness = (hex, percent) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return `#${(1 << 24 | (R < 255 ? R < 1 ? 0 : R : 255) << 16 | (G < 255 ? G < 1 ? 0 : G : 255) << 8 | (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
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
    <div className="min-h-screen bg-gray-100 p-4">
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
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Просто редактор Emoji</h1>
        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            onClick={handleCanvasClick}
            className="border border-gray-200 cursor-pointer"
          />
        </div>
        <div className="mb-4">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="mr-2"
          />
          <span>Выбранный цвет: {selectedColor}</span>
        </div>
        <div className="flex space-x-2 mb-4">
          {generateShades(selectedColor).map((shade, index) => (
            <div
              key={index}
              className={`w-8 h-8 cursor-pointer ${shade === selectedShade ? 'ring-2 ring-blue-500' : ''}`}
              style={{ backgroundColor: shade }}
              onClick={() => setSelectedShade(shade)}
            />
          ))}
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          <a href="https://t.me/sergiobulaev/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-blue-600 transition-colors">
            Сергей Булаев AI 🤖
          </a>
          {" - об AI и не только "}
          <span className="text-gray-500">(@sergiobulaev)</span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <Link to="/">
          <img 
            src="https://onetime.bulaev.net/apps.jpg" 
            alt="Одноразовые приложения баннер" 
            className="w-[200px] mb-2"
          />
        </Link>
        <Link 
          to="/"
          className="text-blue-600 hover:text-blue-800 transition-colors text-xs"
        >
          Одноразовые приложения
        </Link>
      </div>
    </div>
  );
};

export default BitmapEditor;