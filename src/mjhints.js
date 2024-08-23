import React from 'react';
import { Palette, Camera, Mountain, Building, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const colors = [
  'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-pink-50', 
  'bg-purple-50', 'bg-indigo-50', 'bg-red-50', 'bg-orange-50'
];

const Article = ({ title, content, colorClass, icon: Icon, height }) => (
  <div className={`border border-black shadow-sm mb-4 ${colorClass} flex flex-col rounded overflow-hidden ${height}`}>
    <h4 className="text-xs font-semibold text-white bg-gray-800 p-2 border-b border-black flex items-center">
      <Icon className="text-yellow-500 mr-2" size={14} />
      {title}
    </h4>
    <div className="p-2 flex-1 overflow-auto">
      <div className="flex items-start text-xs">
        <span className="text-gray-700">{content}</span>
      </div>
    </div>
  </div>
);

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
          height: "h-38" // Increased from h-36
        },
        {
          title: "Стили рендеринга",
          content: "Unreal Engine, Octane render, Blender render, Redshift rendering, V-ray render, C4D, Cel shaded, Stylized, Concept art",
          icon: Palette,
          height: "h-26"
        },
        {
          title: "Освещение и эффекты",
          content: "Cinematic lighting, Volumetric lighting, HDR, Global illumination, Soft shadows, Backlit, Neon lighting, Rim lighting, Chiaroscuro, Theatrical lighting, Liminal space, Depth of field, Long exposure",
          icon: Sparkles,
          height: "h-38" // Reduced from h-44
        },
        {
          title: "Текстуры и поверхности",
          content: "Filigree, Matte, Glossy, Metallic, Transparent, Smooth, Detailed, Intricate, Photographic quality",
          icon: Palette,
          height: "h-26"
        },
        {
          title: "Цветовые палитры",
          content: "Pastel, Vantablack, Sepia, Monochrome, Warm tones, Cold tones, Gradient, High contrast, Rich colors, Color grading",
          icon: Palette,
          height: "h-30" // Increased from h-28
        },
        {
          title: "Материалы",
          content: "Wood, Metal, Glass, Resin, Fabric, Organic, Porcelain, Concrete",
          icon: Palette,
          height: "h-21"
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
          height: "h-32" // Reduced from h-36
        },
        {
          title: "Кадрирование и ориентация",
          content: "In-frame, Long shot, Fullshot, Extreme close-up, Symmetrical, Asymmetrical, Curvilinear space, Perspective shift",
          icon: Camera,
          height: "h-28" // Increased from h-24
        },
        {
          title: "Движение и динамика",
          content: "Flow, Motion blur, Action shot, Static, Frozen in time, Cinematic movement",
          icon: Camera,
          height: "h-24" // Increased from h-20
        },
        {
          title: "Глубина и масштаб",
          content: "Foreground detail, Middle ground, Background, Sense of scale, Miniature, Gigantic",
          icon: Camera,
          height: "h-21"
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
          height: "h-31" // Kept as h-32
        },
        {
          title: "Атмосфера и настроение",
          content: "Eerie, Mystical, Ethereal, Liminal space, Hyperrealistic, Surreal, Immersive detail, Dark fantasy, Ineffably mysterious, Cozy",
          icon: Mountain,
          height: "h-27"
        },
        {
          title: "Погода и природные элементы",
          content: "Foggy, Sunset, Snowfall, Rain, Lush vegetation, Rocky terrain, Tropical island, Sand dunes, Depth of view, Volumetric lighting",
          icon: Mountain,
          height: "h-27"
        },
        {
          title: "Время суток и сезоны",
          content: "Golden hour, Blue hour, Midnight, Dawn, Dusk, Spring bloom, Autumn foliage, Winter wonderland, Summer haze",
          icon: Mountain,
          height: "h-24"
        },
        {
          title: "Экосистемы и биомы",
          content: "Coral reef, Rainforest canopy, Arctic tundra, Savanna grasslands, Deep sea abyss, Volcanic landscape, Bioluminescent cave, Geothermal springs, Martian terrain",
          icon: Mountain,
          height: "h-31" // Reverted to h-32
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
          height: "h-34" // Reverted to h-36
        },
        {
          title: "Текстуры и узоры",
          content: "Fractal structure, Filigree, Knitted textures, Organic twisting, Geometric designs, Scales, Symmetrical patterns, Transparent wings, Intricate details",
          icon: Building,
          height: "h-27"
        },
        {
          title: "Материалы и оекты",
          content: "Resin cube, Smooth facade, Kelp algae, Glass flowers, Intricate jewelry, Armor plating, Wooden joinery, Soft fabrics",
          icon: Building,
          height: "h-24"
        },
        {
          title: "Механизмы и технологии",
          content: "Clockwork, Steampunk machinery, Holographic displays, Nanotech, Biopunk implants, Quantum computers",
          icon: Building,
          height: "h-24"
        },
        {
          title: "Миниатюры и детализация",
          content: "Microscopic details, Intricate miniatures, Elaborate dioramas, Precision craftsmanship, Delicate engravings, Nano-scale structures",
          icon: Building,
          height: "h-27"
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
          height: "h-24"
        },
        {
          title: "Художественные движения",
          content: "Abstract expressionism, Bauhaus, Fusion art, Rococo, Impressionist painting",
          icon: Sparkles,
          height: "h-22"
        },
        {
          title: "Принципы дизайна",
          content: "Negative space, Symmetry, Precision details, Stylized, Low contrast details, Parameteric details",
          icon: Sparkles,
          height: "h-25"
        },
        {
          title: "Освещение и спецэффекты",
          content: "Cinematic lighting, Immense detail, Color grading, Visual clarity, Dynamic contrast, Soft studio lighting, Volumetric light, Lumen reflections",
          icon: Sparkles,
          height: "h-32" // Reduced from h-36
        },
        {
          title: "Экспериментальные техники",
          content: "Glitch art, Databending, Generative adversarial networks, Neural style transfer, Fractal flame algorithms, Cellular automata art",
          icon: Sparkles,
          height: "h-30" // Reduced from h-32
        }
      ]
    },
    {
      title: "Дополнительные элементы",
      articles: [
        {
          title: "Культурные и исторические элементы",
          content: "Belle Epoque, Arabic, Victorian, Aztec, Japanese style, Historical cityscapes",
          icon: Sparkles,
          height: "h-28" // Reduced from h-32
        },
        {
          title: "Органические и природные формы",
          content: "Fractal leaf structures, Floating landscapes, Fantasy flora, Geometric plants, Complex spirals, Botanical gardens, Immersive natural environments",
          icon: Sparkles,
          height: "h-36" // Reduced from h-40
        },
        {
          title: "Фантастические существа",
          content: "Mythical beasts, Alien lifeforms, Hybrid creatures, Microscopic organisms, Sentient machines",
          icon: Sparkles,
          height: "h-25"
        },
        {
          title: "Абстрактные концепции",
          content: "Time dilation, Quantum entanglement, Parallel universes, Consciousness visualization, Emotional landscapes",
          icon: Sparkles,
          height: "h-25"
        },
        {
          title: "Символизм и метафоры",
          content: "Visual allegories, Dreamscape symbolism, Archetypal imagery, Surrealist metaphors, Psychological landscapes, Mythological references",
          icon: Sparkles,
          height: "h-30" // Reduced from h-36
        }
      ]
    }
  ];

  // Distribute sections evenly across columns
  const column1 = sections.slice(0, 2);  // Стиль и эстетика, Композиция и перспектива
  const column2 = sections.slice(2, 4);  // Окружение и обстановка, Детали объектов
  const column3 = sections.slice(4);     // Художественные концепции, Дополнительные элементы

  const renderColumn = (columnSections) => (
    <div className="w-full md:w-1/3 md:px-2 flex flex-col">
      {columnSections.map((section, index) => (
        <Section key={index} title={section.title} articles={section.articles} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ECEAE1] p-4">
      <Helmet>
        <html lang="ru" />
        <title>Шпаргалка: Подсказки для Midjourney</title>
        <meta name="description" content="Подробное руководство по созданию эффективных промптов для Midjourney. Узнайте, как улучшить ваши результаты в генерации изображений." />
        <meta property="og:title" content="Шпаргалка по Midjourney" />
        <meta property="og:description" content="Ключевые подсказки и примеры для создания впечатляющих изображний с помощью Midjourney." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onetime.bulaev.net/mjhints/" />
        <meta property="og:image" content="https://onetime.bulaev.net/apps.jpg" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 border border-black mb-4">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 border-b-2 border-gray-200 pb-4">
            Шпаргалка: Подсказки для Midjourney
          </h1>
          <div className="flex flex-col md:flex-row items-stretch">
            {renderColumn(column1)}
            {renderColumn(column2)}
            {renderColumn(column3)}
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