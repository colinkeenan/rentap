var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Save New");         //define the text
butt.appendChild(btext);                                 //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      var fullname = "\"" + document.getElementById('fullname').value + "\""
      var ssnumber = "\"" + document.getElementById('ssnumber').value + "\""
      var birthdate = "\"" + document.getElementById('birthdate').value + "\""
      var maritalstatus = "\"" + document.getElementById('maritalstatus').value + "\""
      var email = "\"" + document.getElementById('email').value + "\""
      var stateid = "\"" + document.getElementById('stateid').value + "\""
      var phone1 = "\"" + document.getElementById('phone1').value + "\""
      var phone2 = "\"" + document.getElementById('phone2').value + "\""
      var currentaddress = "\"" + document.getElementById('currentaddress').value + "\""
      var previousaddresses = "\"" + document.getElementById('previousaddresses').value + "\""
      var occupants = "\"" + document.getElementById('occupants').value + "\""
      var pets = "\"" + document.getElementById('pets').value + "\""
      var income = "\"" + document.getElementById('income').value + "\""
      var employment = "\"" + document.getElementById('employment').value + "\""
      var evictions = "\"" + document.getElementById('evictions').value + "\""
      var felonies = "\"" + document.getElementById('felonies').value + "\""
      var authdate = "\"" + document.getElementById('authdate').value + "\""
      var guestdate = "\"" + document.getElementById('guestdate').value + "\""
      var rentdate = "\"" + document.getElementById('rentdate').value + "\""
      var rentaladdress = "\"" + document.getElementById('rentaladdress').value + "\""
      var rentalcitystzip = "\"" + document.getElementById('rentalcitystzip').value + "\""
      var rtitle = "\"" + document.getElementById('rtitle').value + "\""
      
      var csvtosave =  
      fullname + "," + ssnumber + "," + birthdate + "," + maritalstatus + "," + email + "," + stateid + "," +  phone1 + "," + phone2 + "," + currentaddress + "," + previousaddresses + "," + occupants + "," + pets + "," + income + "," + employment + "," + evictions + "," + felonies + "," + authdate + "," + guestdate + "," + rentdate + "," + rentaladdress + "," + rentalcitystzip + "," + rtitle;

      window.sessionStorage.setItem("csv", csvtosave);  //store the csv data in sessionStorage to be displayed on the form when refreshed
      
      var mode = window.sessionStorage.getItem('mode');
      if (mode==="edit") {
         window.alert("Warning: this application has already been saved in the past. Clicking 'Save New' again will save another copy leaving the original untouched. If that's not what you want to do, click 'Save Edit' instead.");
         window.sessionStorage.setItem('mode','new'); //although session storage mode has been changed to 'new', mode is still 'edit'
      }
      self.postMessage([csvtosave,mode]);                //send csv data to saveButton.PageMod worker to save it in a simple-storage csv array
      self.on("message", function(row) {          // gets "row" back from saveButton.PageMod worker
         window.sessionStorage.setItem('CSVi',row);
         if (mode==='new') window.sessionStorage.setItem('mode','edit'); //having saved the application, further changes would be an edit
                                                                         //if mode is 'edit' then session storage mode was changed to 'new'
      });
   },
false);
document.getElementById("savebutton").appendChild(butt); //put the button on the page

