// src/components/Blog.jsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Calendar, Tag, Share2, BookOpen, ArrowRight, LinkedIn, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Componente de Héroe Animado
const AnimatedHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="relative h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Fondo con efecto Parallax */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-purple-950"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
      </div>

      {/* Contenido del Héroe */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Blog & Insights
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Compartiendo conocimiento sobre desarrollo, seguridad y tecnología
        </motion.p>
      </div>
    </motion.div>
  );
};

// Componente de Tarjeta de Artículo Mejorada
const ArticleCard = ({ article }) => {
  const { theme } = useTheme();
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden backdrop-blur-sm
                dark:bg-blue-900/30 bg-white/80 shadow-lg
                dark:border-blue-800/50 border border-gray-200"
    >
      {/* Imagen del Artículo */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300
                   group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t 
                      dark:from-blue-950/90 from-gray-900/90 to-transparent"></div>
      </div>

      {/* Metadatos */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {article.categories?.map((category) => (
          <span
            key={category}
            className="px-3 py-1 rounded-full text-xs font-medium
                     dark:bg-purple-600/90 bg-purple-500 text-white"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2
                     group-hover:text-purple-500 transition-colors">
          {article.title}
        </h3>
        
        <p className="dark:text-gray-300 text-gray-600 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-sm dark:text-gray-400 text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {article.date}
            </span>
            <span className="flex items-center text-sm dark:text-gray-400 text-gray-500">
              <BookOpen className="w-4 h-4 mr-1" />
              {article.readTime} min
            </span>
          </div>

          <motion.a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="flex items-center text-purple-500 hover:text-purple-400"
          >
            <LinkedIn className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Leer más</span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

// Componente de Búsqueda y Filtros
const SearchAndFilters = ({ onSearch, onFilterChange, categories }) => {
  return (
    <div className="mb-12 space-y-6">
      {/* Barra de Búsqueda */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 
                        text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Buscar artículos..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full
                   dark:bg-blue-900/30 bg-white/80
                   dark:text-white text-gray-900
                   dark:border-blue-800/50 border border-gray-200
                   focus:ring-2 focus:ring-purple-500 focus:border-transparent
                   transition-all duration-200"
        />
      </div>

      {/* Filtros por Categoría */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className="px-4 py-2 rounded-full text-sm font-medium
                     dark:bg-blue-900/30 bg-white/80
                     dark:text-gray-300 text-gray-700
                     dark:border-blue-800/50 border border-gray-200
                     hover:bg-purple-500 hover:text-white
                     transition-all duration-200"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente Principal del Blog
const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['Todos', 'Desarrollo', 'Seguridad', 'DevOps', 'Frontend', 'Backend'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Aquí implementarías la llamada real a la API de LinkedIn
        const sampleArticles = [
          {
            id: 1,
            title: "El Futuro del Desarrollo Web",
            excerpt: "Explorando las últimas tendencias en desarrollo web y lo que nos depara el futuro. Desde frameworks modernos hasta nuevas metodologías de desarrollo.",
            date: "22 Dic 2024",
            image: "/api/placeholder/800/400",
            url: "https://linkedin.com/post/1",
            categories: ['Desarrollo', 'Frontend'],
            readTime: 5
          },
          // ... más artículos
        ];
        
        setArticles(sampleArticles);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los artículos");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filtrado de artículos
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          article.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen dark:bg-blue-950 bg-gray-50 transition-colors duration-300">
      <AnimatedHero />
      
      <main className="max-w-7xl mx-auto px-4 py-16 relative">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 w-96 h-96 
                       dark:bg-purple-600/20 bg-purple-300/20 
                       rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 left-0 w-96 h-96 
                       dark:bg-blue-600/20 bg-blue-300/20 
                       rounded-full blur-3xl"></div>
        </div>

        {/* Contenido */}
        <div className="relative">
          <SearchAndFilters
            onSearch={setSearchTerm}
            onFilterChange={setSelectedCategory}
            categories={categories}
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 
                           border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-20">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="dark:bg-blue-900/50 bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-4">
            Conéctate conmigo
          </h2>
          <p className="dark:text-gray-300 text-gray-600 mb-6">
            Sígueme en LinkedIn y GitHub para más contenido
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full dark:bg-blue-900/30 bg-white/80
                       dark:text-white text-gray-900 hover:text-purple-500
                       transition-colors duration-200"
            >
              <LinkedIn className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full dark:bg-blue-900/30 bg-white/80
                       dark:text-white text-gray-900 hover:text-purple-500
                       transition-colors duration-200"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;