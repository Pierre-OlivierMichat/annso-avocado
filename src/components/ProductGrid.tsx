"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Product = {
  name: string;
  price: string;
  image: string;
  alt: string;
  badge?: "Nouveau" | "Best-seller";
  swatches: string[];
};

const products: Product[] = [
  {
    name: "Legging Taille Haute Sculpt",
    price: "89 €",
    image: "/images/woman.png",
    alt: "Femme portant le legging taille haute Sculpt",
    badge: "Nouveau",
    swatches: ["#313131", "#53783b", "#b3c656"],
  },
  {
    name: "T-shirt Performance",
    price: "59 €",
    image: "/images/man.png",
    alt: "Homme portant le t-shirt performance",
    badge: "Best-seller",
    swatches: ["#313131", "#444b3e"],
  },
  {
    name: "Brassière Sans Coutures Flex",
    price: "65 €",
    image: "/images/women.png",
    alt: "Femme portant la brassière sans coutures Flex",
    swatches: ["#7b964a", "#313131", "#f9f7f2"],
  },
  {
    name: "Short de Course Endurance",
    price: "69 €",
    image: "/images/men.png",
    alt: "Homme portant le short de course Endurance",
    badge: "Nouveau",
    swatches: ["#444b3e", "#53783b"],
  },
  {
    name: "Débardeur Côtelé Flow",
    price: "49 €",
    image: "/images/woman.png",
    alt: "Femme portant le débardeur côtelé Flow",
    swatches: ["#f9f7f2", "#b3c656", "#313131"],
  },
  {
    name: "Collant Compression Power",
    price: "95 €",
    image: "/images/man.png",
    alt: "Homme portant le collant compression Power",
    badge: "Best-seller",
    swatches: ["#313131", "#444b3e"],
  },
  {
    name: "Legging Croisé Balance",
    price: "85 €",
    image: "/images/women.png",
    alt: "Femme portant le legging croisé Balance",
    swatches: ["#53783b", "#313131", "#7b964a"],
  },
  {
    name: "Jogger Tissé Stride",
    price: "79 €",
    image: "/images/men.png",
    alt: "Homme portant le jogger tissé Stride",
    swatches: ["#444b3e", "#f9f7f2"],
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      className="product-card will-animate"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <motion.div
        className="product-card__image-wrapper"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.02 },
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {product.badge && (
          <span
            className={`product-card__badge${
              product.badge === "Best-seller"
                ? " product-card__badge--bestseller"
                : ""
            }`}
          >
            {product.badge}
          </span>
        )}
        <motion.div
          style={{ position: "relative", width: "100%", height: "100%" }}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.06 },
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            quality={90}
            unoptimized
            className="product-card__image"
          />
        </motion.div>
      </motion.div>
      <div className="product-card__info">
        <motion.p
          className="product-card__name"
          variants={{
            rest: { color: "#313131" },
            hover: { color: "#53783b" },
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {product.name}
        </motion.p>
        <p className="product-card__price">{product.price}</p>
        <div className="product-card__swatches">
          {product.swatches.map((color, j) => (
            <span
              key={j}
              className="product-card__swatch"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductGrid() {
  return (
    <section className="product-grid">
      <div className="product-grid__header">
        <h2 className="product-grid__title will-animate">La Collection</h2>
        <p className="product-grid__subtitle will-animate">
          Vêtements de performance conçus pour le mouvement, pensés pour le
          quotidien
        </p>
      </div>
      <div className="product-grid__items">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </section>
  );
}
