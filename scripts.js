//sets a cookie for a page based on what link is clicked
function setPatientIdCookie(id) {
    document.cookie = "patientId=" + id;
    window.location.href = "provider_singlePatientView.html";
}

function setCheckInCookie(id) {
    document.cookie = "patientId=" + id;
    return null;
}



function authenticateLogin(validate) {
    var providerUsername = "Username";
    var providerPassword = "password"; //Feel free to change username/password
    var patientUsername = "Username"; //for each user at will
    var patientPassword = "password";
    var username, password;
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    validate == 1 ? //provider login parsing code
        username == providerUsername && password == providerPassword ?
        window.location.href = "provider/provider_lander.html" :
        document.getElementById("authenticationErrors").innerHTML = "Credentials are incorrect." :

        validate == 2 ? //patient login parsing code
        username == patientUsername && password == patientPassword ?
        window.location.href = "provider/provider_lander.html" :
        document.getElementById("authenticationErrors").innerHTML = "Credentials are incorrect." :

        validate == 3 ? //admin login code
        window.location.href = "admin_index.html" :

        document.getElementById("authenticationErrors").innerHTML = "Invalid Authorization Code: " + validate;
}

//collects stored patient data files and converts it to html data displayed by the provider_database.html table
function displayPatientRecord() {
    var patient1 = ["John Doe", "Male", "46", "5'11&quot", "165"];
    var patient2 = []; //eventually replace with php script to get data from sql server
    var txt = "<tr>"
    var i;
    //patient arrays will be replaced by php database reading code to avoid manual entry
    for (i = 0; i < patient1.length; i++) {
        txt = txt + "<td>" + patient1[i] + " </td>"; //cycles trhough each array element and makes each a table cell
    }
    txt = txt + "</tr>"
    document.getElementById("patientDatabase").innerHTML = txt;
}

//function that writes a message based on the emergency question input
function emergencyButton(buttonNumber) {

    switch (buttonNumber) {

        case 'Yes':

            document.getElementById("emergency").innerHTML = "Please contact your local emergency " +
                "services if immediate medical attention is required.";
            var par = document.getElementById("emergency");
            var t = document.innerHTML("Please contact your local emergency services if immediate medical attention is required.");
            par.appendChild(t);
            var br = document.createElement('br');
            par.appendChild(br);
            break;

        case 'No':

            document.getElementById("emergency").innerHTML = "Please continue.";
            var par = document.getElementById("emergencyYes");
            var t = document.innerHTML("Please continue.");
            par.appendChild(t);
            var br = document.createElement('br');
            par.appendChild(br);
            break;

        default:

            return false;

    }
}


//function for adding words to a cell
// function cellChanger(wordsToAdd) {

//   var par = document.getElementById("testData");
//   var t = document.createTextNode(wordsToAdd);
//   par.appendChild(t);
//   var br = document.createElement('br');
//   par.appendChild(br);

// }

//function for retrieving a date from the date input and then adding it's value to a cell.

function dateRec() {

    var par = document.getElementById("testData");
    var dateControl = document.getElementById("calendarInput").value;
    var t = document.createTextNode(dateControl);
    par.appendChild(t);
    var br = document.createElement('br');
    par.appendChild(br);

}

//function for modifying an attribute of all elements in a class

// const indexElements = document.getElementsByClassName('random_test');

// Array.from(indexElements).forEach(function (singleElement) {

//     singleElement.style.transform = 'translateY(50%)';

//   });

//function for cycling to the next month

function nextMonth() {

    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;

    currentMonth = (currentMonth + 1) % 12;

    printCalendar(currentMonth, currentYear, appointmentsArray, userId);

}

//function for cycling to the previous month

function previousMonth() {

    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;

    currentMonth = (currentMonth === 0) ? 11 : (currentMonth - 1) % 12;

    printCalendar(currentMonth, currentYear, appointmentsArray, userId);

}

//function to remove a month from the page altogther

function removeTable() {

    var affTable = document.getElementById('calendars');

    var parentEl = affTable.parentElement;

    parentEl.removeChild(affTable);

}

function addAppData() {

}

//Global declarations for the printCalendar function

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let monthAndYear = document.getElementById("monthAndYear");



//Function that creates calendar

function printCalendar(month, year, ApptsArray, userId) {

    //Declarations of month data for later use

    let firstDay = (new Date(year, month)).getDay();

    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    var monthName = months[month];

    //creation of seperate array that stores included patient's ids in a numerically indexed array

    var stringArray = JSON.stringify(ApptsArray);
    var w = 0;
    var numberOfKeys = Object.keys(ApptsArray).length;
    var patientIdArray = new Array();

    for (var z = 1; z <= Object.keys(ApptsArray).length + 1; z++) {
        var searchPattern = `"${z}":`;
        if (stringArray.search(searchPattern) != -1) {
            patientIdArray[w] = z;
            w++;
        } else {
            continue;
        }
    }
    //var stringPatientId = JSON.stringify(patientIdArray);

    //Creation of the body, table, table body and top row for headers

    var body = document.getElementsByTagName('body')[0];

    var tbl = document.createElement('table');

    tbl.id = "calendars";

    var tbdy = document.createElement('tbody');

    var headerRow = document.createElement('tr');

    //Left button

    var theader = document.createElement('th');

    theader.classList = "calendarHeader";

    theader.id = "arrowLeftHeader";

    var btn1 = document.createElement('button');
    btn1.id = "arrowLeft";

    btn1.onclick = function() {

        removeTable();
        previousMonth();

    };

    var iElement = document.createElement('i');
    iElement.setAttribute('class', 'arrow left');

    btn1.appendChild(iElement);
    theader.appendChild(btn1);

    //Center header w/ month name

    var theader2 = document.createElement('th');

    theader2.classList = "calendarHeader";

    theader2.setAttribute('colspan', '5')

    theader2.appendChild(document.createTextNode(monthName));
    theader2.appendChild(document.createTextNode(` ${year}`));


    //Right button

    var theader3 = document.createElement('th');

    theader3.classList = "calendarHeader";

    theader3.id = "arrowRightHeader";

    var btn2 = document.createElement('button');
    btn2.id = "arrowRight";

    btn2.onclick = function() {

        removeTable();
        nextMonth();

    };

    var iElement2 = document.createElement('i');
    iElement2.setAttribute('class', 'arrow right');

    btn2.appendChild(iElement2);
    theader3.appendChild(btn2);

    //Appending all of the sub headers to the main header row

    headerRow.appendChild(theader);
    headerRow.appendChild(theader2);
    headerRow.appendChild(theader3);

    //Appending the main header row to the body of the table

    tbdy.appendChild(headerRow);

    // creating all cells

    let date = 1;

    for (let i = 0; i < 6; i++) {

        // creates a table row

        let row = document.createElement("tr");
        row.classList = "calendarRow";

        //creating individual cells, filing them up with data.

        for (let j = 0; j < 7; j++) {

            //Adds the blank spaces before the actual dates start appearing

            if (i === 0 && j < firstDay) {

                let cell = document.createElement("td");

                cell.classList = "calendarData";

                let cellText = document.createTextNode("");

                cell.appendChild(cellText);

                row.appendChild(cell);

            }

            //When the current date is greater than the days in the month the function stops
            else if (date > daysInMonth) {

                break;

            } else {

                let cell = document.createElement("td");

                cell.classList = "calendarData";

                var container = document.createElement("p");

                container.id = date;

                container.addEventListener('click', function() {
                    // alert(this.id);
                    document.cookie = "date=" + this.id;
                    magicDivision(this.id, ApptsArray);
                });


                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {

                    container.style.color = "magenta";

                }

                let dateText = document.createTextNode(date);

                container.appendChild(dateText);

                container.appendChild(document.createElement("br"));

                const apptInfo = document.createElement('span');

                apptInfo.classList = "smallFont";


                for (i = 0; i < patientIdArray.length; i++) {

                    if (userId == patientIdArray[i]) {

                        const value = ApptsArray[patientIdArray[i]];

                        if (!value) {
                            break;
                        }

                        for (let y = 0; y < value.length; y++)

                        {

                            let minute = value[y][0];
                            let hour = value[y][1];
                            let apptDay = value[y][2];
                            let apptMonth = value[y][3];
                            let apptYear = value[y][4];

                            if (date == apptDay && apptMonth == currentMonth + 1 && apptYear == currentYear) {

                                if (hour > 12) {

                                    hour = hour - 12;
                                    var oClock = "PM";

                                } else {
                                    var oClock = "AM";
                                }

                                apptTime = `Appt @ ${hour}:${minute} ${oClock}`;
                                apptInfo.appendChild(document.createTextNode(apptTime));
                                container.appendChild(apptInfo);
                                break;

                            }

                        }

                    } else {
                        continue;
                    }
                }

                let containerContents = container.innerHTML;

                // if (!(containerContents.length > 6)) {

                //     // cell.style.backgroundColor = "magenta";

                // }

                cell.appendChild(container);

                row.appendChild(cell);

                date++;

                //Adds the blank spaces after the dates to fill the calendar completely

                if (date > daysInMonth && j < 7) {

                    for (let z = 0; z < 6 - j; z++) {

                        let cell = document.createElement("td");

                        cell.classList = "calendarData";

                        let cellText = document.createTextNode("");

                        cell.appendChild(cellText);

                        row.appendChild(cell);

                    }

                }

            }

        }

        //Appending the rows into the calendar

        tbdy.appendChild(row);

    }

    //Appending the table body to the table and the table to the body

    tbl.appendChild(tbdy);

    body.appendChild(tbl);

}

let x = false;

function shiftNav() {

    if (!x) {

        const navDiv = document.getElementById('navDiv');
        const navBtn = document.getElementById('navBtn');
        navBtn.innerHTML = '<i class="fas fa-compress"></i>';
        navDiv.style.transition = "transform 0.5s ease-in-out"
        navDiv.style.transform = "translateY(-46px)";

        const footDiv = document.getElementById('footer');
        footDiv.style.transition = "transform 0.5s ease-in-out"
        footDiv.style.transform = "translateY(46px)";

        x = true;

    } else {

        const navDiv = document.getElementById('navDiv');
        const navBtn = document.getElementById('navBtn');
        navBtn.innerHTML = '<i class="fas fa-expand"></i>';
        navDiv.style.transform = "translateY(-0px)";

        const footDiv = document.getElementById('footer');
        footDiv.style.transform = "translateY(0px)";

        x = false;

    }

}

// function appleBottomJeans() {

//     const indexElements = document.getElementsByClassName('omega');



//     Array.from(indexElements).forEach(function(singleElement) {

//         singleElement.style.transition = `transform 1s ease-in-out`;
//         singleElement.style.transform = `translateY(25px)`;

//     });

// }

// let keysPressed = {};

// document.addEventListener('keydown', (event) => {

//     keysPressed[event.key] = true;

//     if (event.key == 'a') {
//         // var chungus = document.getElementById('testtest');
//         // chungus.id = 'testtest1';

//         function changeFontSize(fontvar) {
//             var div = document.getElementById("mega");
//             var currentFont = div.style.fontSize.replace("px", "");

//             // div.style.fontSize = parseInt(currentFont) + parseInt(fontvar) + "px";

//             currentFont = currentFont + fontvar;

//             div.style.fontSize = `${currentFont}px`
//         }

//         changeFontSize(2);
//     }
// });

function magicDivision(dayOfApp, ApptsArray) {

    var stringArray = JSON.stringify(ApptsArray);
    var w = 0;
    var numberOfKeys = Object.keys(ApptsArray).length;
    var patientIdArray = new Array();

    for (var z = 1; z <= Object.keys(ApptsArray).length + 1; z++) {
        var searchPattern = `"${z}":`;
        if (stringArray.search(searchPattern) != -1) {
            patientIdArray[w] = z;
            w++;
        } else {
            continue;
        }
    }

    var magArray = []

    for (i = 0; i < patientIdArray.length; i++) {

        if (userId == patientIdArray[i]) {

            const value = ApptsArray[patientIdArray[i]];

            if (!value) {
                break;
            }

            for (let y = 0; y < value.length; y++) {

                let minute = value[y][0];
                let hour = value[y][1];
                var apptDay = value[y][2];

                var firstChar = apptDay[0];

                if (firstChar == 0) {
                    apptDay = apptDay[1]
                }

                if (apptDay == dayOfApp) {

                    if (hour > 12) {

                        hour = hour - 12;

                        oClo = 'pm';

                    } else {
                        oClo = 'am';
                    }

                    var firstChar2 = hour[0]

                    if (firstChar2 == 0) {
                        hour = hour[1]
                    }

                    var magTime = `${hour}:${minute}${oClo}`;
                    magArray.push(magTime);
                    break;

                }

            }

        } else {
            continue;
        }
    }

    var div = document.getElementById('magiDiv');

    var magTable = document.createElement('table');

    magTable.id = "magTable";

    var magTableBody = document.createElement('tbody');

    for (let z = 7; z < 18; z += 0.5) {

        var magRow = document.createElement('tr');

        for (let o = 0; o < 3; o++) {

            if (o == 0) {

                var magData1 = document.createElement('td');

                var parpar1 = document.createElement('p');

                if (z > 12) {

                    var time = z - 12;

                    oClock = 'pm';

                } else if (z == 12) {

                    var time = z

                    oClock = 'pm';

                } else {

                    var time = z;

                    oClock = 'am';

                }

                if (time % 1 == 0) {

                    var acTime = `${time}:00${oClock}`;

                } else {

                    time = time - 0.5;

                    var acTime = `${time}:30${oClock}`;

                }

                if (acTime[0] == 0) {
                    acTime = `12:30pm`;
                }

                parpar1.appendChild(document.createTextNode(acTime));

                magData1.appendChild(parpar1);

                magRow.appendChild(magData1);

            } else if (o == 1) {

                var magData2 = document.createElement('td');

                var parpar2 = document.createElement('p');

                if (magArray == acTime) {

                    parpar2.classList = "apptCellRed";
                    availibility = 'Unavailible';

                } else {
                    parpar2.classList = "apptCellGreen";
                    availibility = 'Availible';
                }

                parpar2.appendChild(document.createTextNode(availibility));

                magData2.appendChild(parpar2);

                magRow.appendChild(magData2);

            }

        }

        magTableBody.appendChild(magRow);

        if (z == 17.5) {

            var magRow3 = document.createElement('tr');

            var magData3 = document.createElement('td');

            magData3.setAttribute('colspan', '2')

            magData3.id = "closeCell";

            var parpar3 = document.createElement('p');

            parpar3.appendChild(document.createTextNode('Close'));

            magData3.appendChild(parpar3);

            magRow3.appendChild(magData3);

            magTableBody.appendChild(magRow3);

        }

    }

    magTable.appendChild(magTableBody);

    div.appendChild(magTable);

}