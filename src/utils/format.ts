export const formatPrice = (value: number) => `${new Intl.NumberFormat('fa-IR').format(value)} تومان`
export const formatNumber = (value: number) => new Intl.NumberFormat('fa-IR').format(value)
