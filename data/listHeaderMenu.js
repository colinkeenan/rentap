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

sel.onchange = 
   function(){
      self.postMessage('click'); //tell worker about click so worker can give back RHEADER
      self.on("message", function(RHEADER) {
         
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
            document.getElementById('guestdate').value,
            document.getElementById('rentdate').value,
            document.getElementById('rentaladdress').value,
            document.getElementById('rentalcitystzip').value,
            document.getElementById('rtitle').value]
         ]
      
         window.sessionStorage.setItem("rentapJSON", JSON.stringify(rentap));  //store the data in sessionStorage to be displayed on the form when refreshed
     
         var i = sel.selectedIndex;
         var rheader = RHEADER[i];
         window.sessionStorage.setItem("rentaprentaladdress",rheader[0]); 
         window.sessionStorage.setItem("rentaprentalcitystzip",rheader[1]); 
         window.sessionStorage.setItem("rentaprtitle",rheader[2]);
         window.sessionStorage.setItem("rentapRHEADERi",i);
         window.sessionStorage.setItem("rentapheadername",rheader[3]);
         
         self.postMessage(''); //tell worker to refresh the page, displaying the newly selected header
      });
   }



