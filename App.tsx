import React, { useState, useMemo } from 'react';
import { Language } from './types';
import { TRANSLATIONS, MOCK_CARPETS } from './constants';

const ITEMS_PER_PAGE = 6;

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [currentPage, setCurrentPage] = useState(1);

  const t = TRANSLATIONS[lang];
  const totalPages = Math.ceil(MOCK_CARPETS.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return MOCK_CARPETS.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcfb]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-12 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-light tracking-widest text-[#444] muji-font-serif">
              {t.title}
            </h1>
            <p className="text-sm text-gray-400 mt-2 tracking-widest uppercase">
              {t.subtitle}
            </p>
          </div>
          
          <button 
            onClick={toggleLanguage}
            className="px-4 py-1 border border-gray-300 text-xs text-gray-500 hover:bg-gray-50 transition-colors tracking-widest"
          >
            {lang === 'zh' ? 'ENGLISH / EN' : '中文 / CN'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {currentItems.map((carpet) => (
            <div key={carpet.id} className="group bg-white flex flex-col">
              <div className="overflow-hidden bg-gray-100 aspect-[3/2]">
                <img 
                  src={carpet.imageUrl} 
                  alt={carpet.name[lang]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="py-6 flex flex-col gap-2">
                <h3 className="text-lg font-normal text-[#333] tracking-tight">
                  {carpet.name[lang]}
                </h3>
                <p className="text-sm text-gray-400">
                  {t.materialLabel}: {carpet.material[lang]}
                </p>
                <p className="text-2xl font-medium text-[#c00] mt-2">
                  <span className="text-sm mr-1">{t.priceCurrency}</span>
                  {carpet.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="flex items-center gap-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`text-sm tracking-widest px-4 py-2 border border-gray-200 transition-colors ${
                currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t.prevPage}
            </button>
            
            <span className="text-sm text-gray-400 tracking-widest">
              {t.pageOf.replace('{current}', currentPage.toString()).replace('{total}', totalPages.toString())}
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`text-sm tracking-widest px-4 py-2 border border-gray-200 transition-colors ${
                currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t.nextPage}
            </button>
          </div>
        </div>
      </main>

      {/* Footer - 此处已填入您的最新联系信息 */}
      <footer className="bg-[#f2f2f2] border-t border-gray-200 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 tracking-widest uppercase mb-6">
              {t.contactTitle}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-500 font-light">
              <p className="flex items-center gap-2">
                <span className="font-normal text-gray-400 w-16">{t.email}:</span>
                <a href="mailto:huangsmile1985@gmail.com" className="hover:text-gray-800 transition-colors underline">
                  huangsmile1985@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-normal text-gray-400 w-16">{t.phone}:</span>
                <a href="tel:+8615620656792" className="hover:text-gray-800 transition-colors underline">
                  +86 15620656792
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-normal text-gray-400 w-16">WhatsApp:</span>
                <a 
                  href="https://wa.me/8615620656792" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  15620656792
                </a>
              </p>
            </div>
          </div>

          <div className="text-xs text-gray-400 font-light tracking-widest max-w-xs leading-relaxed">
            <p>© {new Date().getFullYear()} {t.title}. All Rights Reserved.</p>
            <p className="mt-4 italic">“自然、简约、不矫揉造作。”</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
