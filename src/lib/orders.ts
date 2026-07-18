export const FREE_SHIPPING_THRESHOLD = 75;
export const FLAT_SHIPPING_RATE = 8;

export function roundCurrency(amount: number) {
  return Math.round(amount * 100) / 100;
}

export function calculateShipping(subtotal: number) {
  if (subtotal === 0 || subtotal > FREE_SHIPPING_THRESHOLD) return 0;
  return FLAT_SHIPPING_RATE;
}

export function calculateOrderTotal(subtotal: number) {
  return roundCurrency(subtotal + calculateShipping(subtotal));
}
