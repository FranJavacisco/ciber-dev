import { useState, useCallback, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Datos de ejemplo con categorías normalizadas
const MOCK_POSTS = [
    {
        id: 1,
        title: "Introducción a la Seguridad Web",
        title_en: "Introduction to Web Security",
        excerpt: "Explorando los fundamentos de la seguridad web y las mejores prácticas...",
        excerpt_en: "Exploring the fundamentals of web security and best practices...",
        image: "/post1.png",
        date: "2024-03-20",
        linkedinUrl: "https://www.linkedin.com/pulse/shodan-el-buscador-que-revolucion%C3%B3-la-ciberseguridad-lopez-c95be/",
        tags: ["security", "development"],
        readTime: "5 min"
    },
    {
        id: 2,
        title: "Shodan El Buscador que Revolucionó la Ciberseguridad",
        title_en: "Shodan The Search Engine that Revolutionized Cybersecurity",
        excerpt: "El Google de los Dispositivos que Cambió el Panorama de la Seguridad Digital...",
        excerpt_en: "The Google of Devices that Changed the Digital Security Landscape...",
        image: "/post2.png",
        date: "2024-12-22",
        linkedinUrl: "https://www.linkedin.com/pulse/shodan-el-buscador-que-revolucion%C3%B3-la-ciberseguridad-lopez-c95be/?trackingId=7YF0MD1DQE%2BQGf%2FjhBOtIA%3D%3D",
        tags: ["security"],
        readTime: "7 min"
    },
    {
        id: 3,
        title: "Cómo Manejar el Rechazo de los Procedimientos",
        title_en: "How to Handle Procedure Rejections",
        excerpt: "Explora estrategias para enfrentar y superar el rechazo en procesos...",
        excerpt_en: "Explore strategies to face and overcome rejection in processes...",
        image: "/post3.png",
        date: "2024-08-12",
        linkedinUrl: "https://www.linkedin.com/pulse/c%C3%B3mo-manejar-el-rechazo-de-los-procedimientos-francisco-a-lopez-ve5qe/",
        tags: ["development", "security"],
        readTime: "6 min"
    },
    {
        id: 4,
        title: "La biblioteca de confianza para contratos seguros en Blockchain",
        title_en: "The Trusted Library for Secure Blockchain Contracts",
        excerpt: "OpenZeppelin se ha convertido en el estándar de facto para el desarrollo de contratos inteligentes seguros...",
        excerpt_en: "OpenZeppelin has become the de facto standard for developing secure smart contracts...",
        image: "/post4.png",
        date: "2024-11-23",
        linkedinUrl: "https://www.linkedin.com/pulse/la-biblioteca-de-confianza-para-contratos-seguros-en-blockchain-afgme/",
        tags: ["security", "development"],
        readTime: "5 min"
    },
    {
        id: 5,
        title: "La solución indispensable para fortalecer la seguridad",
        title_en: "The Essential Solution to Strengthen Security",
        excerpt: "Descubre cómo fortalecer la seguridad de tu infraestructura y proteger tus activos digitales...",
        excerpt_en: "Discover how to strengthen your infrastructure security and protect your digital assets...",
        image: "/post5.jpeg",
        date: "2024-11-09",
        linkedinUrl: "https://www.linkedin.com/pulse/la-soluci%C3%B3n-indispensable-para-fortalecer-seguridad-de-lopez-zdpee/",
        tags: ["security", "devops"],
        readTime: "6 min"
    },
    {
        id: 6,
        title: "Mamba 2FA: Un nuevo contendiente en el ecosistema de Phishing",
        title_en: "Mamba 2FA: A New Contender in the Phishing Ecosystem",
        excerpt: "Análisis detallado de Mamba 2FA y su impacto en el panorama actual del phishing...",
        excerpt_en: "Detailed analysis of Mamba 2FA and its impact on the current phishing landscape...",
        image: "/post6.png",
        date: "2024-10-08",
        linkedinUrl: "https://www.linkedin.com/pulse/mamba-2fa-un-nuevo-contendiente-en-el-ecosistema-de-phishing-lopez-gveke/",
        tags: ["security"],
        readTime: "7 min"
    },
    {
        id: 7,
        title: "El ataque Pass-the-Ticket: Cómo funciona y proteger tu red",
        title_en: "Pass-the-Ticket Attack: How it Works and Protecting Your Network",
        excerpt: "Una guía completa sobre el ataque Pass-the-Ticket, sus implicaciones para la seguridad de red...",
        excerpt_en: "A complete guide on the Pass-the-Ticket attack, its implications for network security...",
        image: "/post7.jpeg",
        date: "2024-10-06",
        linkedinUrl: "https://www.linkedin.com/pulse/el-ataque-pass-ticket-c%C3%B3mo-funciona-y-proteger-tu-red-lopez-hd28e/",
        tags: ["security", "devops"],
        readTime: "8 min"
    },
    {
        id: 8,
        title: "¿Cuál es el navegador web más seguro del mundo?",
        title_en: "Which is the Most Secure Web Browser in the World?",
        excerpt: "Un análisis comparativo de los navegadores web más populares desde la perspectiva de la seguridad...",
        excerpt_en: "A comparative analysis of popular web browsers from a security perspective...",
        image: "/post8.png",
        date: "2024-10-03",
        linkedinUrl: "https://www.linkedin.com/pulse/cu%C3%A1l-es-el-navegador-web-m%C3%A1s-seguro-del-mundo-descubre-lopez-x5o2e/",
        tags: ["security", "frontend"],
        readTime: "6 min"
    },
    {
        id: 9,
        title: "Protege tu privacidad: Qué es el spyware y cómo evitarlo",
        title_en: "Protect Your Privacy: What is Spyware and How to Avoid It",
        excerpt: "Una guía exhaustiva sobre el spyware, sus diferentes tipos, métodos de infección...",
        excerpt_en: "A comprehensive guide about spyware, its different types, infection methods...",
        image: "/post9.png",
        date: "2024-09-20",
        linkedinUrl: "https://www.linkedin.com/pulse/protege-tu-privacidad-qu%C3%A9-es-el-spyware-y-c%C3%B3mo-evitarlo-lopez-8cwpe/",
        tags: ["security"],
        readTime: "7 min"
    },
    {
        id: 10,
        title: "¿Cómo hacen los ciberdelincuentes para descifrar tu contraseña?",
        title_en: "How Do Cybercriminals Crack Your Password?",
        excerpt: "Explora las técnicas y métodos utilizados por los ciberdelincuentes para comprometer contraseñas...",
        excerpt_en: "Explore the techniques and methods used by cybercriminals to compromise passwords...",
        image: "post10.png",
        date: "2024-08-25",
        linkedinUrl: "https://www.linkedin.com/pulse/c%C3%B3mo-hacen-los-ciberdelincuentes-para-descifrar-tu-contrase%C3%B1a-lopez-pjnse/",
        tags: ["security"],
        readTime: "6 min"
    },
    {
        id: 11,
        title: "¿Tus datos están seguros? Guía completa sobre buscadores",
        title_en: "Is Your Data Safe? Complete Guide About Search Engines",
        excerpt: "Una exploración detallada de la seguridad en los buscadores web y cómo proteger tu información personal...",
        excerpt_en: "A detailed exploration of web browser security and how to protect your personal information...",
        image: "/post11.png",
        date: "2024-08-18",
        linkedinUrl: "https://www.linkedin.com/pulse/tus-datos-est%C3%A1n-seguros-gu%C3%ADa-completa-sobre-buscadores-lopez-rgfhe/",
        tags: ["security", "frontend"],
        readTime: "7 min"
    }
];

// Categorías predefinidas que coinciden con las claves de traducción
const PREDEFINED_TAGS = [
    'development',
    'security',
    'frontend',
    'backend',
    'devops'
];

const useLinkedInPosts = () => {
    const { language, t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    // Obtener la traducción de una etiqueta
    const getTagTranslation = useCallback((tag) => {
        return t(`${tag}`);
    }, [t]);

    // Procesar los posts según el idioma actual
    const processedPosts = useMemo(() => {
        return MOCK_POSTS.map(post => ({
            ...post,
            title: language === 'en' ? post.title_en || post.title : post.title,
            excerpt: language === 'en' ? post.excerpt_en || post.excerpt : post.excerpt,
        }));
    }, [language]);

    // Filtrar los posts basándose en la búsqueda y el filtro seleccionado
    const filteredPosts = useMemo(() => {
        return processedPosts.filter(post => {
            if (search === '' && filter === 'all') return true;

            const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(search.toLowerCase());

            const matchesFilter = filter === 'all' || post.tags.includes(filter.toLowerCase());

            return matchesSearch && matchesFilter;
        });
    }, [processedPosts, search, filter]);

    // Obtener tags únicos y filtrarlos según los predefinidos
    const tags = useMemo(() => {
        return Array.from(new Set(
            PREDEFINED_TAGS.filter(tag =>
                processedPosts.some(post => post.tags.includes(tag))
            )
        ));
    }, [processedPosts]);

    return {
        posts: filteredPosts,
        loading,
        error,
        filter,
        setFilter,
        search,
        setSearch,
        tags,
        getTagTranslation
    };
};

export default useLinkedInPosts;