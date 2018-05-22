const validatePhone = require("./validate");

test("not null", () => {
    expect(validatePhone()).toBeTruthy();
});

test("all numbers", () => {
    expect(validatePhone('afafsfs')).toBeTruthy();
});

test("phone length is 10 digits", () => {
    expect(validatePhone('12345678')).toBeTruthy();
});
