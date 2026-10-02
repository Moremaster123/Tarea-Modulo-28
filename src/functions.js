const sumArray = (numbers) => {
    return numbers.reduce((total, num) => total + num, 0);
};

const countWords = (text) => {
    const trimmed = text.trim();
    if (trimmed === '') {
        return 0;
    }
    return trimmed.split(/\s+/).length;
};

const findMax = (numbers) => {
    if (numbers.length === 0) {
        return null;
    }
    return Math.max(...numbers);
};

const isDivisible = (num, divisor) => {
    if (divisor === 0) {
        return "No se puede dividir entre cero";
    }
    return num % divisor === 0;
};

module.exports = { sumArray, countWords, findMax, isDivisible };