var butt = document.createElement("button");     //define button element
var btext = document.createTextNode("+");        //define the text
butt.appendChild(btext);                         //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      
      var rentap = [
         [document.getElementById('fullname').value,
         document.getElementById('ssnumber').value,
         document.getElementById('birthdate').value,
         document.getElementById('maritalstatus').value,
         document.getElementById('email').value,
         document.getElementById('stateid').value,
         document.getElementById('phone1').value,
         document.getElementById('phone2').value,
         document.getElementById('currentaddress').value,
         document.getElementById('previousaddresses').value,
         document.getElementById('occupants').value,
         document.getElementById('pets').value,
         document.getElementById('income').value,
         document.getElementById('employment').value,
         document.getElementById('evictions').value,
         document.getElementById('felonies').value,
         document.getElementById('authdate').value,
         document.getElementById('guestdate').value.replace(/\n/g," "), //newlines in the date boxes aren't handled correctly by UCSV v1.0.2
         document.getElementById('rentdate').value.replace(/\n/g," "),
         document.getElementById('rentaladdress').value,
         document.getElementById('rentalcitystzip').value,
         document.getElementById('rtitle').value]
      ]
   
      window.sessionStorage.setItem("rentapJSON", JSON.stringify(rentap));  //store the data in sessionStorage to be displayed on the form when refreshed
      
      var address = document.getElementById('rentaladdress').value
      var citystatezip = document.getElementById('rentalcitystzip').value
      var title = document.getElementById('rtitle').value
      var headername = document.getElementById('headername').value
      window.sessionStorage.setItem("rentaprentaladdress",address);
      window.sessionStorage.setItem("rentaprentalcitystzip",citystatezip);
      window.sessionStorage.setItem("rentaprtitle",title);
      window.sessionStorage.setItem("rentapheadername",headername);
      
      var rheader = [address,citystatezip,title,headername];
      self.postMessage(rheader); //send header to worker to be saved in simple-storage
      self.on("message", function(RHEADERi) {
         window.sessionStorage.setItem("rentapRHEADERi",RHEADERi); //worker returns index of saved header, saved here to keep track of it
      });
   },
false);
document.getElementById("saverheaderbutton").appendChild(butt); //put the button on the page

