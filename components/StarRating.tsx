export function StarRating({
  value,
  size = 16,
  showValue = false,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
}) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f-${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#c9a24b" aria-hidden>
          <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
        </svg>
      ))}
      {half && (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <defs>
            <clipPath id="half-clip">
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" fill="#3a3147" />
          <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" fill="#c9a24b" clipPath="url(#half-clip)" />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e-${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#3a3147" aria-hidden>
          <path d="M12 2l2.4 6.4L21 9l-5 4.2L17.6 20 12 16.4 6.4 20 8 13.2 3 9l6.6-.6z" />
        </svg>
      ))}
      {showValue && (
        <span className="ml-0.5 text-xs text-ash">{value.toFixed(1)}</span>
      )}
    </span>
  );
}
