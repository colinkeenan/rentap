var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Del Header");        //define the text
butt.appendChild(btext);                                 //attach text to the button
var RHEADERi = window.sessionStorage.getItem("RHEADERi")

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      self.postMessage(RHEADERi);
      self.on("message", function(rheader) {      
         window.sessionStorage.setItem("rentaladdress",rheader[0]);
         window.sessionStorage.setItem("rentalcitystzip",rheader[1]);
         window.sessionStorage.setItem("rtitle",rheader[2]);
         window.sessionStorage.setItem("HEADERi",0);
      });
   },
false);
document.getElementById("delrheaderbutton").appendChild(butt); //put the button on the page

