import React from 'react';
import { Palette, Camera, Mountain, Building, Sparkles, Sun, Cloud, Clock, Leaf, Zap, Feather, Compass, Layers, Droplet, Wind } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const colors = [
  'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-pink-50', 
  'bg-purple-50', 'bg-indigo-50', 'bg-red-50', 'bg-orange-50'
];

const Article = ({ title, content, colorClass, icon: Icon, height }) => {
  const [copiedWord, setCopiedWord] = useState(null);

  const handleWordClick = (word) => {
    navigator.clipboard.writeText(word.toLowerCase()).then(() => {
      setCopiedWord(word);
      setTimeout(() => setCopiedWord(null), 1000);
    });
  };

  const renderContent = () => {
    return content.split(', ').map((word, index) => (
      <span
        key={index}
        className={`cursor-pointer inline-block font-bold ${copiedWord === word ? 'text-blue-600' : 'hover:underline'}`}
        onClick={() => handleWordClick(word)}
      >
        {copiedWord === word ? "скопировано" : word.toLowerCase()}
        {index < content.split(', ').length - 1 && (
          <span className="mr-1">,</span>
        )}
      </span>
    ));
  };

  return (
    <div className={`border border-black shadow-sm mb-4 ${colorClass} flex flex-col rounded overflow-hidden`} style={{height}}>
      <h4 className="text-xs font-semibold text-white bg-gray-800 p-2 border-b border-black flex items-center">
        <Icon className="text-yellow-500 mr-2 flex-shrink-0" size={14} />
        <span className="truncate">{title}</span>
      </h4>
      <div className="p-2 flex-1 overflow-auto">
        <div className="text-xs text-gray-700 break-words">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, articles }) => (
  <div className="mb-6 last:mb-0 border border-gray-300 rounded p-3 relative">
    <h3 className="font-semibold text-sm absolute -top-3 left-3 bg-white px-2">
      {title}
    </h3>
    <div className="mt-3 flex flex-col h-full">
      {articles.map((article, index) => (
        <Article 
          key={index} 
          title={article.title} 
          content={article.content} 
          colorClass={colors[index % colors.length]} 
          icon={article.icon}
          height={article.height}
        />
      ))}
    </div>
  </div>
);

const MJHints = () => {
  const sections = [
    {
      title: "Стиль и эстетика",
      articles: [
        {
          title: "Художественные стили",
          content: "Art nouveau, Impressionist, Cubism, Rococo, Bauhaus, Photorealistic, Cyberpunk, Steampunk, Fractalpunk, Pixelated, Gothic, Renaissance, Minimalist, Baroque, Futuristic, Hyperrealism",
          icon: Palette,
          height: "132px"
        },
        {
          title: "Стили рендеринга",
          content: "Unreal Engine, Octane render, Blender render, Redshift rendering, V-ray render, C4D, Cel shaded, Stylized, Concept art",
          icon: Layers,
          height: "104px"
        },
        {
          title: "Освещение и эффекты",
          content: "Cinematic lighting, Volumetric lighting, HDR, Global illumination, Soft shadows, Backlit, Neon lighting, Rim lighting, Chiaroscuro, Theatrical lighting, Liminal space, Depth of field, Long exposure",
          icon: Sun,
          height: "140px"
        },
        {
          title: "Текстуры и поверхности",
          content: "Filigree, Matte, Glossy, Metallic, Transparent, Smooth, Detailed, Intricate, Photographic quality",
          icon: Droplet,
          height: "104px"
        },
        {
          title: "Цветовые палит��ы",
          content: "Pastel, Vantablack, Sepia, Monochrome, Warm tones, Cold tones, Gradient, High contrast, Rich colors, Color grading",
          icon: Palette,
          height: "105px"
        },
        {
          title: "Материалы",
          content: "Wood, Metal, Glass, Resin, Fabric, Organic, Porcelain, Concrete",
          icon: Feather,
          height: "84px"
        }
      ]
    },
    {
      title: "Композиция и перспектива",
      articles: [
        {
          title: "Камера и вид",
          content: "Close-up, Wide-angle, Bird's-eye view, Profile, Full-body shot, Front-facing, Over-the-shoulder, Portrait, Macro photography",
          icon: Camera,
          height: "120px"
        },
        {
          title: "Кадрирование и ориентация",
          content: "In-frame, Long shot, Fullshot, Extreme close-up, Symmetrical, Asymmetrical, Curvilinear space, Perspective shift",
          icon: Compass,
          height: "112px"
        },
        {
          title: "Движение и динамика",
          content: "Flow, Motion blur, Action shot, Static, Frozen in time, Cinematic movement",
          icon: Wind,
          height: "96px"
        },
        {
          title: "Глубина и масштаб",
          content: "Foreground detail, Middle ground, Background, Sense of scale, Miniature, Gigantic",
          icon: Layers,
          height: "84px"
        }
      ]
    },
    {
      title: "Окружение и обстановка",
      articles: [
        {
          title: "Локации и декорации",
          content: "Labyrinth, Floating buildings, Dark forest, Ancient ruins, Urban landscape, Cosmic diorama, Desert resort, Jungle, Alien city, Snowy forest",
          icon: Mountain,
          height: "120px"
        },
        {
          title: "Атмосфера и настроение",
          content: "Eerie, Mystical, Ethereal, Liminal space, Hyperrealistic, Surreal, Immersive detail, Dark fantasy, Ineffably mysterious, Cozy",
          icon: Cloud,
          height: "108px"
        },
        {
          title: "Погода и природные элементы",
          content: "Foggy, Sunset, Snowfall, Rain, Lush vegetation, Rocky terrain, Tropical island, Sand dunes, Depth of view, Volumetric lighting",
          icon: Clock,
          height: "109px"
        },
        {
          title: "Время суток и сезоны",
          content: "Golden hour, Blue hour, Midnight, Dawn, Dusk, Spring bloom, Autumn foliage, Winter wonderland, Summer haze",
          icon: Leaf,
          height: "96px"
        },
        {
          title: "Экосистемы и биомы",
          content: "Coral reef, Rainforest canopy, Arctic tundra, Savanna grasslands, Deep sea abyss, Volcanic landscape, Bioluminescent cave, Geothermal springs, Martian terrain",
          icon: Zap,
          height: "110px"
        }
      ]
    },
    {
      title: "Детали объектов",
      articles: [
        {
          title: "Архитектура и дизайн",
          content: "Parametric design, Curved architecture, Transparent smooth facade, Biomorphic details, Architectural photography, Futuristic towers, Intricate filigree metalwork, Old buildings, Steep staircases",
          icon: Building,
          height: "130px"
        },
        {
          title: "Текстуры и узоры",
          content: "Fractal structure, Filigree, Knitted textures, Organic twisting, Geometric designs, Scales, Symmetrical patterns, Transparent wings, Intricate details",
          icon: Droplet,
          height: "108px"
        },
        {
          title: "Материалы и оекты",
          content: "Resin cube, Smooth facade, Kelp algae, Glass flowers, Intricate jewelry, Armor plating, Wooden joinery, Soft fabrics",
          icon: Feather,
          height: "96px"
        },
        {
          title: "Механизмы и технологии",
          content: "Clockwork, Steampunk machinery, Holographic displays, Nanotech, Biopunk implants, Quantum computers",
          icon: Compass,
          height: "96px"
        },
        {
          title: "Миниатюры и детализация",
          content: "Microscopic details, Intricate miniatures, Elaborate dioramas, Precision craftsmanship, Delicate engravings, Nano-scale structures",
          icon: Layers,
          height: "108px"
        }
      ]
    },
    {
      title: "Художественные концепции",
      articles: [
        {
          title: "Техники рендеринга",
          content: "Super-Resolution, Gigapixel, Ray tracing, Hypermaximalist, Vector illustration",
          icon: Sparkles,
          height: "96px"
        },
        {
          title: "Художественные движения",
          content: "Abstract expressionism, Bauhaus, Fusion art, Rococo, Impressionist painting",
          icon: Palette,
          height: "88px"
        },
        {
          title: "Принципы дизайна",
          content: "Negative space, Symmetry, Precision details, Stylized, Low contrast details, Parameteric details",
          icon: Compass,
          height: "100px"
        },
        {
          title: "Освещение и спецэффекты",
          content: "Cinematic lighting, Immense detail, Color grading, Visual clarity, Dynamic contrast, Soft studio lighting, Volumetric light, Lumen reflections",
          icon: Sun,
          height: "128px"
        },
        {
          title: "Экспериментальные техники",
          content: "Glitch art, Databending, Generative adversarial networks, Neural style transfer, Fractal flame algorithms, Cellular automata art",
          icon: Zap,
          height: "112px"
        }
      ]
    },
    {
      title: "Дополнительные элементы",
      articles: [
        {
          title: "Культурные и исторические элементы",
          content: "Belle Epoque, Arabic, Victorian, Aztec, Japanese style, Historical cityscapes",
          icon: Clock,
          height: "102px"
        },
        {
          title: "Органические и природные формы",
          content: "Fractal leaf structures, Floating landscapes, Fantasy flora, Geometric plants, Complex spirals, Botanical gardens, Immersive natural environments",
          icon: Leaf,
          height: "137px"
        },
        {
          title: "Фантастические существа",
          content: "Mythical beasts, Alien lifeforms, Hybrid creatures, Microscopic organisms, Sentient machines",
          icon: Zap,
          height: "100px"
        },
        {
          title: "Абстрактные концепции",
          content: "Time dilation, Quantum entanglement, Parallel universes, Consciousness visualization, Emotional landscapes",
          icon: Sparkles,
          height: "100px"
        },
        {
          title: "Символизм и метафоры",
          content: "Visual allegories, Dreamscape symbolism, Archetypal imagery, Surrealist metaphors, Psychological landscapes, Mythological references",
          icon: Palette,
          height: "118px"
        }
      ]
    }
  ];

  // Распределение секций по колонкам с точными высотами
  const column1 = [
    { section: sections[0], height: '720px' },
    { section: sections[1], height: '420px' },
  ];

  const column2 = [
    { section: sections[2], height: '560px' },
    { section: sections[3], height: '580px' },
  ];

  const column3 = [
    { section: sections[4], height: '550px' },
    { section: sections[5], height: '590px' },
  ];

  const renderColumn = (columnSections, startIndex) => (
    <div className="w-full md:w-1/3 md:px-2 flex flex-col">
      {columnSections.map(({ section, height }, index) => (
        <Section 
          key={startIndex + index} 
          title={section.title} 
          articles={section.articles}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ECEAE1] p-4">
      <Helmet>
        <html lang="ru" />
        <title>Идеи для промптов Midjourney | Улучшите ваши AI-генерированные изображения</title>
        <meta name="description" content="Справочник ключевых слов и концепций для вашего вдохновения при создании изображений с помощью Midjourney." />
        <meta property="og:title" content="Идеи для промптов Midjourney | Улучшите ваши AI изображения" />
        <meta property="og:description" content="Откройте для себя обширную коллекцию ключевых слов, стилей и концепций для создания уникальных и впечатляющих изображений с помощью Midjourney. Повысьте качество ваших AI-генерированных изображений." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onetime.bulaev.net/mjhints/" />
        <meta property="og:image" content="https://onetime.bulaev.net/apps.jpg" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 border border-black mb-4">
          <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Идеи для промптов Midjourney
          </h1>
          <p className="text-center text-sm text-gray-600 mb-6 border-b-2 border-gray-200 pb-4">
            Коллекция ключевых слов и концепций для создания впечатляющих изображений. Нажмите на ключевое слово, чтобы скопировать и использовать в ваших промптах.
          </p>
          <div className="flex flex-col md:flex-row items-stretch">
            {renderColumn(column1, 0)}
            {renderColumn(column2, 2)}
            {renderColumn(column3, 4)}
          </div>
          <div className="mt-6 text-center text-xs text-gray-600">
            <a href="https://t.me/sergiobulaev/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-blue-600 transition-colors">
              Сергей Булаев AI 🤖
            </a>
            {" - об AI и не только "}
            <span className="text-gray-500">(@sergiobulaev)</span>
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
            className="text-blue-600 hover:text-blue-800 transition-colors text-xs"
          >
            Одноразовые приложения
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MJHints;