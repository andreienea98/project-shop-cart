import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

export default function StarRating({ rate, count }) {
  const rounded = Math.round(rate * 2) / 2
  const fullStars = Math.floor(rounded)
  const halfStar = rounded % 1 !== 0

  return (
    <div className="flex items-center  gap-1 text-yellow-400 ">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) return <FaStar key={index} />
        if (index === fullStars && halfStar)
          return <FaStarHalfAlt key={index} />
        return <FaRegStar key={index} />
      })}
    </div>
  )
}