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

function setCSVdata() {
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

   document.getElementById('csv').value =   
   fullname + "," + ssnumber + "," + birthdate + "," + maritalstatus + "," + email + "," + stateid + "," +  phone1 + "," + phone2 + "," + currentaddress + "," + previousaddresses + "," + occupants + "," + pets + "," + income + "," + employment + "," + evictions + "," + felonies + "," + authdate + "," + guestdate + "," + rentdate + "," + rentaladdress + "," + rentalcitystzip + "," + rtitle;
}

function setRheader() {
   var rentaladdress = window.sessionStorage.getItem("rentaladdress")
   var rentalcitystzip = window.sessionStorage.getItem("rentalcitystzip")
   var rtitle = window.sessionStorage.getItem("rtitle")
   if (rentaladdress) document.getElementById('rentaladdress').value = rentaladdress;
   if (rentalcitystzip) document.getElementById('rentalcitystzip').value = rentalcitystzip;
   if (rtitle) document.getElementById('rtitle').value = rtitle;
}

function importCSV() {
   var csv = document.getElementById('csv').value
   if (csv === "") csv = window.sessionStorage.getItem("csv");
   var row = window.sessionStorage.getItem("CSVi");
   var csvfield = csv.split("\"\,\"")
   var fullname = csvfield[0].slice(1)
   var ssnumber = csvfield[1]
   var birthdate = csvfield[2]
   var maritalstatus = csvfield[3]
   var email = csvfield[4]
   var stateid = csvfield[5]
   var phone1 = csvfield[6]
   var phone2 = csvfield[7]
   var currentaddress = csvfield[8]
   var previousaddresses = csvfield[9]
   var occupants = csvfield[10]
   var pets = csvfield[11]
   var income = csvfield[12]
   var employment = csvfield[13]
   var evictions = csvfield[14]
   var felonies = csvfield[15]
   var authdate = csvfield[16]
   var guestdate = csvfield[17]
   var rentdate = csvfield[18]
   var rentaladdress = ""
   if(typeof(csvfield[19]) === 'undefined') rentaladdress="enter rental address";
   else rentaladdress=csvfield[19];
   var rentalcitystzip = ""
   if(typeof(csvfield[20]) === 'undefined') rentalcitystzip="enter city, state, zip";
   else rentalcitystzip=csvfield[20];
   var rtitle = ""
   if(typeof(csvfield[21]) === 'undefined') rtitle="enter title";
   else rtitle=csvfield[21].slice(0,csvfield[21].indexOf("\""));
   
   document.getElementById('rownumber').value = window.sessionStorage.getItem("CSVi");
   document.getElementById('fullname').value = fullname;
   document.getElementById('ssnumber').value = ssnumber;
   document.getElementById('birthdate').value = birthdate;
   document.getElementById('maritalstatus').value = maritalstatus;
   document.getElementById('email').value = email;
   document.getElementById('stateid').value = stateid;
   document.getElementById('phone1').value = phone1;
   document.getElementById('phone2').value = phone2;
   document.getElementById('currentaddress').value = currentaddress;
   document.getElementById('previousaddresses').value = previousaddresses;
   document.getElementById('occupants').value = occupants;
   document.getElementById('pets').value = pets;
   document.getElementById('income').value = income;
   document.getElementById('employment').value = employment;
   document.getElementById('evictions').value = evictions;
   document.getElementById('felonies').value = felonies;
   document.getElementById('authdate').value = authdate;
   document.getElementById('guestdate').value = guestdate;
   document.getElementById('rentdate').value = rentdate;
   document.getElementById('rentaladdress').value = rentaladdress;
   document.getElementById('rentalcitystzip').value = rentalcitystzip;
   document.getElementById('rtitle').value = rtitle;
   document.getElementById('csv').value="";
   document.getElementById('rowprint').value=row;
}



