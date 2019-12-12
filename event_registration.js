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
var costPerTicket = 5.0;
var ticketSurcharge = 0.5;

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
var myTime = setInterval(function() {
  //subtract time from 10 minutes continuously
  timeLeft = 600000 - (Date.now() - start);

  //check whether time left is great than 0 or not
  if (timeLeft <= 0) {
    clearInterval(myTime);
    alert(
      "You have exceeded 10 minutes. \n Please try again if you need tickets."
    );
    //redirect to the main page again
    window.location.href = "event_registration.html";
  }
  mins = timeLeft / 60000;
  r = mins % 1;
  sec = Math.floor(r * 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  mins = Math.floor(mins);
  document.getElementById("timer").innerHTML = mins + ":" + sec;
  timeLeft = timeLeft - 1000;
}, 1000);

/*Calculate total ticket costs */

var totalCost;

function calculateTotal() {
  //parse numbers entered
  var x = parseInt(document.forms["contact"]["numTickets"].value, 10);
  

  /*Verify only numbers are entered*/
  if (isNaN(x)) {
    error = true;
    document.getElementById("contactInformation").style.display = "none";
    document.getElementById("msgTickets").innerHTML =
      "You must enter a number between " +
      minTickets.toString() +
      " and " +
      maxTickets.toString() +
      " please";

    errorColor("numTickets", error);
  } else {
    /*Check only 1-3 entered*/
    x = parseInt(x);

    if (x < minTickets || x > maxTickets) {
      error = true;
      document.getElementById("contactInformation").style.display = "none";
      document.getElementById("msgTickets").innerHTML =
        "You can only buy between " +
        minTickets.toString() +
        " and " +
        maxTickets.toString() +
        " tickets.";

      errorColor("numTickets", error);
    } else {
      /*If valid, display total*/
      error = false;

      //change color on error using errorColor function
      errorColor("numTickets", error);
      document.getElementById("msgTickets").innerHTML = "";
      document.getElementById("contactInformation").style.display = "block";
      totalCost = x * costPerTicket;
      //console.log(totalCost);
      //add total cost to Box with 2 decimals
      document.getElementById("totalCost").value = parseFloat(
        totalCost
      ).toFixed(2);
    }
  }
}

/*Color change of text boxes for use on errors*/
function errorColor(String, error) {
  if (error == true) {
    document.getElementById(String).style.backgroundColor = "red";
    error = false;
  } else {
    document.getElementById(String).style.backgroundColor = "grey";
  }
}


//validate purchase
function completePurchase() {
  var name = document.getElementById("contact").name;
  var email = document.getElementById("contact").email;
  if (AllLetter(name) && ValidateEmail(email)) {
      //if validated, display alert popup with total cost & stop timer.
    window.alert("Thank you for your purchase! Your total cost is $"+totalCost+".00.");
    clearInterval(myTime);
    //console.log("Correct");
    return true;
  } else {
    //console.log("Incorrect");
    return false;
  }
}



//check for a valid name entry with spaces & alert user when incorrect by changing textbox color & showing a message.

function AllLetter(name) {
  var letters = /^(?![ .]+$)[a-zA-Z .]*$/;
  if (name.value.match(letters)) {
    error = false;
    errorColor("name", error);
    document.getElementById("msgname").innerHTML = "";
    //console.log("name is true");
    return true;
  } else {
    error = true;
    errorColor("name", error);
    document.getElementById("msgname").innerHTML = "Please make a valid entry.";
    //console.log("name is false");
    return false;
  }
}

//check for valid email address & alert user when incorrect by showing a message & changing textbox color
function ValidateEmail(email) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    error = false;
    errorColor("email", error);
    document.getElementById("msgemail").innerHTML = "";
    //console.log("email is true");
    return true;
  } else {
    error = true;
    errorColor("email", error);
    document.getElementById("msgemail").innerHTML =
      "Please make a valid entry.";

    //console.log("email is false");
    return false;
  }
}
