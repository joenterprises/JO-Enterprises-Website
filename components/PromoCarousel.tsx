"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const promos = [
  "/images/promos/calendar-2027.png",
  "/images/promos/combo-offers.png",
  "/images/promos/eco-paper-bags.png",
  "/images/promos/seasonal-promos.png",
];

export default function PromoCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % promos.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="promoCarousel">
      <div className="promoViewport">
        {promos.map((image, index) => (
          <div
            key={image}
            className={`promoSlide ${index === active ? "isActive" : ""}`}
          >
            <Image
              src={image}
              alt="JO Enterprises Promotion"
              fill
              priority={index === 0}
              sizes="(max-width: 850px) 92vw, 52vw"
            />
          </div>
        ))}
      </div>

      <div className="promoDots">
        {promos.map((_, index) => (
          <button
            key={index}
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}