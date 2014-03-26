var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("-");        //define the text
butt.appendChild(btext);                                 //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      var RHEADERi = window.sessionStorage.getItem("rentapRHEADERi")
      var RHEADER=JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
      RHEADER.splice(RHEADERi,1);
      var i=0;
      if (RHEADERi<RHEADER.length) i=RHEADERi;
      else if (RHEADERi>0) i=RHEADERi-1;
      document.getElementById('rentaladdress').value = RHEADER[i][0];
      document.getElementById('rentalcitystzip').value = RHEADER[i][1];
      document.getElementById('rtitle').value = RHEADER[i][2];
      document.getElementById('headername').value = RHEADER[i][3];
      window.sessionStorage.setItem("rentapRHEADERi",i);
      window.sessionStorage.setItem("rentapRHEADERJSON",JSON.stringify(RHEADER));
      self.postMessage(RHEADERi);
   },
false);
document.getElementById("delrheaderbutton").appendChild(butt); //put the button on the page

