//window.sessionStorage variables:
//   rentapRHEADERJSON (array of rentap headers)
//   rentapRHEADERi    (index of last header used)
//   rentaps           (array of rentap applications as arrays)
//   rentaprow         (index of last application displayed)
//   rentapmode        (new, edit, newedit)
//   rentapCSV         (information entered into the CSV box)
//

function rentapGet() {
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
   return rentap
}

function rentapPut(rentap) {
   var row = window.sessionStorage.getItem("rentaprow");
   var rentapCSV = window.sessionStorage.getItem("rentapCSV"); //this will only have something if the Generate CSV button was clicked
   
   document.getElementById('rownumber').value = row;
   document.getElementById('csv').value = rentapCSV;
   document.getElementById('fullname').value = rentap[0];
   document.getElementById('ssnumber').value = rentap[1];
   document.getElementById('birthdate').value = rentap[2];
   document.getElementById('maritalstatus').value = rentap[3];
   document.getElementById('email').value = rentap[4];
   document.getElementById('stateid').value = rentap[5];
   document.getElementById('phone1').value = rentap[6];
   document.getElementById('phone2').value = rentap[7];
   document.getElementById('currentaddress').value = rentap[8];
   document.getElementById('previousaddresses').value = rentap[9];
   document.getElementById('occupants').value = rentap[10];
   document.getElementById('pets').value = rentap[11];
   document.getElementById('income').value = rentap[12];
   document.getElementById('employment').value = rentap[13];
   document.getElementById('evictions').value = rentap[14];
   document.getElementById('felonies').value = rentap[15];
   document.getElementById('authdate').value = rentap[16];
   document.getElementById('guestdate').value = rentap[17];
   document.getElementById('rentdate').value = rentap[18];
   document.getElementById('rentaladdress').value = rentap[19];
   document.getElementById('rentalcitystzip').value = rentap[20];
   document.getElementById('rtitle').value = rentap[21];
   document.getElementById('rowprint').value=row;
   document.getElementById('headername').value="";

   window.sessionStorage.setItem('rentapmode','edit');
}

function setRheader() {
   var rheader=JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
   var i=window.sessionStorage.getItem("rentapRHEADERi");
   document.getElementById('rentaladdress').value = rheader[i][0];
   document.getElementById('rentalcitystzip').value = rheader[i][1];
   document.getElementById('rtitle').value = rheader[i][2];
   document.getElementById('headername').value = rheader[i][3];
}

function restoreState() {
   var mode = window.sessionStorage.getItem("rentapmode"); 
   if(mode === 'new') {
      setRheader();
   }
   else {
      var rentaps = JSON.parse(window.sessionStorage.getItem("rentaps"));
      var row = window.sessionStorage.getItem("rentaprow")
      rentapPut(rentaps[row]);
   }
}

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

function setCSVInsertText() {
   var rentap = rentapGet();
   document.getElementById('csv').value = CSV.arrayToCsv(rentap);
}

function importCSV() {
   var rentap = CSV.csvToArray(document.getElementById('csv').value);
   rentapPut(rentap[0]);
}

function setSqlInsertText() {
   var rentap = rentapGet();
   var SQLquotedRentap = []
   for(var i=0; i<22; i++) SQLquotedRentap[i] = SQLquote(rentap[i]);

   document.getElementById('sqlinsert').value = "INSERT OR REPLACE INTO rentap VALUES(" + SQLquotedRentap + ")";
}

function clearCSV() {
   document.getElementById('csv').value = "";
   window.sessionStorage.setItem("rentapCSV","");
}

function prevButton() {   
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentaps"));
   var row = window.sessionStorage.getItem("rentaprow")
   if (row>0) row--; else row=rentaps.length-1;
   window.sessionStorage.setItem('rentaprow',row);
   rentapPut(rentaps[row]);
} 

function jumpButton(){
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentaps"));
   var jumptorow = document.getElementById("rownumber").value;
   if (jumptorow<=rentaps.length-1 && jumptorow>=0) {       
      window.sessionStorage.setItem('rentaprow',jumptorow);
      rentapPut(rentaps[jumptorow]);
   }        
} 

function nextButton() {   
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentaps"));
   var row = window.sessionStorage.getItem("rentaprow")
   if (row<rentaps.length-1) row++; else row=0;
   window.sessionStorage.setItem('rentaprow',row);
   rentapPut(rentaps[row]);
} 

