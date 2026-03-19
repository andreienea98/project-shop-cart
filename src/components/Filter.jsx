
export default function Filter({ products, selectedCat, setSelectedCat, isOpen }) {
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
    fixed top-0 left-0 h-full w-56 bg-white p-4 shadow-lg z-50
    transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    lg:static lg:translate-x-0 lg:h-auto lg:rounded-lg lg:shadow-md
  `}>
      <h3 className="font-semibold text-xl mb-2">Filter by</h3>
      <h4 className="font-semibold text-md mb-2">Category</h4>
      {categories.map(cat => (
        <div key={cat} className="flex items-center gap-2 mb-2">
            <input
              onChange={() => handleChange(cat)}
              checked={selectedCat.includes(cat)}
              type="checkbox"
              name="cat"
              id={cat}
            />
          <label htmlFor={cat}>
            {cat}
          </label>
        </div>
      ))}
    </div>
  )
}
