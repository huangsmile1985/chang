import React, { useState, useMemo } from 'react';
import { Language } from './types';
import { TRANSLATIONS, MOCK_CARPETS } from './constants';

const ITEMS_PER_PAGE = 8; // 增加每页数量，更像电商布局

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- 新增：多维筛选状态 ---
  const [activeCategory, setActiveCategory] = useState('all'); // 地毯 vs 地垫
  const [activeScenario, setActiveScenario] = useState('all'); // 客厅/卧室/玄关
  const [activeMaterial, setActiveMaterial] = useState('all'); // 材质

  const t = TRANSLATIONS[lang];

  // --- 核心逻辑：交叉筛选 ---
  const filteredCarpets = useMemo(() => {
    return MOCK_CARPETS.filter(carpet => {
      // 注意：这里假设你的 MOCK_CARPETS 数据中已经包含 category, scenario, materialKey 字段
      const matchCategory = activeCategory === 'all' || carpet.category === activeCategory;
      const matchScenario = activeScenario === 'all' || carpet.scenario === activeScenario;
      const matchMaterial = activeMaterial === 'all' || carpet.materialKey === activeMaterial;
      return matchCategory && matchScenario && matchMaterial;
    });
  }, [activeCategory, activeScenario, activeMaterial]);

  const totalPages = Math.ceil(filteredCarpets.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCarpets.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredCarpets]);

  // 切换筛选时重置页码
  const handleFilterChange = (type: 'cat' | 'scen' | 'mat', value: string) => {
    if (type === 'cat') setActiveCategory(value);
    if (type === 'scen') setActiveScenario(value);
    if (type === 'mat') setActiveMaterial(value);
    setCurrentPage(1);
  };

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
    <div className="min-h-screen flex flex-col bg-white text-[#1a1a1a]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-8 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter muji-font-serif uppercase italic">
              Premium Rugs
            </h1>
          </div>
          <button 
            onClick={toggleLanguage}
            className="px-6 py-2 border border-black text-[10px] font-bold tracking-widest hover:bg-black hover:text-white transition-all uppercase"
          >
            {lang === 'zh' ? 'ENGLISH' : '中文'}
          </button>
        </div>
      </header>

      {/* --- 新增：Revival 风格筛选工具栏 --- */}
      <section className="bg-white border-b border-gray-100 py-4 px-6 sticky top-[97px] z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-x-10 gap-y-4 items-center text-[11px] font-medium tracking-widest uppercase text-gray-500">
          
          {/* 产品类型 */}
          <div className="flex gap-4 items-center">
            <span className="text-black font-bold">类型:</span>
            {['all', '地毯', '地垫'].map(cat => (
              <button 
                key={cat}
                onClick={() => handleFilterChange('cat', cat)}
                className={`${activeCategory === cat ? 'text-black border-b border-black' : 'hover:text-black'} pb-1 transition-all`}
              >
                {cat === 'all' ? '全部' : cat}
              </button>
            ))}
          </div>

          {/* 场景 */}
          <div className="flex gap-4 items-center border-l pl-10 border-gray-200">
            <span className="text-black font-bold">场景:</span>
            {['all', '客厅', '卧室', '玄关'].map(scen => (
              <button 
                key={scen}
                onClick={() => handleFilterChange('scen', scen)}
                className={`${activeScenario === scen ? 'text-black border-b border-black' : 'hover:text-black'} pb-1 transition-all`}
              >
                {scen === 'all' ? '全部' : scen}
              </button>
            ))}
          </div>

          {/* 材质 */}
          <div className="flex gap-4 items-center border-l pl-10 border-gray-200">
            <span className="text-black font-bold">材质:</span>
            <select 
              className="bg-transparent focus:outline-none cursor-pointer text-black"
              onChange={(e) => handleFilterChange('mat', e.target.value)}
            >
              <option value="all">所有材质</option>
              <option value="wool">羊毛</option>
              <option value="jute">黄麻</option>
              <option value="cotton">纯棉</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {currentItems.map((carpet) => (
            <div key={carpet.id} className="group flex flex-col cursor-pointer">
              <div className="overflow-hidden bg-[#f5f5f5] aspect-[3/4] relative">
                <img 
                  src={carpet.imageUrl} 
                  alt={carpet.name[lang]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* 悬停快速查看效果 */}
                <div className="absolute inset-x-0 bottom-0 bg-white/90 py-3 text-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold tracking-widest uppercase">
                  快速查看 / Quick View
                </div>
              </div>
              <div className="py-4 space-y-1">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                  {carpet.material[lang]} • {activeScenario !== 'all' ? activeScenario : '精品推荐'}
                </p>
                <h3 className="text-xs font-bold text-[#1a1a1a] tracking-tight uppercase">
                  {carpet.name[lang]}
                </h3>
                <p className="text-sm font-medium text-[#1a1a1a] mt-2">
                  <span className="text-xs mr-0.5">{t.priceCurrency}</span>
                  {carpet.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 结果为空时的显示 */}
        {filteredCarpets.length === 0 && (
          <div className="text-center py-40">
            <p className="font-serif italic text-gray-400">没有找到匹配的组合，请尝试调整筛选条件。</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-8 border-t border-gray-100 pt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`text-[10px] font-bold tracking-widest uppercase ${
                currentPage === 1 ? 'text-gray-200' : 'text-black hover:underline'
              }`}
            >
              PREV
            </button>
            <span className="text-[10px] font-medium tracking-widest">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`text-[10px] font-bold tracking-widest uppercase ${
                currentPage === totalPages ? 'text-gray-200' : 'text-black hover:underline'
              }`}
            >
              NEXT
            </button>
          </div>
        )}
      </main>

      {/* Footer - 保持您要求的联系信息不变 */}
      <footer className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase opacity-50">
              {t.contactTitle}
            </h4>
            <div className="flex flex-col gap-4 text-sm font-light">
              <p className="flex flex-col">
                <span className="text-[10px] uppercase opacity-40 mb-1">Email</span>
                <a href="mailto:huangsmile1985@gmail.com" className="hover:text-gray-300 transition-colors underline underline-offset-4">
                  huangsmile1985@gmail.com
                </a>
              </p>
              <p className="flex flex-col">
                <span className="text-[10px] uppercase opacity-40 mb-1">Phone</span>
                <a href="tel:+8615620656792" className="hover:text-gray-800 transition-colors underline underline-offset-4">
                  +86 15620656792
                </a>
              </p>
              <p className="flex flex-col">
                <span className="text-[10px] uppercase opacity-40 mb-1">WhatsApp</span>
                <a 
                  href="https://wa.me/8615620656792" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-400 hover:text-green-300 font-medium underline underline-offset-4"
                >
                  15620656792
                </a>
              </p>
            </div>
          </div>

          <div className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase max-w-xs leading-loose">
            <p>© {new Date().getFullYear()} {t.title}. All Rights Reserved.</p>
            <p className="mt-6 italic opacity-30">“自然、简约、不矫揉造作。”</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
