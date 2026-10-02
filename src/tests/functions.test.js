const { sumArray, countWords, findMax, isDivisible } = require("../functions");

describe("sumArray", () => {
    it("should sum an array of positive numbers", () => {
        expect(sumArray([1, 2, 3, 4])).toBe(10);
    });

    it("should sum an array of negative numbers", () => {
        expect(sumArray([-1, -2, -3])).toBe(-6);
    });

    it("should return 0 for an empty array", () => {
        expect(sumArray([])).toBe(0);
    });

    it("should sum an array that includes 0", () => {
        expect(sumArray([0, 5, 10])).toBe(15);
    });
});

describe("countWords", () => {
    it("should count words in a normal sentence", () => {
        expect(countWords("Hola mundo esto es una prueba")).toBe(6);
    });

    it("should count words with leading and trailing spaces", () => {
        expect(countWords("   Hola mundo   ")).toBe(2);
    });

    it("should return 0 for an empty string", () => {
        expect(countWords("")).toBe(0);
    });

    it("should count words with consecutive spaces between them", () => {
        expect(countWords("Hola    mundo     prueba")).toBe(3);
    });
});

describe("findMax", () => {
    it("should find the max in an array of positive numbers", () => {
        expect(findMax([5, 2, 9, 3])).toBe(9);
    });

    it("should find the max in an array of negative numbers", () => {
        expect(findMax([-5, -2, -9, -3])).toBe(-2);
    });

    it("should return null for an empty array", () => {
        expect(findMax([])).toBeNull();
    });

    it("should return the same number when all numbers are equal", () => {
        expect(findMax([4, 4, 4, 4])).toBe(4);
    });
});

describe("isDivisible", () => {
    it("should return true for divisible numbers", () => {
        expect(isDivisible(10, 2)).toBe(true);
    });

    it("should return false for non-divisible numbers", () => {
        expect(isDivisible(10, 3)).toBe(false);
    });

    it("should return an error message when divisor is 0", () => {
        expect(isDivisible(10, 0)).toBe("No se puede dividir entre cero");
    });

    it("should work correctly with negative numbers", () => {
        expect(isDivisible(-10, 2)).toBe(true);
        expect(isDivisible(-10, 3)).toBe(false);
    });
});
