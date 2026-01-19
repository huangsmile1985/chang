import React, { useState, useMemo } from 'react';
import { Language } from './types';
import { TRANSLATIONS, MOCK_CARPETS } from './constants';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [filters, setFilters] = useState({ category: 'all', scenario: 'all', material: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const t = TRANSLATIONS[lang];

  const filteredItems = useMemo(() => {
    return MOCK_CARPETS.filter(item => (
      (filters.category === 'all' || item.category === filters.category) &&
      (filters.scenario === 'all' || item.scenario === filters.scenario) &&
      (filters.material === 'all' || item.materialKey === filters.material)
    ));
  }, [filters]);

  const currentItems = filteredItems.slice((currentPage - 1) * 8, currentPage * 8);

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">
      {/* 分类筛选条 */}
      <nav className="border-b border-gray-100 bg-[#f9f9f9] py-4 px-10 sticky top-0 z-50 flex gap-10 text-[10px] font-bold uppercase tracking-widest overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          <span className="text-black">{t.filterCategory}:</span>
          {['all', 'carpet', 'mat'].map(v => (
            <button key={v} onClick={() => {setFilters({...filters, category: v}); setCurrentPage(1)}} className={filters.category === v ? "underline underline-offset-4 text-black" : "text-gray-400"}>{t[v]}</button>
          ))}
        </div>
        <div className="flex gap-4 border-l pl-10 border-gray-200">
          <span className="text-black">{t.filterScenario}:</span>
          {['all', 'livingRoom', 'bedroom', 'entryway'].map(v => (
            <button key={v} onClick={() => {setFilters({...filters, scenario: v}); setCurrentPage(1)}} className={filters.scenario === v ? "underline underline-offset-4 text-black" : "text-gray-400"}>{t[v]}</button>
          ))}
        </div>
      </nav>

      {/* 商品网格 */}
      <main className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {currentItems.map(item => (
          <div key={item.id} className="group cursor-pointer text-center">
            <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
              <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">{item.material[lang]} • {t[item.scenario]}</p>
            <h3 className="text-xs font-bold uppercase">{item.name[lang]}</h3>
            <p className="text-sm mt-2 font-medium italic">¥{item.price}</p>
          </div>
        ))}
      </main>

      {/* 页脚联系信息 */}
      <footer className="bg-[#1a1a1a] text-white py-20 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{t.contactTitle}</h4>
            <div className="text-sm font-light space-y-4">
              <p>Email: <a href="mailto:huangsmile1985@gmail.com" className="underline">huangsmile1985@gmail.com</a></p>
              <p>Phone: <a href="tel:+8615620656792" className="underline">+86 15620656792</a></p>
              <p>WhatsApp: <a href="https://wa.me/8615620656792" target="_blank" className="text-green-400 underline font-medium">15620656792</a></p>
            </div>
          </div>
          <p className="text-[10px] text-gray-600 self-end font-light tracking-widest">© 2026 Premium Carpet Boutique.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
