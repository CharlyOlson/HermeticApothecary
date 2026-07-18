import { useId } from "react";

interface StarRatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ value, size = 16, showValue = false }: StarRatingProps) {
  const id = useId();
  const formattedValue = Number.isInteger(value) ? value.toString() : value.toFixed(1);
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = value >= i + 1;
    const half = !filled && value >= i + 0.5;
    return { filled, half };
  });
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`Rating: ${formattedValue} out of 5`}>
      {stars.map((s, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={s.filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={s.filled || s.half ? "text-gold" : "text-ash/40"} aria-hidden="true">
          <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
          {s.half && (
            <>
              <defs>
                <clipPath id={`${id}-half-${i}`}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
              <path
                d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z"
                fill="currentColor"
                stroke="none"
                clipPath={`url(#${id}-half-${i})`}
              />
            </>
          )}
        </svg>
      ))}
      {showValue && <span className="ml-1 text-xs text-ash">{value.toFixed(1)}</span>}
    </span>
  );
}
