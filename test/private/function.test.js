const functions = require('./function')

test('Event name should not be empty',() =>{
    expect(functions.eventinfo()).not.toEqual({
        eventname:'',
    });
});

test('Start time should not be empty',() =>{
    expect(functions.eventtime()).not.toEqual({
        fromtime:'',
    });
});


test('End time should not be empty',() =>{
    expect(functions.endtime()).not.toEqual({
        etime:'',
    });
});

test('Address should not be empty',() =>{
    expect(functions.addre()).not.toEqual({
        location:'',
    });
});



