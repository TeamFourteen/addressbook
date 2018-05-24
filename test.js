const imported_function = require("./myContacts/private/validation.js");

//test("testing my own phone number (2048692788), which should be good ", () => {
//    expect(imported_function.validate_phone(2048692788)).toBeTruthy(); 
//});
//
//test("testing to see if length of numbers is 10 digits (234987912691802407)", () => {
//    expect(imported_function.validate_phone(234987912691802407)).toBe(false);
//});
//
//test("testing to see if the number is empty", () => {
//    expect(imported_function.validate_phone("")).toBe(false);
//});
//
//test("testing to see if length of numbers is 10 digits (43257)", () => {
//    expect(imported_function.validate_phone(43257)).toBe(false);
//});
//
//test("testing to see if all characters in numbers (27werg87954)", () => {
//    expect(imported_function.validate_phone("27werg87954")).toBe(false);
//});
    
obj1 = {phone: "4379324579", type: "work"}
obj2 = {type: "work"}
obj3 = {phone: 234758974}
obj4 = {type: "cell", phone: "wer7843579"}
obj5 = {type: "cell", phone: "2453425424354235243452352352"}
obj6 = {type: "cell", phone: "843579"}


test("testing to see if obj1 has Phone and Type attribute", () => {
    expect(imported_function.validate_obj(obj1)).toBe(true);
});

test("testing to see if obj2 has Phone and Type attribute", () => {
    expect(imported_function.validate_obj(obj2)).toBe(false);
});

test("testing to see if obj3 has Phone and Type attribute", () => {
    expect(imported_function.validate_obj(obj3)).toBe(false);
});

test("testing to see if obj4 if all characters in numbers", () => {
    expect(imported_function.validate_obj(obj4)).toBe(false);
});

test("testing to see if obj5 has numbers that too long", () => {
    expect(imported_function.validate_obj(obj5)).toBe(false);
});

test("testing to see if obj6 has numbers that too short", () => {
    expect(imported_function.validate_obj(obj6)).toBe(false);
});
