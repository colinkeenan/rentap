var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Save Edit");
butt.appendChild(btext);                                 //attach text to the button

butt.addEventListener("click", 
   function() {                                 //handle onclick event
      var rentap = [
         [document.getElementById('fullname').value,  //0
         document.getElementById('ssnumber').value,   //1
         document.getElementById('birthdate').value,  //2
         document.getElementById('maritalstatus').value, //3
         document.getElementById('email').value,      //4
         document.getElementById('stateid').value,    //5
         document.getElementById('phone1').value,     //6
         document.getElementById('phone2').value,     //7
         document.getElementById('currentaddress').value,   //8
         document.getElementById('previousaddresses').value,   //9
         document.getElementById('occupants').value,  //10
         document.getElementById('pets').value,       //11
         document.getElementById('income').value,     //12
         document.getElementById('employment').value, //13
         document.getElementById('evictions').value,  //14
         document.getElementById('felonies').value,   //15
         document.getElementById('authdate').value,   //16
         document.getElementById('guestdate').value, //17 
         document.getElementById('rentdate').value,  //18
         document.getElementById('rentaladdress').value, //19
         document.getElementById('rentalcitystzip').value,  //20
         document.getElementById('rtitle').value]     //21
      ]
      var row = window.sessionStorage.getItem('rentaprow');
      var mode = window.sessionStorage.getItem('rentapmode');
      if (mode==="new") {
         window.alert("Warning: this application has never been saved before. Clicking 'Save Edit' again will overwrite the previous application with this new one. If that's not what you want to do, click 'Save New' instead.");
         window.sessionStorage.setItem('rentapmode','newedit'); //although session storage mode has been changed to 'newedit', mode is still 'new' until the next time this function is called
      }
      else {                       //saves edit if mode is 'edit' or 'newedit' but not if 'new'
         csvarray = JSON.parse(window.sessionStorage.getItem('rentapcsvJSON'));
         csvarray[row] = rentap;
         window.sessionStorage.setItem("rentapcsvJSON",JSON.stringify(csvarray));
         self.postMessage([row,rentap]);
      }
   },
false);
document.getElementById("saveeditbutton").appendChild(butt); //put the button on the page

