import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const apps = [
  {
    name: 'Случайное блуждание',
    description: 'Интерактивная визуализация математического концепта случайного блуждания.',
    path: '/drunkard',
    icon: '🚶‍♂️'
  },
  {
    name: 'Шпаргалка по ИИ',
    description: 'Проблемы взаимодействия с ИИ и их решения в удобном формате.',
    path: '/aiproblemscheat',
    icon: '🤖'
  }
  // Добавьте здесь другие приложения по мере их создания
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <html lang="ru" />
        <title>Одноразовые приложения | Сергей Булаев</title>
        <meta name="description" content="Коллекция одноразовых приложений, созданных с помощью ИИ. Демонстрация возможностей искусственного интеллекта в разработке." />
        <meta property="og:title" content="Одноразовые приложения | Сергей Булаев" />
        <meta property="og:description" content="Исследуйте коллекцию уникальных одноразовых приложений, созданных с использованием ИИ." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onetime.bulaev.net/" />
        <meta property="og:image" content="https://onetime.bulaev.net/apps.jpg" />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Одноразовые приложения
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Коллекция уникальных приложений, созданных с помощью ИИ для демонстрации его возможностей.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {apps.map((app) => (
            <Link 
              key={app.path} 
              to={app.path}
              className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition duration-300"
            >
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {app.icon} {app.name}
              </h2>
              <p className="font-normal text-gray-700">
                {app.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a 
            href="https://t.me/sergiobulaev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium mr-4"
          >
            Telegram канал
          </a>
          <a 
            href="https://github.com/chubajs/onetime" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            GitHub репозиторий
          </a>
        </div>
        <footer className="mt-8 text-center text-gray-500 text-sm">
          © 2024 Сергей Булаев. Все права защищены.
        </footer>
      </div>
    </div>
  );
};

export default Home;