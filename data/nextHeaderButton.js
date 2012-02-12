var butt = document.createElement("button");    //define button element
var btext = document.createTextNode(">");  //define the text
butt.appendChild(btext);                        //attach text to the button

butt.addEventListener("click",                  //handle onclick event
   function(){
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

      window.sessionStorage.setItem("csv", csvtosave);  //store the csv data in sessionStorage to be displayed on the form when refreshed to the rentaphdr.html
      
      var listheadermenu = document.getElementById('listheadermenu');
      var sel = listheadermenu.firstChild;
      var i = sel.selectedIndex;
      self.postMessage(i); 
      self.on("message", function(rheader) {
         window.sessionStorage.setItem("rentaladdress",rheader[0]); 
         window.sessionStorage.setItem("rentalcitystzip",rheader[1]); 
         window.sessionStorage.setItem("rtitle",rheader[2]);
         window.sessionStorage.setItem("RHEADERi",i);
         window.sessionStorage.setItem("headername",rheader[3]);
      });
   },
false);

document.getElementById("nextrheaderbutton").appendChild(butt); //put the button on the page
