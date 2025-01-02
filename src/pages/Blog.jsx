// src/components/Blog.jsx
import React, { useMemo } from 'react';
import { Search, Calendar, Clock, ExternalLink } from 'lucide-react';
import useLinkedInPosts from '../hooks/useLinkedInPosts';
import { useLanguage } from '../context/LanguageContext';

const Blog = () => {
  const { language, t } = useLanguage();
  
  const {
    posts,
    loading,
    error,
    filter,
    setFilter,
    search,
    setSearch,
    tags,
    getTagTranslation
  } = useLinkedInPosts();

  // Memoize filtered categories
  const filteredCategories = useMemo(() => (
    tags.map(tag => ({
      key: tag,
      label: getTagTranslation(tag)
    }))
  ), [tags, getTagTranslation]);

  // Format date according to current language
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
            {t('blog_title')}
          </h1>
          <p className="text-xl dark:text-gray-300 text-gray-600">
            {t('blog_subtitle')}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          <div className="max-w-xl mx-auto mb-8 relative">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" 
              aria-hidden="true"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('blog_search_placeholder')}
              className="w-full pl-12 pr-4 py-3 rounded-full dark:bg-blue-900/30 bg-white dark:text-white text-gray-900 border dark:border-blue-800/50 border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-200"
              aria-label={t('blog_search_placeholder')}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'dark:bg-blue-900/30 bg-white dark:text-gray-300 text-gray-700 hover:bg-purple-50 dark:hover:bg-blue-900/50'}`}
              aria-pressed={filter === 'all'}
            >
              {t('filter_all')}
            </button>

            {filteredCategories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${filter === key
                    ? 'bg-purple-600 text-white'
                    : 'dark:bg-blue-900/30 bg-white dark:text-gray-300 text-gray-700 hover:bg-purple-50 dark:hover:bg-blue-900/50'}`}
                aria-pressed={filter === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content States */}
        <div className="relative min-h-[400px]">
          {loading && (
            <div className="flex justify-center items-center absolute inset-0" aria-live="polite">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
              <span className="sr-only">{t('blog_loading')}</span>
            </div>
          )}

          {error && (
            <div 
              className="text-red-500 text-center py-20" 
              role="alert"
              aria-live="assertive"
            >
              {t('blog_error')}: {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div 
              className="text-center py-20 dark:text-gray-300 text-gray-600"
              role="status"
              aria-live="polite"
            >
              {t('blog_no_results')}
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-blue-900/30 rounded-xl overflow-hidden shadow-lg transition-transform duration-200 hover:-translate-y-1"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm rounded-full
                            dark:bg-blue-900/50 bg-blue-100
                            dark:text-blue-300 text-blue-700"
                        >
                          {getTagTranslation(tag)}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t dark:border-blue-800/50 border-gray-200">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm dark:text-gray-400 text-gray-500" title={formatDate(post.date)}>
                          <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center text-sm dark:text-gray-400 text-gray-500">
                          <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
                          {post.readTime}
                        </span>
                      </div>

                      <a
                        href={post.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-purple-500 hover:text-purple-600 transition-colors duration-200"
                        aria-label={`${t('blog_read_more')} - ${post.title}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" aria-hidden="true" />
                        <span className="text-sm font-medium">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;