// window.sessionStorage variables:
//   rentapRHEADERJSON   (array of rentap headers)
//   rentapRHEADERi      (index of currently displayed rentap header)
//   rentapsJSON         (array of rentap applications as arrays)
//   rentapDisplayedJSON (currently displayed information as array)
//   rentapdiscardsJSON  (array of discarded rentap applications as arrays)
//   rentapByIDJSON      (rentapByID[ID] = [isTrash,row] giving row of rentap with ID and wether in discards or rentaps)
//   rentapsFoundJSON    (array of rentap applications that were found from searchbutton)
//   rentaprow           (index of rentap currently displayed)
//   rentapprevrow       (index of rentap that was displayed just before the current one, or -1 if not known)
//   rentaptemprow       (index of rentap displayed before showing discards by pressing Trash button)
//   rentapmode          (new, edit)
//   rentapCSV           (text entered into the CSV box)
//   rentapSQL           (text entered into the SQL box)

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
        document.getElementById('rtitle').value,     //21
        document.getElementById('rentapID').value   //22
     ]
   return rentap;
}

function displayRentap(rentap) {
   var row = window.sessionStorage.getItem("rentaprow");
   var csv = window.sessionStorage.getItem("rentapCSV"); //text entered into the CSV box
   var SQL = window.sessionStorage.getItem("rentapSQL"); //text entered into the SQL box
   var mode = window.sessionStorage.getItem("rentapmode"); //new | edit | discarded

   document.getElementById('rownumber').value = '';
   document.getElementById('row').value=row;
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
   document.getElementById('rentapID').value = rentap[22];
   document.getElementById('rowprint').value=row;
   document.getElementById('headername').value="";
   if (mode === "new") {
      mode = "edit";
      window.sessionStorage.setItem('rentapmode','edit');
      location.reload(); //have to reload to tell addon buttons rentapmode changed
   }
   var prevrow = window.sessionStorage.getItem('rentapprevrow');
   if (prevrow != -1 && (row == 0 || prevrow == 0) && (row != prevrow)) {
      location.reload(); //reload when row changes to or from row 0 to tell addon buttons because some shouldn't show on row 0
   }
   if (mode === "discarded") {
      var f = document.forms[0];
      for(var i=0; i<f.length; i++)                 //don't allow editing discards. for some reason, don't have to worry
        f.elements[i].readOnly = true;              // about turning readOnly off - it does automatically (on reload?)
   }
   document.getElementById('mode').value=mode;
}

function setRheader() {
   var RHEADER=JSON.parse(window.sessionStorage.getItem("rentapRHEADERJSON"));
   var i=window.sessionStorage.getItem("rentapRHEADERi");
   var mode = window.sessionStorage.getItem("rentapmode"); //new | edit | discarded
   if(typeof(RHEADER[i])=== 'undefined') {
      i=0;
      window.sessionStorage.setItem("rentapRHEADERi",i);
   }
   document.getElementById('rentaladdress').value = RHEADER[i][0];
   document.getElementById('rentalcitystzip').value = RHEADER[i][1];
   document.getElementById('rtitle').value = RHEADER[i][2];
   document.getElementById('headername').value = RHEADER[i][3];
   document.getElementById('mode').value=mode;
}

function restoreState() {
   window.onload = function() {
      var mode = window.sessionStorage.getItem("rentapmode"); 
      if(mode === 'new') {
         setRheader();
      } else if(mode === 'edit') {
         var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
         var row = window.sessionStorage.getItem("rentaprow")
         if(typeof(rentaps[row]) != 'undefined') {
            displayRentap(rentaps[row]);
         } else {
            window.sessionStorage.setItem("rentapprevrow",-1);
            row=0;
            window.sessionStorage.setItem("rentaprow",row);
         }
      } else if(mode === 'discarded') {
         var discards = JSON.parse(window.sessionStorage.getItem("rentapdiscardsJSON"));
         var row = window.sessionStorage.getItem("rentaprow")
         if(typeof(discards[row]) != 'undefined') {
            displayRentap(discards[row]);
         } else {
            window.sessionStorage.setItem("rentapprevrow",-1);
            row=0;
            window.sessionStorage.setItem("rentaprow",row);
         }
      } else if(mode === 'edited') {
            window.sessionStorage.setItem("rentapmode","edit");
            var displayedRentap = JSON.parse(window.sessionStorage.getItem('rentapDisplayedJSON'));
            displayRentap(displayedRentap);
      }
      populateChooseName();
      populateSelectHeader();
      var a = document.getElementById("new"); //make sure to check for unsaved changes when New is clicked
      a.onclick = function() {
         var really = editedVerifyReally(); //if editedVerifyReally() is true, then go to new application, otherwise don't
         if (!really) location.reload();
         return really;
      }
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

function getDatabase() {
   var mode = window.sessionStorage.getItem("rentapmode");
   if (mode != "discarded") 
      return JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
   else
      return JSON.parse(window.sessionStorage.getItem("rentapdiscardsJSON"));
}

function editedVerifyReally() {
   var mode = window.sessionStorage.getItem("rentapmode");
   if (mode === "discarded")
      return true; //got here by using navigation in trash which can't be edited so no need for anything else
   var displayedRentap = rentapDisplayed();
   var rentaps = JSON.parse(window.sessionStorage.getItem('rentapsJSON'));
   var row = window.sessionStorage.getItem('rentaprow');
   var edited = false;
   if (mode === "new") {
      for (var i=0; i<16; i++) {   // 16 and above is just header and date
         if (displayedRentap[i] != "") 
            edited = true;
      }
   } else {
      for (var i=0; i<rentaps[row].length; i++) {
         if (displayedRentap[i] != rentaps[row][i]) 
            edited = true;
      }
   }
   var really = true;
   if (edited) {
      window.sessionStorage.setItem("rentapDisplayedJSON",JSON.stringify(displayedRentap));
      var really = window.confirm("Do you really want to leave this page without saving changes?");
      if (!really)
         window.sessionStorage.setItem("rentapmode","edited");
   }
   return really;
}

function prevButton() {   
   var really= editedVerifyReally();
   if (really) {
      var rentaps = getDatabase();
      var row = window.sessionStorage.getItem("rentaprow")
      window.sessionStorage.setItem("rentapprevrow",row);
      if (row>1) row--; else row=rentaps.length-1;
      window.sessionStorage.setItem('rentaprow',row);
      if(typeof(rentaps[row]) != 'undefined') displayRentap(rentaps[row]);
   }
} 

function jumpButton(){
   var really= editedVerifyReally();
   if (really) {
      var rentaps = getDatabase();
      var row = window.sessionStorage.getItem("rentaprow");
      window.sessionStorage.setItem("rentapprevrow",row);
      var jumptorow = document.getElementById("rownumber").value;
      if (jumptorow<=rentaps.length-1 && jumptorow>=0) {       
         window.sessionStorage.setItem('rentaprow',jumptorow);
         if(typeof(rentaps[jumptorow]) != 'undefined') displayRentap(rentaps[jumptorow]);
      }        
   }
} 

function nextButton() {   
   var really= editedVerifyReally();
   if (really) {
      var rentaps = getDatabase();
      var row = window.sessionStorage.getItem("rentaprow");
      window.sessionStorage.setItem("rentapprevrow",row);
      if (row<rentaps.length-1) row++; else row=1;
      window.sessionStorage.setItem('rentaprow',row);
      if(typeof(rentaps[row]) != 'undefined') displayRentap(rentaps[row]);
   } 
}

function searchButton() {
   var rentaps = getDatabase();
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
         var row = RENTAP[0]; //RENTAP[0] is the row, RENTAP[1] is the data to be displayed
         var prevrow = window.sessionStorage.getItem('rentaprow');
         var really= editedVerifyReally();
         if (really) {
            window.sessionStorage.setItem('rentapprevrow',prevrow);
            window.sessionStorage.setItem('rentaprow',row);
            if(typeof(RENTAP[1]) != 'undefined') displayRentap(RENTAP[1]);
         }
         window.sessionStorage.setItem('rentapsFoundJSON',JSON.stringify(found)); //save so Choose Name can display found names
         populateChooseName();
      }
   }
}

var clickButton

function setClickButton(button) {
  clickButton=button; 
}

function processKey(e) {
   if (e == null)
      e = window.event;
   if (e.keyCode == 13) { // pressing ENTER clicks the clickButton set by setClickButton()
      if (clickButton == 'search')
         document.getElementById('searchbutton').click();
      else if (clickButton == 'jump') 
         document.getElementById('jumpbutton').click();
   }
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
   var rentaps = getDatabase();
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
         var really= editedVerifyReally();
         if (really) {
            var i = searchSel.selectedIndex;
            var prevrow = window.sessionStorage.getItem('rentaprow');
            if(i != 0) {
               var j = searchSel.options[i].value;
               window.sessionStorage.setItem('rentapprevrow',prevrow);
               window.sessionStorage.setItem('rentaprow',j);
               displayRentap(rentaps[j]);
            }
         }
      }
}

function trashButton() {
   var butt = document.createElement("button");             //define button element
   var btext = document.createTextNode("Trash");            //define the text
   butt.appendChild(btext);                                 //attach text to the button
   
   var mode = window.sessionStorage.getItem('rentapmode');
   var discards = JSON.parse(window.sessionStorage.getItem('rentapdiscardsJSON'));
   
   butt.addEventListener("click", 
      function() {                                          //handle onclick event
         var really= editedVerifyReally();
         if (really) {
            window.sessionStorage.setItem("rentaptemprow",window.sessionStorage.getItem('rentaprow'))
            window.sessionStorage.setItem("rentaprow",1);
            window.sessionStorage.setItem("rentapprevrow",-1);
            window.sessionStorage.setItem("rentapmode","discarded");
            displayRentap(discards[1]);
            location.reload(); // make sure addon buttons know it's row 1
         } 
      },
   false);
   
   if(mode != "discarded" && discards.length >= 2) 
      document.getElementById("trashbutton").appendChild(butt); //put the Trash button on the page only if there's trash and not already in the trash
}

function backButton() {
   var butt = document.createElement("button");             //define button element
   var btext = document.createTextNode("Back");             //define the text
   butt.appendChild(btext);                                 //attach text to the button
   
   var rentapmode = window.sessionStorage.getItem('rentapmode');
   var rentaps = JSON.parse(window.sessionStorage.getItem('rentapsJSON'));
   var row = window.sessionStorage.getItem('rentaptemprow');
   if (row == null)
      var row = rentaps.length-1;
   window.sessionStorage.setItem('rentapprevrow',-1); 
   
   butt.addEventListener("click", 
      function() {                                          //handle onclick event
         if (typeof(rentaps[row]) === 'undefined' ) 
            row = rentaps.length-1;
         window.sessionStorage.setItem("rentaprow",row);
         window.sessionStorage.setItem("rentapmode","edit");
         displayRentap(rentaps[row]);
         location.reload(); // make sure addon buttons know what row we're on now
      },
   false);
   
   if(rentapmode === "discarded")
      document.getElementById("backbutton").appendChild(butt); //put the Back button on the page only if viewing a discarded rentap
}

var bordersVisible = true;
function toggleBorders() {
   var printcss=document.styleSheets[0];
   var screencss=document.styleSheets[1];
   if (bordersVisible) {
      printcss.insertRule("*{border-width:0px}",0);
      screencss.insertRule("*{border-width:0px}",0);
      bordersVisible = false;
   } else {
      printcss.deleteRule(0);
      screencss.deleteRule(0);
      bordersVisible = true;
  }
}
