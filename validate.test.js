const validate = require("./Profile with HBS/private/validate.js");

test("not null", () => {
    expect(validate.validatePhone('adfas')).toBeFalsy();
});

test("all numbers", () => {
    expect(validate.validatePhone('1234567890')).toBeTruthy();
});

test("phone length is 10 digits", () => {
    expect(validate.validatePhone('1234567890')).toBeTruthy();
});

test("address is not null", () => {
    expect(validate.validateAddress('1st street')).toBeTruthy();
});

test("bio is not null", () => {
    expect(validate.validateBio('this is my bio')).toBeTruthy();
});


