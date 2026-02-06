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
    <div className="filter-section">
      <h4>Category</h4>
      {categories.map(cat => (
        <div key={cat}>
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
