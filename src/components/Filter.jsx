export default function Filter({ products, selectedCat, setSelectedCat }) {
  const categories = [...new Set(products.map(prod => prod.category))]

  function handleChange(category) {
    setSelectedCat(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category],
    )
  }

  return (
    <div className="w-full lg:w-56 lg:h-62 bg-white p-4 rounded-lg shadow-md shrink-0">
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
