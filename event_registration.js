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


//Timer Countdown

/**Variables**/
var timeLeft;
var mins;
var sec;
var r;

//check current date
var start=Date.now();
var myTime=setInterval(function () {
    //subtract time from 10 minutes continuously
    timeLeft=600000-(Date.now()-start);

    //check whether time left is great than 0 or not
	if (timeLeft<=0) {
		clearInterval(myTime);
        alert("You have exceeded 10 minutes. \n Please try again if you need tickets.");
        //redirect to the main page again
		window.location.href="event_registration.html";
	}
	mins = timeLeft / 60000;
	r = mins % 1;
	sec = Math.floor(r * 60);
	if (sec < 10) {
    	sec = '0'+sec;
	}
	mins = Math.floor(mins);
    document.getElementById("timer").innerHTML = mins+':'+sec;
	timeLeft=timeLeft-1000;


}, 1000);



/*Calculate total ticket costs */

var totalCost;

function calculateTotal(){

	 var x = parseInt(document.forms["contact"]["numTickets"].value, 10);
  console.log('x is =>', x);
	 var error;

/*Verify only numbers are entered*/
	  if(isNaN(x)){
		 error=true;
		 document.getElementById("contactInformation").style.display='none';
		 document.getElementById("msgname").innerHTML = 'You must enter a number between '+minTickets.toString()+' and '+maxTickets.toString()+' please';

		 errorColor('numTickets',error);
   }

/*Check only 1-3 entered*/
	 else {
		x=parseInt(x);

		if (x<minTickets||x>maxTickets) {
			error=true;
			document.getElementById("contactInformation").style.display='none';
			document.getElementById("msgname").innerHTML = 'You can only buy between '+minTickets.toString()+' and '+maxTickets.toString()+' tickets.';

			errorColor('numTickets',error);
		}


/*If valid, display total*/
		else {
            error=false;
            
            //change color on error using errorColor function
			errorColor('numTickets',error);
			document.getElementById("msgname").innerHTML = '';
			document.getElementById("contactInformation").style.display='block';
			totalCost=(x*costPerTicket);
      console.log(totalCost);
			document.getElementById('totalCost').innerHTML = parseFloat(totalCost).toFixed(2); 
		}
     
	 }
}

/*Color change on error*/
function errorColor(String, error ) {
	if (error==true ){
		document.getElementById(String).style.backgroundColor='red';
		error=false;
	}
	else{
		document.getElementById(String).style.backgroundColor='grey';
	}
}
