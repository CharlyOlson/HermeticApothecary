interface StarRatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
}

export function StarRating({ value, size = 16, showValue = false }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = value >= i + 1;
    const half = !filled && value >= i + 0.5;
    return { filled, half };
  });
  return (
    <span className="flex items-center gap-0.5">
      {stars.map((s, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={s.filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={s.filled || s.half ? "text-gold" : "text-ash/40"}>
          <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
        </svg>
      ))}
      {showValue && <span className="ml-1 text-xs text-ash">{value.toFixed(1)}</span>}
    </span>
  );
}
