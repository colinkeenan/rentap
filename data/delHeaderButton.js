var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("-");        //define the text
butt.appendChild(btext);                                 //attach text to the button
var RHEADERi = window.sessionStorage.getItem("RHEADERi")

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      self.postMessage(RHEADERi);
      self.on("message", function(iR) {
         window.sessionStorage.setItem("RHEADERi",iR[0]);
         window.sessionStorage.setItem("rentaladdress",iR[1]);
         window.sessionStorage.setItem("rentalcitystzip",iR[2]);
         window.sessionStorage.setItem("rtitle",iR[3]);
         window.sessionStorage.setItem("headername",iR[4]);
      });
   },
false);
document.getElementById("delrheaderbutton").appendChild(butt); //put the button on the page

