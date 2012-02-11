var butt = document.createElement("button");             //define button element
var btext = document.createTextNode("Save Header");        //define the text
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
      
      var address = document.getElementById('rentaladdress').value
      var citystatezip = document.getElementById('rentalcitystzip').value
      var title = document.getElementById('rtitle').value
      window.sessionStorage.setItem("rentaladdress",address);
      window.sessionStorage.setItem("rentalcitystzip",citystatezip);
      window.sessionStorage.setItem("rtitle",title);
      
      var headerinfo = [address,citystatezip,title];
      self.postMessage(headerinfo); //send header to worker to be saved in simple-storage
      self.on("message", function(HEADERi) {
         window.sessionStorage.setItem("HEADERi",HEADERi); //worker returns index of saved header, saved here to keep track of it
      });
   },
false);
document.getElementById("saverheaderbutton").appendChild(butt); //put the button on the page

