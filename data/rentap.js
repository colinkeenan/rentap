function SQLquote(data) { //this comes from amo-editors@mozilla.org in email from Reviewer: Kris Maglione
    switch (typeof data) {
    case "string":
        return "'" + data.replace(/'/g, "''") + "'"; //In the email, this replaced single quotes with 3 single quotes, but SQLite Manager says that's a syntax error. Two single quotes works though.
    case "number":
        return String(data);
    default:
        throw Error("Invalid datatype");
    }
}

function setSqlInsertText() {
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
   var SQLquotedRentap = []
   for(var i=0; i<22; i++) SQLquotedRentap[i] = SQLquote(rentap[i]);

   document.getElementById('sqlinsert').value = "INSERT OR REPLACE INTO rentap VALUES(" + SQLquotedRentap + ")";
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


