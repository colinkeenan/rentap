var butt = document.createElement("button");     //define button element
var btext = document.createTextNode("->0");      //define the text
butt.appendChild(btext);                         //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      var address = document.getElementById('rentaladdress').value;
      var citystatezip = document.getElementById('rentalcitystzip').value;
      var title = document.getElementById('rtitle').value;
      var headername = document.getElementById('headername').value;
      var rheader = [address,citystatezip,title,headername]
      var RHEADER = JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
      RHEADER[0] = rheader;
      window.sessionStorage.setItem("rentapRHEADERJSON",JSON.stringify(RHEADER));
      window.sessionStorage.setItem("rentapRHEADERi", 0); 
      self.postMessage(rheader); //send header to worker to be saved in simple-storage
   },
false);
document.getElementById("defaultheaderbutton").appendChild(butt); //put the button on the page

