var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("~");        //define the text
butt.appendChild(btext);                                 //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      var RHEADER = JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
      var i = window.sessionStorage.getItem("rentapRHEADERi");
      var address = document.getElementById('rentaladdress').value;
      var citystatezip = document.getElementById('rentalcitystzip').value;
      var title = document.getElementById('rtitle').value;
      var headername = document.getElementById('headername').value;

      RHEADER[i] = [address,citystatezip,title,headername];   
      window.sessionStorage.setItem("rentapRHEADERJSON",JSON.stringify(RHEADER));
      self.postMessage([i,RHEADER[i]]); //send header to worker to be saved in simple-storage
   },
false);
document.getElementById("editheaderbutton").appendChild(butt); //put the button on the page

