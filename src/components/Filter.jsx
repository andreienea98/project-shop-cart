export default function Filter({ products, selectedCat, setSelectedCat, isMobileInline }) {
  const categories = [...new Set(products.map(prod => prod.category))]

  function handleChange(category) {
    setSelectedCat(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category],
    )
  }

  return (
    <div className={`
      bg-white p-5 rounded-2xl border border-slate-200 shadow-sm
      ${isMobileInline ? "w-full" : "lg:w-64 lg:border-slate-100"}
    `}>
      <div>
        <h4 className="hidden lg:block font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
          Categories
        </h4>
        
        
        <div className="flex flex-col space-y-1 lg:space-y-2.5">
          {categories.map(cat => {
            const isChecked = selectedCat.includes(cat)
            return (
              <label 
                key={cat} 
                className="flex items-center gap-3 group cursor-pointer text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors capitalize p-2.5 lg:p-0 rounded-xl hover:bg-slate-50 lg:hover:bg-transparent"
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 appearance-none rounded-md border border-slate-300 bg-white checked:bg-slate-900 checked:border-slate-900 transition-all cursor-pointer focus:ring-2 focus:ring-slate-200"
                    onChange={() => handleChange(cat)}
                    checked={isChecked}
                    id={cat}
                  />
                  <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="select-none text-sm">{cat}</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}