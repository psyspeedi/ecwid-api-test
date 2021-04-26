export default function (value: number): string {
  return new Intl.NumberFormat('ru', {
    style: 'currency',
    maximumFractionDigits: 2,
    currency: 'RUB'
  }).format(value)
}
