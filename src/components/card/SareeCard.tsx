import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

const SareeCard = ({ saree }: any) => {
  const imageUrl = saree?.images?.[0]?.url;

  const discountPercent =
    saree.discount && saree.price
      ? Math.round((saree.discount / saree.price) * 100)
      : 0;

  const finalPrice = saree.price - (saree.discount || 0);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* IMAGE */}
      <Link href={`/shop/${saree.id}`}>
        <div className="relative h-80 w-full overflow-hidden bg-gray-50">
          <img
            src={imageUrl}
            alt={saree.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

          {/* DISCOUNT BADGE */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow">
              -{discountPercent}%
            </div>
          )}

          {/* PRICE BADGE */}
          <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
            ৳ {finalPrice.toLocaleString()}
          </div>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5 text-center">
        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-black transition">
          {saree.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {saree.category === "HALF_SILK"
            ? "Elegant Half Silk Collection"
            : "Pure Cotton Comfort Wear"}
        </p>

        {/* PRICE INFO */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-black">
            ৳ {finalPrice.toLocaleString()}
          </span>

          {saree.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ৳ {saree.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* BUTTON */}
        <Link
          href={`/shop/${saree.id}`}
          className="mt-4 inline-block px-5 py-2 rounded-full border border-gray-300 text-sm hover:bg-black hover:text-white transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SareeCard;
