export const fmtMoney = (n: number, c: 'USD' | 'PKR' | 'EUR' = 'USD') =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: c, maximumFractionDigits: 2 }).format(n);

export const fmtNum = (n: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n);

export const fmtTime = (iso: string | Date) =>
    new Date(iso).toLocaleString([], { hour: '2-digit', minute: '2-digit' });