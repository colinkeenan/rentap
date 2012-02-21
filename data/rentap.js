function setSqlInsertText() {
   var fullname = "\'" + document.getElementById('fullname').value.replace(/\'/g,"\'\'") + "\'"
   var ssnumber = "\'" + document.getElementById('ssnumber').value.replace(/\'/g,"\'\'") + "\'"
   var birthdate = "\'" + document.getElementById('birthdate').value.replace(/\'/g,"\'\'") + "\'"
   var maritalstatus = "\'" + document.getElementById('maritalstatus').value.replace(/\'/g,"\'\'") + "\'"
   var email = "\'" + document.getElementById('email').value.replace(/\'/g,"\'\'") + "\'"
   var stateid = "\'" + document.getElementById('stateid').value.replace(/\'/g,"\'\'") + "\'"
   var phone1 = "\'" + document.getElementById('phone1').value.replace(/\'/g,"\'\'") + "\'"
   var phone2 = "\'" + document.getElementById('phone2').value.replace(/\'/g,"\'\'") + "\'"
   var currentaddress = "\'" + document.getElementById('currentaddress').value.replace(/\'/g,"\'\'") + "\'"
   var previousaddresses = "\'" + document.getElementById('previousaddresses').value.replace(/\'/g,"\'\'") + "\'"
   var occupants = "\'" + document.getElementById('occupants').value.replace(/\'/g,"\'\'") + "\'"
   var pets = "\'" + document.getElementById('pets').value.replace(/\'/g,"\'\'") + "\'"
   var income = "\'" + document.getElementById('income').value.replace(/\'/g,"\'\'") + "\'"
   var employment = "\'" + document.getElementById('employment').value.replace(/\'/g,"\'\'") + "\'"
   var evictions = "\'" + document.getElementById('evictions').value.replace(/\'/g,"\'\'") + "\'"
   var felonies = "\'" + document.getElementById('felonies').value.replace(/\'/g,"\'\'") + "\'"
   var authdate = "\'" + document.getElementById('authdate').value.replace(/\'/g,"\'\'") + "\'"
   var guestdate = "\'" + document.getElementById('guestdate').value.replace(/\'/g,"\'\'") + "\'"
   var rentdate = "\'" + document.getElementById('rentdate').value.replace(/\'/g,"\'\'") + "\'"
   var rentaladdress = "\'" + document.getElementById('rentaladdress').value + "\'"
   var rentalcitystzip = "\'" + document.getElementById('rentalcitystzip').value + "\'"
   var rtitle = "\'" + document.getElementById('rtitle').value + "\'"
   
   document.getElementById('sqlinsert').value =
   
   "INSERT OR REPLACE INTO rentap VALUES(" + 
   fullname + ", " + ssnumber + ", " + birthdate + ", " + maritalstatus + ", " + email + ", " + stateid + ", " +  phone1 + ", " + phone2 + ", " + currentaddress + ", " + previousaddresses + ", " + occupants + ", " + pets + ", " + income + ", " + employment + ", " + evictions + ", " + felonies + ", " + authdate + ", " + guestdate + ", " + rentdate + ", " + rentaladdress + "," + rentalcitystzip + "," + rtitle + ")";
}

function setRheader() {
   var rentaladdress = window.sessionStorage.getItem("rentaprentaladdress")
   var rentalcitystzip = window.sessionStorage.getItem("rentaprentalcitystzip")
   var rtitle = window.sessionStorage.getItem("rentaprtitle")
   var headername = window.sessionStorage.getItem("rentapheadername")
   if (rentaladdress) document.getElementById('rentaladdress').value = rentaladdress;
   if (rentalcitystzip) document.getElementById('rentalcitystzip').value = rentalcitystzip;
   if (rtitle) document.getElementById('rtitle').value = rtitle;
   if (headername) document.getElementById('headername').value = headername;
}

function clearCSV() {
   document.getElementById('csv').value = "";
   window.sessionStorage.setItem("rentapCSV","");
}

function importJSON() {
   var rentapJSON = window.sessionStorage.getItem("rentapJSON");
   var rentap = JSON.parse(rentapJSON);
   var rentapfield = rentap[0];
   var row = window.sessionStorage.getItem("rentapCSVi");
   var rentapCSV = window.sessionStorage.getItem("rentapCSV"); //this will only have something if the Generate CSV button was clicked
   
   document.getElementById('rownumber').value = row;
   document.getElementById('csv').value = rentapCSV;
   document.getElementById('fullname').value = rentapfield[0];
   document.getElementById('ssnumber').value = rentapfield[1];
   document.getElementById('birthdate').value = rentapfield[2];
   document.getElementById('maritalstatus').value = rentapfield[3];
   document.getElementById('email').value = rentapfield[4];
   document.getElementById('stateid').value = rentapfield[5];
   document.getElementById('phone1').value = rentapfield[6];
   document.getElementById('phone2').value = rentapfield[7];
   document.getElementById('currentaddress').value = rentapfield[8];
   document.getElementById('previousaddresses').value = rentapfield[9];
   document.getElementById('occupants').value = rentapfield[10];
   document.getElementById('pets').value = rentapfield[11];
   document.getElementById('income').value = rentapfield[12];
   document.getElementById('employment').value = rentapfield[13];
   document.getElementById('evictions').value = rentapfield[14];
   document.getElementById('felonies').value = rentapfield[15];
   document.getElementById('authdate').value = rentapfield[16];
   document.getElementById('guestdate').value = rentapfield[17];
   document.getElementById('rentdate').value = rentapfield[18];
   document.getElementById('rentaladdress').value = rentapfield[19];
   document.getElementById('rentalcitystzip').value = rentapfield[20];
   document.getElementById('rtitle').value = rentapfield[21];
   document.getElementById('rowprint').value=row;
   document.getElementById('headername').value="";
}


