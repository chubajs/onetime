import React from 'react';
import { MessageCircle, Zap, Smile, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const colors = [
  'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-pink-50', 
  'bg-purple-50', 'bg-indigo-50', 'bg-red-50', 'bg-orange-50'
];

const Article = ({ title, content, colorClass, icon: Icon }) => {
  const [copiedWord, setCopiedWord] = useState(null);

  const handleWordClick = (word) => {
    navigator.clipboard.writeText(word).then(() => {
      setCopiedWord(word);
      setTimeout(() => setCopiedWord(null), 1000);
    });
  };

  const renderContent = () => {
    return content.map((item, index) => (
      <tr key={index} className="border-b border-gray-200">
        <td className="py-2 px-4">
          <span
            className={`cursor-pointer text-2xl ${copiedWord === item.emoji ? 'text-blue-600' : 'hover:underline'}`}
            onClick={() => handleWordClick(item.emoji)}
          >
            {item.emoji}
          </span>
        </td>
        <td className="py-2 px-4">{item.meaning}</td>
        <td className="py-2 px-4">{item.example}</td>
      </tr>
    ));
  };

  return (
    <div className={`border border-black shadow-sm mb-4 ${colorClass} flex flex-col rounded overflow-hidden`}>
      <h4 className="text-lg font-semibold text-white bg-gray-800 p-3 border-b border-black flex items-center">
        <Icon className="text-yellow-500 mr-2 flex-shrink-0" size={24} />
        <span>{title}</span>
      </h4>
      <div className="p-4 flex-1 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2 px-4">Эмодзи/Фраза</th>
              <th className="text-left py-2 px-4">Значение</th>
              <th className="text-left py-2 px-4">Пример</th>
            </tr>
          </thead>
          <tbody>
            {renderContent()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GenZEmoji = () => {
  const articles = [
    {
      title: "Выражения и реакции",
      content: [
        { emoji: '💀', meaning: "Очень смешно", example: '"Я умираю от смеха"' },
        { emoji: '😭', meaning: "Невероятно мило/смешно/трогательно", example: "Слезы радости" },
        { emoji: '🤡', meaning: "Глупость", example: "Указание на нелепое поведение" },
        { emoji: '😅', meaning: "Стресс, но притворяюсь, что все в порядке", example: 'Мем "Все нормально"' },
        { emoji: '👍', meaning: "Сарказм или пассивная агрессия", example: "На самом деле не одобрение" },
        { emoji: '🙃', meaning: "Это ужасно", example: "Жизнь - боль" },
        { emoji: '👁️👄👁️', meaning: "Шок или оцепенение", example: "Удивление с широко открытыми глазами" },
        { emoji: '🤪', meaning: "Дурашливое, глупое или странное настроение", example: "Указывает на глупость или веселье" },
        { emoji: '😳🕶🤏', meaning: "Что я только что увидел", example: "Выражение недоверия" },
        { emoji: '✋😐🤚', meaning: "Подожди, минутку", example: "Пауза для размышления" },
        { emoji: '☝️🤓', meaning: "Вообще-то", example: "Собираюсь кого-то поправить" },
        { emoji: '☝️😮✊���', meaning: "Неважно", example: "Передумал" },
        { emoji: '🤣🫵', meaning: "Смеюсь над кем-то", example: "Указывание и смех" },
        { emoji: '🫵😨', meaning: "Сзади тебя", example: "Предупреждение или шутка" },
        { emoji: '😐⌚👞', meaning: "Когда кто-то слишком долго", example: "Нетерпеливое ожидание" },
        { emoji: '😃👉🚪', meaning: "Я пошел", example: "Уход из ситуации" },
        { emoji: '🤸🕳️', meaning: "Пока, я ухожу", example: "Драматичный выход из ситуации" },
        { emoji: '🕳️👨‍🦯', meaning: "Внезапно я ничего не вижу", example: "Намеренное игнорирование чего-либо" },
        { emoji: '🙄🤝😐', meaning: "Вынужденное согласие", example: "Неохотное согласие" },
        { emoji: '😶‍🌫️', meaning: "Замешательство или состояние 'под кайфом'", example: '"Я потерялся" или "Я не соображаю"' },
        { emoji: '🧍‍♀️', meaning: "Неловкое молчание", example: "Неудобно стоять на месте" },
        { emoji: '🫠', meaning: "Таять от смущения или стресса", example: "Медленно исчезать из ситуации" },
        { emoji: '🥴', meaning: "Чувствовать себя странно", example: '"Я не в порядке" или "Это странно"' },
        { emoji: '😮‍💨', meaning: "Облегчение или истощение", example: "Тяжело вздыхать" },
      ],
      icon: Smile,
    },
    {
      title: "Действия и жесты",
      content: [
        { emoji: '🙏', meaning: "Пожалуйста или Спасибо", example: "Мольба или благодарность" },
        { emoji: '🔥', meaning: "Горячий, привлекательный или стильный", example: "Комплимент внешнему виду" },
        { emoji: '👀', meaning: "Заинтересован или любопытно", example: '"Расскажи подробнее"' },
        { emoji: '⏳', meaning: "Привлекательная фигура", example: "Фигура песочные часы" },
        { emoji: '❤️', meaning: "Может использоваться саркастически", example: '"Нет ❤️" означает "Извин��, но нет"' },
        { emoji: '☕🤏', meaning: "Попивать чай (сплетни)", example: "Наслаждаться сочной информацией" },
        { emoji: '🤥👖🔥', meaning: "Врун, врун, штаны в огне", example: "Указание на ложь" },
        { emoji: '📃✍️🧐', meaning: "Отмечено", example: "Делаю мысленные заметки" },
        { emoji: '🧎‍♀️🚶‍♀️🦽🧑‍🦽', meaning: "Пожалуйста, я умоляю", example: "Отчаянная мольба" },
        { emoji: '🫳🎤', meaning: "Бросаю микрофон", example: "Сделать впечатляющее заявление" },
        { emoji: '🎤🪿', meaning: "Есть что сказать?", example: "Приглашение высказаться" },
        { emoji: '🧠🫥', meaning: "Ни одной мысли, голова пуста", example: "Чувство пустоты или глупости" },
        { emoji: '🫶', meaning: "Любовь или поддержка", example: "Выражение привязанности или согласия" },
        { emoji: '🤌', meaning: "Шеф-повар целует или совершенство", example: "Выражение восхищения или удовлетворения" },
        { emoji: '🗿', meaning: "Стоический или невпечатленный", example: "Бесстрастная реакция" },
        { emoji: '🦕🦖', meaning: "Древний или устаревший", example: "Называть что-то старомодным" },
      ],
      icon: Zap,
    },
    {
      title: "Фразы и концепции",
      content: [
        { emoji: '🚩', meaning: "Красный флаг", example: "Тревожный знак в отношениях или ситуациях" },
        { emoji: '💅', meaning: "Забота о себе или безразличие", example: '"Я сосредоточен на себе" или "Мне все равно"' },
        { emoji: '🤡🌎', meaning: "Мир клоунов", example: "Выражение абсурдности мира" },
        { emoji: '😌🙏', meaning: "Благословенный или благодарный", example: "Выражение благодарности или удовлетворенности" },
      ],
      icon: MessageCircle,
    },
    {
      title: "Комбинации эмодзи",
      content: [
        { emoji: '🏃‍♀️💨', meaning: "Убегать от проблем", example: '"Я избегаю своих обязанностей"' },
        { emoji: '🙈🙉🙊', meaning: "Ничего не вижу, ничего не слышу, ничего не скажу", example: "Игнорирование или избегание чего-либо" },
        { emoji: '👁️🫦👁️', meaning: "Флиртующий или намекающий взгляд", example: "Выражение влечения или интереса" },
        { emoji: '🧘‍♀️☕️📚', meaning: "День заботы о себе", example: "Расслабление и время для себя" },
        { emoji: '🕯️📚🧙‍♀️', meaning: "Учеба или занятие магией", example: '"Пора браться за книги" или "Колдую"' },
      ],
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-[#ECEAE1] p-4">
      <Helmet>
        <html lang="ru" />
        <title>Шпаргалка по эмодзи поколения Z для родителей</title>
        <meta name="description" content="Узнайте, как поколение Z использует эмодзи в современном общении." />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 border border-black mb-4">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Шпаргалка по эмодзи поколения Z для родителей
          </h1>
          <p className="text-center text-base text-gray-600 mb-6 border-b-2 border-gray-200 pb-4">
            Узнайте, как ваши дети используют эмодзи в современном общении. Нажмите на эмодзи, чтобы скопировать.
          </p>
          <div className="flex flex-col items-stretch">
            {articles.map((article, index) => (
              <Article 
                key={index}
                title={article.title} 
                content={article.content} 
                colorClass={colors[index % colors.length]} 
                icon={article.icon}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/">
            <img 
              src="https://onetime.bulaev.net/apps.jpg" 
              alt="Одноразовые приложения баннер" 
              className="w-[200px] mb-2"
            />
          </Link>
          <Link 
            to="/"
            className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
          >
            Одноразовые приложения
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GenZEmoji;