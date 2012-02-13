var sel = document.createElement("select");
var opt0 = document.createElement("option");
opt0.text = "Choose Header";
sel.add(opt0, null);
document.getElementById("listheadermenu").appendChild(sel); //put the dropdown menu list on the page

self.on("message", function(RHEADER) {
   while (sel.length < RHEADER.length) {     //Everytime the page is refreshed, populate
      var opti = document.createElement("option"); //the header dropdown list from RHEADER that came from the worker
      var i = sel.length;
      var rheader = RHEADER[i]
      opti.text = rheader[3];
      if (opti.text === "") opti.text = i;
      sel.add(opti, null);
   };
});

sel.addEventListener("click", //can't get any kind of onchange to work so user has to hold down click until selection made
   function(){
      self.postMessage('click'); //tell worker about click so worker can give back RHEADER
      self.on("message", function(RHEADER) {
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
      
         var i = sel.selectedIndex;
         var rheader = RHEADER[i]
         window.sessionStorage.setItem("rentaladdress",rheader[0]); 
         window.sessionStorage.setItem("rentalcitystzip",rheader[1]); 
         window.sessionStorage.setItem("rtitle",rheader[2]);
         window.sessionStorage.setItem("RHEADERi",i);
         window.sessionStorage.setItem("headername",rheader[3]);
         
         self.postMessage(''); //tell worker to refresh the page, displaying the newly selected header
      });
   },
false);




