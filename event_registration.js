/*
		Your Name: Jennifer Brady
		Last Modified Date: 12/9/2019
		File: event_registration.js
		File Description: Javascript for the Event Registration
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/
var error;

//Timer Countdown

/**Variables**/
var timeLeft;
var mins;
var sec;
var r;

//check current date
var start = Date.now();
var myTime = setInterval(function () {
    //subtract time from 10 minutes continuously
    timeLeft = 600000 - (Date.now() - start);

    //check whether time left is great than 0 or not
    if (timeLeft <= 0) {
        clearInterval(myTime);
        alert("You have exceeded 10 minutes. \n Please try again if you need tickets.");
        //redirect to the main page again
        window.location.href = "event_registration.html";
    }
    mins = timeLeft / 60000;
    r = mins % 1;
    sec = Math.floor(r * 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    mins = Math.floor(mins);
    document.getElementById("timer").innerHTML = mins + ':' + sec;
    timeLeft = timeLeft - 1000;


}, 1000);



/*Calculate total ticket costs */

var totalCost;

function calculateTotal() {

    //parse numbers entered
    var x = parseInt(document.forms["contact"]["numTickets"].value, 10);
    //console.log('x is =>', x);
    //var error;

    /*Verify only numbers are entered*/
    if (isNaN(x)) {
        error = true;
        document.getElementById("contactInformation").style.display = 'none';
        document.getElementById("msgname").innerHTML = 'You must enter a number between ' + minTickets.toString() + ' and ' + maxTickets.toString() + ' please';

        errorColor('numTickets', error);
    }

    /*Check only 1-3 entered*/
    else {
        x = parseInt(x);

        if (x < minTickets || x > maxTickets) {
            error = true;
            document.getElementById("contactInformation").style.display = 'none';
            document.getElementById("msgname").innerHTML = 'You can only buy between ' + minTickets.toString() + ' and ' + maxTickets.toString() + ' tickets.';

            errorColor('numTickets', error);
        }


        /*If valid, display total*/
        else {
            error = false;

            //change color on error using errorColor function
            errorColor('numTickets', error);
            document.getElementById("msgname").innerHTML = '';
            document.getElementById("contactInformation").style.display = 'block';
            totalCost = (x * costPerTicket);
            //console.log(totalCost);
            //add total cost to Box with 2 decimals
            document.getElementById("totalCost").value = parseFloat(totalCost).toFixed(2);
        }

    }
}

/*Color change on error*/
function errorColor(String, error) {
    if (error == true) {
        document.getElementById(String).style.backgroundColor = 'red';
        error = false;
    }
    else {
        document.getElementById(String).style.backgroundColor = 'grey';
    }
}
/*
function completePurchase() {

    var name = document.getElementById("contact").name;
    var email = document.getElementById("contact").email;
       if (AllLetter(name) &&
        ValidateEmail(email)) {
            
        return true;
    }

    else {
       
        return false;

    }
}

//verify only alphabet is used
function AllLetter(name) {
    var letters = /^[A-Za-z\s]+$/;
    if (name.value.match(letters)) {
        return true;
    }
    else {
        alert('Please input alphabet characters only');
        return false;
    }
}


//validate email address
function ValidateEmail(email)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
if(email.value.match(mailformat))
{
return true;
}
else
{
alert("Please enter a valid email address!");
email.focus();
return false;
}
}*/

/*
(c) If no errors in the input were found, provide an alert to the user thanking them for their purchase with the total amount of the purchase, and stop the timer. Otherwise, allow the user to continue to make changes until they have provided valid information. 
*/
 
function completePurchase(){
var name = document.getElementById("contact").name;
    var email = document.getElementById("contact").email;
       if (AllLetter(name) &&
        ValidateEmail(email)) {
            
        return true;
    }
else {
    console.log("Correct");
    return true;
}


}

/*Perform validation to make sure the user entered in a value for both name and email.
Add an error message next to the input field when either a name or email has not been entered and change the background color of the input field to help alert the user.
*/

//check for a valid name entry

function AllLetter(name) {
    var letters = /^[A-Za-z]+$/;
    if (name.value.match(letters)) {
        error= false;
        errorColor('name', error);
        document.getElementById("msgname").innerHTML = '';
        return true;
    }
    else {
        error= true;
        errorColor('name', error);
        document.getElementById("msgname").innerHTML = "Please make a valid entry.";
        return false;
    }
}

//check for valid email address
function ValidateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat)) {
        error = false;
        errorColor('email', error);
        document.getElementById("msgemail").innerHTML = '';
        return true;
    }
    else {
        error = true;
        errorColor('email', error);
        document.getElementById("msgemail").innerHTML = "Please make a valid entry.";
        return false;
    }
}