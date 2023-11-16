const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2});
const NUMBER_FORMATTER = new Intl.NumberFormat(undefined, {maximumFractionDigits: 2});
export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
}

export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number);
}