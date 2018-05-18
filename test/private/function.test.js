const functions = require('./function')

test('Event name should not be null',() =>{
    expect(functions.eventinfo()).not.toEqual({
        eventname:'',
    });
});

test('Start time should not be null',() =>{
    expect(functions.eventtime()).not.toEqual({
        fromtime:'',
    });
});


test('End time should not be null',() =>{
    expect(functions.endtime()).not.toEqual({
        etime:'',
    });
});

test('Address should not be null',() =>{
    expect(functions.addre()).not.toEqual({
        location:'',
    });
});



