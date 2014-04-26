var butt = document.createElement("button");     //define button element
var btext = document.createTextNode("+");        //define the text
butt.appendChild(btext);                         //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      var address = document.getElementById('rentaladdress').value;
      var citystatezip = document.getElementById('rentalcitystzip').value;
      var title = document.getElementById('rtitle').value;
      var headername = document.getElementById('headername').value;
      var rheader = [address,citystatezip,title,headername]
      var RHEADER = JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
      RHEADER.push(rheader);
      window.sessionStorage.setItem("rentapRHEADERJSON",JSON.stringify(RHEADER));
      var i = RHEADER.length-1;
      window.sessionStorage.setItem("rentapRHEADERi", i); 
      self.postMessage(rheader); //send header to worker to be saved in simple-storage
   },
false);
document.getElementById("saverheaderbutton").appendChild(butt); //put the button on the page

