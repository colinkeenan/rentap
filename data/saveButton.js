var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Save New");         //define the text
butt.appendChild(btext);                                 //attach text to the button

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
     
      var mode = window.sessionStorage.getItem('rentapmode');
      if (mode==="edit") {
         window.alert("Warning: this application has already been saved in the past. Clicking 'Save New' again will save another copy leaving the original untouched. If that's not what you want to do, click 'Save Edit' instead.");
         window.sessionStorage.setItem('rentapmode','newedit'); //although session storage mode has been changed to 'newedit', mode is still 'edit' until the next time this function is called
      }
      
      self.postMessage([rentap,mode]);  //send data to saveButton.PageMod worker to save it in a simple-storage csv array if mode is 'new' or 'newedit'

      self.on("message", function(row) {   // gets "row" back from saveButton.PageMod worker
         if (mode==='new' || mode==='newedit') {  //if mode is edit, nothing was saved, and nothing to do here
            window.sessionStorage.setItem('rentapCSVi',row);
            window.sessionStorage.setItem('rentapmode','edit'); //having saved the application, further changes would be an edit
         }
      });
   },
false);
document.getElementById("savebutton").appendChild(butt); //put the button on the page

