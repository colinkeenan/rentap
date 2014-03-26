var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Save New");         //define the text
butt.appendChild(btext);                                 //attach text to the button

butt.addEventListener("click", 
   function() {                                          //handle onclick event
      var rentap = [
         document.getElementById('fullname').value,  //0
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
         document.getElementById('rtitle').value     //21
      ]
      var mode = window.sessionStorage.getItem('rentapmode');
      if (mode==="edit") {
         window.alert("Warning: this application has already been saved in the past. Clicking 'Save New' again will save another copy leaving the original untouched. If that's not what you want to do, click 'Save Edit' instead.");
         window.sessionStorage.setItem('rentapmode','newedit'); //although session storage mode has been changed to 'newedit', mode is still 'edit' until the next time this function is called
         window.sessionStorage.setItem('rentapUnsavedJSON',JSON.stringify(rentap));
      }
      else {
         rentaps = JSON.parse(window.sessionStorage.getItem('rentapsJSON'));
         rentaps.push(rentap);
         window.sessionStorage.setItem("rentapsJSON",JSON.stringify(rentaps));
         var row = rentaps.length-1;
         document.getElementById('rownumber').value = row;
         window.sessionStorage.setItem('rentaprow',row);
         window.sessionStorage.setItem('rentapmode','edit'); //having saved the application, further changes would be an edit
         self.postMessage([rentap]); //save in simple storage 
      }
   },
false);
document.getElementById("savebutton").appendChild(butt); //put the button on the page

