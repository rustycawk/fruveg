export function formatNumberWithSpaces(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatDate(isoDateString:string) {
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}.${minutes}`;
}