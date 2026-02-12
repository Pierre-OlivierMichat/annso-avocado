import Image from "next/image";

export default function HeroGrid() {
  return (
    <section className="hero-grid">
      <div className="hero-grid__layer">
        <div className="hero-grid__cell">
          <Image
            src="/images/man.png"
            alt="Men's fragrance"
            fill
            sizes="50vw"
            priority
            quality={100}
            unoptimized
            className="hero-grid__image"
          />
        </div>
        <div className="hero-grid__cell">
          <Image
            src="/images/woman.png"
            alt="Women's fragrance"
            fill
            sizes="50vw"
            priority
            quality={100}
            unoptimized
            className="hero-grid__image"
          />
        </div>
      </div>
      <div className="hero-grid__overlay" />
    </section>
  );
}
