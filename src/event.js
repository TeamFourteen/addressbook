var evname = document.getElementById('evname'),
    submit = document.getElementById('submit'),
    startdate = document.getElementById('startdate'),
    starttime = document.getElementById('starttime'),
    address = document.getElementById('address'),
    info = document.getElementById('info'),
    invite = document.getElementById('invite'),
    selectmem = document.getElementById('selectmem'),
    selectpeople = [],
    leftbox = document.getElementById('left_selection');

// function createinfo(ev) {
//     var newd = document.createElement('div'),
//         fromtime = '',
//         endti = '',
//         location = '';

//     for (i = 0; i < ev.length; i++) {
//         evename = ev[i].event;
//         fromtime = ev[i].fromdate;
//         starthour = ev[i].fromtime;
//         location = ev[i].address;
//         invitemember = ev[i].invitemem;
//     }
// };


selectmem.addEventListener("click", function() {
    selectpeople = [];
    document.getElementById("member").style.display = "block";
    document.getElementById("member").innerHTML = ''
    document.getElementById("submitInvite").style.display = "block";
    fetch('/event_selectpeople', {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: "invite people"
        })
    }).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);

        for (var num = 0; num < json.length; num++) {
            ndiv = document.createElement('button');
            ndiv.id = json[num].userId;
            ndiv.className = "newdivs";
            ndiv.innerHTML = json[num].lName + " " + json[num].fName;

            document.getElementById("member").appendChild(ndiv);

            document.getElementById(ndiv.id).addEventListener("click", function() {
                if (document.getElementById(this.id).className == "newdivs") {
                    selectpeople.push(this.id);
                    document.getElementById(this.id).className = "newdivs_selected"
                    console.log(selectpeople)
                } else if (document.getElementById(this.id).className == "newdivs_selected") {
                    selectpeople.splice(selectpeople.indexOf(this.id), 1);
                    document.getElementById(this.id).className = "newdivs"
                    console.log(selectpeople)
                }

            });

        };


    });
});

document.getElementById('submitInvite').addEventListener("click", function() {
    document.getElementById("member").style.display = "none";
    document.getElementById("submitInvite").style.display = "none";
});

submit.addEventListener("click", function() {
    check();
    var objects = {
        event_name: evname.value,
        from_time: startdate.value + " " + starttime.value,
        location: address.value,
        event_guests: selectpeople
    };

    fetch('/event_addevent', {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            objects
        )
    }).then((response) => {
        return response.json();
    }).then((json) => {
        if (json.status == 'OK') {
            window.location.assign(json.url)
        } else if (json.status == 'NOK') {
            alert('Invalid Event Input')
        }
    })
});



function check() {
    if (evname.value == '') {
        alert('You should enter a event name');
        throw new Error("Do not enter a event name");
    } else if (starttime.value == '') {
        alert('You should enter the start time');
        throw new Error("Do not enter the start time");
    } else if (startdate.value == '') {
        alert('You should enter the details of start time');
        throw new Error("Do not enter the start date");
    }
};