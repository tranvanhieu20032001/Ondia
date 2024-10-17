export function removeAccents(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

export function formatCash(numb) {
    const str = numb.toString();
    return (
        str
            .split('')
            .reverse()
            .reduce((prev, next, index) => {
                return (index % 3 ? next : next + '.') + prev;
            }) + '₫'
    );
}

export function lowercaseFirstLetter(inputString) {
    return inputString.charAt(0).toLowerCase() + inputString.slice(1);
}
