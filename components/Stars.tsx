// components/StarRating.tsx
"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
}

export function StarRating({
  value = 0,
  onChange,
  size = 20,
  readOnly = false,
  className = "",
}: StarRatingProps) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = (hover ?? value) >= i;
        console.log(filled);
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(i)}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(null)}
            className={`transition-transform ${
              readOnly ? "cursor-default" : "hover:scale-110"
            }`}
          >
            <Star
              size={size}
              fill={filled ? "#facc15" : "#d1d5db"} // amarelo vs cinza
              stroke="none" // sem bordas
            />
          </button>
        );
      })}
    </div>
  );
}
