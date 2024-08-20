import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import RandomWalkChart from '../components/RandomWalkChart';

const Drunkard = () => (
  <div style={{ padding: '20px' }}>
    <Head>
      <title>Динамически масштабируемое случайное блуждание</title>
      <meta name="description" content="Интерактивная визуализация случайного блуждания с настраиваемыми параметрами. Наглядная демонстрация математического концепта в действии." />
      <meta property="og:title" content="Случайное блуждание - Интерактивная визуализация" />
      <meta property="og:description" content="Исследуйте концепцию случайного блуждания с помощью этого интерактивного инструмента. Настройте параметры и наблюдайте за результатами в реальном времени." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://onetime.bulaev.net/drunkard/" />
      <meta property="og:image" content="https://onetime.bulaev.net/apps.jpg" />
    </Head>
    <RandomWalkChart />
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px'
    }}>
      <Link href="/">
        <img 
          src="https://onetime.bulaev.net/apps.jpg" 
          alt="Одноразовые приложения баннер" 
          style={{
            width: '200px',
            marginBottom: '10px'
          }}
        />
      </Link>
      <Link 
        href="/"
        style={{
          color: '#0088cc',
          textDecoration: 'none',
          fontSize: '14px'
        }}
      >
        Одноразовые приложения
      </Link>
    </div>
  </div>
);

export default Drunkard;