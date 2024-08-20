import React, { useState, useEffect, useRef } from 'react';

const RandomWalkChart = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState(null);
  const [numPaths, setNumPaths] = useState(1);
  const [totalSteps, setTotalSteps] = useState(10000);
  const [animationSpeed, setAnimationSpeed] = useState(1); // New state for animation speed
  const canvasRef = useRef(null);
  const distanceCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const pathsRef = useRef([]);

  const SVG_WIDTH = 800;
  const SVG_HEIGHT = 400;
  const DISTANCE_HEIGHT = 50;
  const INITIAL_VISIBLE_STEPS = 50;
  const BASE_ANIMATION_DURATION = 15000; // 15 seconds
  const COLORS = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966'
  ];
  const VERTICAL_PADDING = 20;

  const generatePaths = () => {
    try {
      return Array(numPaths).fill().map(() => {
        let y = 0;
        return Array(totalSteps + 1).fill().map(() => {
          y += Math.random() < 0.5 ? -1 : 1;
          return y;
        });
      });
    } catch (err) {
      console.error("Error generating paths:", err);
      setError("Ошибка при генерации данных");
      return [];
    }
  };

  const getCurrentExtrema = (paths, currentStep) => {
    try {
      let min = 0, max = 0;
      for (let i = 0; i <= currentStep; i++) {
        for (let path of paths) {
          min = Math.min(min, path[i]);
          max = Math.max(max, path[i]);
        }
      }
      return { min, max };
    } catch (err) {
      console.error("Error calculating extrema:", err);
      setError("Ошибка при расчете экстремумов");
      return { min: 0, max: 0 };
    }
  };

  const drawPaths = (ctx, paths, currentStep) => {
    try {
      ctx.clearRect(0, 0, SVG_WIDTH, SVG_HEIGHT);

      const { min, max } = getCurrentExtrema(paths, currentStep);
      const range = Math.max(Math.abs(min), Math.abs(max), 1);
      
      const visibleSteps = Math.max(INITIAL_VISIBLE_STEPS, currentStep);
      const scaleX = SVG_WIDTH / visibleSteps;
      const scaleY = (SVG_HEIGHT - 2 * VERTICAL_PADDING) / (2 * range);

      // Draw center line
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, SVG_HEIGHT / 2);
      ctx.lineTo(SVG_WIDTH, SVG_HEIGHT / 2);
      ctx.stroke();

      // Draw paths
      paths.forEach((path, index) => {
        ctx.strokeStyle = COLORS[index % COLORS.length];
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, SVG_HEIGHT / 2 - path[0] * scaleY);
        for (let i = 1; i <= currentStep; i++) {
          const x = (i / visibleSteps) * SVG_WIDTH;
          ctx.lineTo(x, SVG_HEIGHT / 2 - path[i] * scaleY);
        }
        ctx.stroke();
      });

      // Display current extrema values and step count
      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Max: ${max}`, 10, 20);
      ctx.fillText(`Min: ${min}`, 10, SVG_HEIGHT - 10);
      ctx.fillText(`Шаг: ${currentStep}`, SVG_WIDTH - 70, 20);

      // Draw distances
      const distanceCtx = distanceCanvasRef.current.getContext('2d');
      distanceCtx.clearRect(0, 0, SVG_WIDTH, DISTANCE_HEIGHT);
      distanceCtx.font = '16px Arial';
      const squareSize = 20;
      const padding = 25;
      const textPadding = 30; // Increased space for text
      const totalWidth = paths.length * (squareSize + textPadding + padding);
      const startX = (SVG_WIDTH - totalWidth) / 2;
      paths.forEach((path, index) => {
        const distance = Math.abs(path[currentStep]);
        const x = startX + index * (squareSize + textPadding + padding);
        distanceCtx.fillStyle = COLORS[index % COLORS.length];
        distanceCtx.fillRect(x, 15, squareSize, squareSize);
        distanceCtx.fillStyle = 'black';
        distanceCtx.fillText(`${distance}`, x + squareSize + 5, 32);
      });
    } catch (err) {
      console.error("Error drawing paths:", err);
      setError("Ошибка при отрисовке графика");
    }
  };

  const animate = (startTime) => {
    try {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / (BASE_ANIMATION_DURATION / animationSpeed), 1);
      const currentStep = Math.floor(progress * totalSteps);

      const ctx = canvasRef.current.getContext('2d');
      drawPaths(ctx, pathsRef.current, currentStep);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(() => animate(startTime));
      } else {
        setIsAnimating(false);
      }
    } catch (err) {
      console.error("Animation error:", err);
      setError("Ошибка анимации");
      setIsAnimating(false);
    }
  };

  const startAnimation = (pathCount) => {
    setError(null);
    setIsAnimating(true);
    setNumPaths(pathCount);
    pathsRef.current = generatePaths();
    const startTime = Date.now();
    animationRef.current = requestAnimationFrame(() => animate(startTime));
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    pathsRef.current = generatePaths();
  }, [numPaths, totalSteps]);

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      maxWidth: SVG_WIDTH + 'px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', marginBottom: '15px' }}>
        Динамически масштабируемое{' '}
        <a 
          href="https://t.me/sergiobulaev/365" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#0088cc', textDecoration: 'none' }}
        >
          случайное блуждание
        </a>
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
        <button onClick={() => startAnimation(1)} disabled={isAnimating} style={buttonStyle(isAnimating)}>
          1 блуждание
        </button>
        <button onClick={() => startAnimation(3)} disabled={isAnimating} style={buttonStyle(isAnimating)}>
          3 блуждания
        </button>
        <button onClick={() => startAnimation(6)} disabled={isAnimating} style={buttonStyle(isAnimating)}>
          6 блужданий
        </button>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
          <label htmlFor="stepsInput" style={{ marginRight: '10px' }}>Шаги:</label>
          <input
            id="stepsInput"
            type="number"
            value={totalSteps}
            onChange={(e) => setTotalSteps(parseInt(e.target.value) || 10000)}
            min="100"
            max="100000"
            style={{ width: '80px', padding: '5px', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
          <label htmlFor="speedInput" style={{ marginRight: '10px' }}>Скорость:</label>
          <input
            id="speedInput"
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            style={{ width: '100px' }}
          />
          <span style={{ marginLeft: '5px' }}>{animationSpeed.toFixed(1)}x</span>
        </div>
      </div>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          width={SVG_WIDTH}
          height={SVG_HEIGHT}
          style={{
            border: '1px solid #ddd',
            borderRadius: '5px',
            display: 'block',
            margin: '0 auto',
            backgroundColor: 'white',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
      <div style={{ width: '100%', overflow: 'hidden', marginTop: '10px' }}>
        <canvas
          ref={distanceCanvasRef}
          width={SVG_WIDTH}
          height={DISTANCE_HEIGHT}
          style={{
            border: '1px solid #ddd',
            borderRadius: '5px',
            display: 'block',
            margin: '0 auto',
            backgroundColor: 'white',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
      <div style={{
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '14px',
        color: '#555'
      }}>
        Сделано Клодом под руководством <a 
          href="https://t.me/sergiobulaev" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#0088cc',
            textDecoration: 'none'
          }}
        >
          Сергей Булаев AI 🤖
        </a>
      </div>
    </div>
  );
};

const buttonStyle = (isDisabled) => ({
  padding: '10px 15px',
  fontSize: '14px',
  backgroundColor: isDisabled ? '#cccccc' : '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: isDisabled ? 'not-allowed' : 'pointer',
  transition: 'background-color 0.3s'
});

const Drunkard = () => (
  <div style={{ padding: '20px' }}>
    <RandomWalkChart />
  </div>
);

export default Drunkard;