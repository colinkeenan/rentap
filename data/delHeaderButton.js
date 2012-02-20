var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("-");        //define the text
butt.appendChild(btext);                                 //attach text to the button
var RHEADERi = window.sessionStorage.getItem("rentapRHEADERi")

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      self.postMessage(RHEADERi);
      self.on("message", function(iR) {
         window.sessionStorage.setItem("rentapRHEADERi",iR[0]);
         window.sessionStorage.setItem("rentaprentaladdress",iR[1]);
         window.sessionStorage.setItem("rentaprentalcitystzip",iR[2]);
         window.sessionStorage.setItem("rentaprtitle",iR[3]);
         window.sessionStorage.setItem("rentapheadername",iR[4]);
      });
   },
false);
document.getElementById("delrheaderbutton").appendChild(butt); //put the button on the page

