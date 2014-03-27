// window.sessionStorage variables:
//   rentapRHEADERJSON (array of rentap headers)
//   rentapRHEADERi    (index of currently displayed rentap header)
//   rentapsJSON       (array of rentap applications as arrays)
//   rentapsFoundJSON  (array of rentap applications that were found from searchbutton)
//   rentaprow         (index of rentap currently displayed)
//   rentapmode        (new, edit)
//   rentapCSV         (text entered into the CSV box)
//   rentapSQL         (text entered into the SQL box)

function rentapDisplayed() {
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

function displayRentap(rentap) {
   var row = window.sessionStorage.getItem("rentaprow");
   var csv = window.sessionStorage.getItem("rentapCSV"); //text entered into the CSV box
   var SQL = window.sessionStorage.getItem("rentapSQL"); //text entered into the SQL box

   document.getElementById('rownumber').value = row;
   document.getElementById('csv').value = csv;
   document.getElementById('SQL').value = SQL;
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
   var RHEADER=JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
   var i=window.sessionStorage.getItem("rentapRHEADERi");
   if(typeof(RHEADER[i])=== 'undefined') {
      i=0;
      window.sessionStorage.setItem("rentapRHEADERi",i);
   }
   document.getElementById('rentaladdress').value = RHEADER[i][0];
   document.getElementById('rentalcitystzip').value = RHEADER[i][1];
   document.getElementById('rtitle').value = RHEADER[i][2];
   document.getElementById('headername').value = RHEADER[i][3];
}

function restoreState() {
   var mode = window.sessionStorage.getItem("rentapmode"); 
   if(mode === 'new') {
      setRheader();
   } else if(mode === 'edit') {
      var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
      var row = window.sessionStorage.getItem("rentaprow")
      if(typeof(rentaps[row]) != 'undefined') {
         displayRentap(rentaps[row]);
      } else {
         row=0;
         window.sessionStorage.setItem("rentaprow",row);
      }
   } 
   populateChooseName();
   populateSelectHeader();
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
   var rentap = rentapDisplayed();
   document.getElementById('csv').value = CSV.arrayToCsv([rentap]);
}

function importCSV() {
   var rentap = CSV.csvToArray(document.getElementById('csv').value);
   if(typeof(rentap) != 'undefined') displayRentap(rentap[0]);
}

function setSqlInsertText() {
   var rentap = rentapDisplayed();
   var SQLquotedRentap = []
   for(var i=0; i<22; i++) SQLquotedRentap[i] = SQLquote(rentap[i]);

   document.getElementById('SQL').value = "INSERT OR REPLACE INTO rentap VALUES(" + SQLquotedRentap + ")";
}

function clearCSV() {
   document.getElementById('csv').value = "";
   window.sessionStorage.setItem("rentapCSV","");
}

function prevButton() {   
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
   var row = window.sessionStorage.getItem("rentaprow")
   if (row>0) row--; else row=rentaps.length-1;
   window.sessionStorage.setItem('rentaprow',row);
   if(typeof(rentaps[row]) != 'undefined') displayRentap(rentaps[row]);
} 

function jumpButton(){
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
   var jumptorow = document.getElementById("rownumber").value;
   if (jumptorow<=rentaps.length-1 && jumptorow>=0) {       
      window.sessionStorage.setItem('rentaprow',jumptorow);
      if(typeof(rentaps[jumptorow]) != 'undefined') displayRentap(rentaps[jumptorow]);
   }        
} 

function nextButton() {   
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
   var row = window.sessionStorage.getItem("rentaprow")
   if (row<rentaps.length-1) row++; else row=0;
   window.sessionStorage.setItem('rentaprow',row);
   if(typeof(rentaps[row]) != 'undefined') displayRentap(rentaps[row]);
} 

function searchButton() {
   var rentaps = JSON.parse(window.sessionStorage.getItem('rentapsJSON'));
   var findname = document.getElementById('findname').value;
   if (findname === "") {
      window.sessionStorage.setItem('rentapsFoundJSON',null);
      populateChooseName();
   } else {
      if (RegExp("\^\"").test(findname)) var regexp = RegExp("\^"+findname + "\|\^" + findname.slice(1), "i");
      else var regexp = RegExp(findname, "ig");
      var i = 1; //don't search on row 0 which is the instructions page
      var found = [[[]]];
      while (i < rentaps.length) {   
         regexp.lastIndex = 0;  //if don't reset lastIndex, it will test this string starting from the position the pattern was found in the previous string
         if (regexp.test(rentaps[i])) found.push([i,rentaps[i]]); 
         i++;
      }   
      if(typeof(found[1]) != 'undefined') {
         var RENTAP = found[1];  //save 1st found to be displayed right away
         window.sessionStorage.setItem('rentaprow',RENTAP[0]); //RENTAP[0] is the row, RENTAP[1] is the data to be displayed
         if(typeof(RENTAP[1]) != 'undefined') displayRentap(RENTAP[1]);
         window.sessionStorage.setItem('rentapsFoundJSON',JSON.stringify(found)); //save so Choose Name can display found names
         populateChooseName();
      }
   }
}

function processKey(e) {
    if (e == null)
        e = window.event;
    if (e.keyCode == 13)  // pressing ENTER clicks the Search button
        document.getElementById("searchbutton").click();
}

function populateSelectHeader() {
   var sel = document.getElementById("listheadermenu").firstChild;
   var RHEADER = JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
   for(var i = sel.options.length-1; i>=1; i--)
      sel.remove(i);
   while (sel.length < RHEADER.length) {
      var opti = document.createElement("option");
      var i = sel.length;
      var rheader = RHEADER[i]
      opti.text = rheader[3];
      if (opti.text === "") opti.text = i;
      sel.add(opti, null);
   };
   
   sel.onchange = 
      function(){
         var i = sel.selectedIndex;
         window.sessionStorage.setItem("rentapRHEADERi",i);
         setRheader() 
      }
}

function populateChooseName() {
   var rentaps = JSON.parse(window.sessionStorage.getItem('rentapsJSON'));
   var searchSel = document.getElementById("listsearchmenu").firstChild;   
   for(var i = searchSel.options.length-1; i>=1; i--)
     searchSel.remove(i);
   var rentapsFoundJSON = window.sessionStorage.getItem('rentapsFoundJSON');
   var found = JSON.parse(rentapsFoundJSON);
   if(rentapsFoundJSON != null && found != null) {
      while (searchSel.length < found.length) {
         var namei = document.createElement("option");
         var i = searchSel.length;
         namei.text = (found[i][1])[0];
         namei.value = found[i][0];
         searchSel.add(namei, null);
      }
   } else {
      while (searchSel.length < rentaps.length) {
         var namei = document.createElement("option");
         var i = searchSel.length;
         namei.text = rentaps[i][0];
         namei.value = i;
         searchSel.add(namei, null);
      }
   };

   searchSel.onchange = 
      function(){
         var i = searchSel.selectedIndex;
         var j = searchSel.options[i].value;
         window.sessionStorage.setItem('rentaprow',j);
         if(typeof(rentaps[j]) != 'undefined') displayRentap(rentaps[j]);
      }
}
