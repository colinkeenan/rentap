var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Save Edit");
butt.appendChild(btext);                                 //attach text to the button

butt.addEventListener("click", 
   function() {                                 //handle onclick event
         
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
      
      var row = window.sessionStorage.getItem('rentapCSVi');
      var mode = window.sessionStorage.getItem('rentapmode');
      if (mode==="new") {
         window.alert("Warning: this application has never been saved before. Clicking 'Save Edit' again will overwrite the previous application with this new one. If that's not what you want to do, click 'Save New' instead.");
         window.sessionStorage.setItem('rentapmode','newedit'); //although session storage mode has been changed to 'newedit', mode is still 'new' until the next time this function is called
        }
      self.postMessage([row,rentap,mode]); //worker saves edit if mode is 'edit' or 'newedit' but not if 'new'
   },
false);
document.getElementById("saveeditbutton").appendChild(butt); //put the button on the page

