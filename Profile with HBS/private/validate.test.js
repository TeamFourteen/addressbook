const validatePhone = require("./validate");

test("not null", () => {
    expect(validatePhone('adfas')).toBeFalsy();
});

test("all numbers", () => {
    expect(validatePhone('1234567890')).toBeTruthy();
});

test("phone length is 10 digits", () => {
    expect(validatePhone('1234567890')).toBeTruthy();
});


