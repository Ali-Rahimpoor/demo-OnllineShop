export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fa-IR', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(price) + ' ریال';
};