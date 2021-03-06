// window.sessionStorage variables:
//   rentapRHEADERJSON     (array of rentap headers)
//   rentapRHEADERi        (index of currently displayed rentap header)
//   rentapsJSON           (array of rentap applications as arrays)
//   rentapBackHistoryJSON (array of id's gone back through)
//   rentapDisplayedJSON   (currently displayed information as array)
//   rentaptrashJSON       (array of indices to discarded rentap applications)
//   rentapkeptJSON        (array of indices of kept rentap applications - any in rentaps that aren't in trash)
//   rentapsFoundJSON      (array of rentap applications that were found from searchbutton)
//   rentaprow             (index of rentap currently displayed)
//   rentapprevrow         (index of rentap that was displayed just before the current one, or -1 if not known)
//   rentaptemprow         (index of rentap displayed before showing trash by pressing Trash button)
//   rentapmode            (new | edit | discarded | edited)
//   rentapCSV             (text entered into the CSV box)
//   rentapSQL             (text entered into the SQL box)

function doNothing(e) { 
   e.preventDefault(); 
} // for submit button way off left of rentap.html page

window.onpopstate = function(event) { //user clicked browser back button - for some reason forward never appears
   if(getID() != event.state) {
      var backHistory = JSON.parse(window.sessionStorage.getItem('rentapBackHistoryJSON'));
      if(backHistory==null || typeof(backHistory[0])==='undefined') backHistory=[getID()];
      backHistory.push(event.state);
      window.sessionStorage.setItem('rentapBackHistoryJSON',JSON.stringify(backHistory));
      document.getElementById("idnumber").value = event.state;
      setClickButton('id');
      jumpButton();
   } else window.history.back();
}

function goForwardButton() {      //putting my own forward button on the page since browser forward never appears
   var backHistory = JSON.parse(window.sessionStorage.getItem('rentapBackHistoryJSON'));
   if(backHistory!=null && typeof(backHistory[0])!='undefined') {
      var id = backHistory.pop();
      while(id==getID()) id = backHistory.pop();
      window.sessionStorage.setItem('rentapBackHistoryJSON',JSON.stringify(backHistory));
      document.getElementById("idnumber").value = id;
      setClickButton('id');
      jumpButton();
   }
}

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

   if (mode === 'newimport') {
      row = '';
      mode = 'new';
   }
   var id=getID();
   history.pushState(id,"");
   document.getElementById('rownumber').value = '';
   document.getElementById('row').value=row;
   document.getElementById('idnumber').value = '';
   document.getElementById('id').value=id;
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
   document.getElementById('rentapID').value = id;
   document.getElementById('rowprint').value=row;
   document.getElementById('headername').value="";
   if (mode === 'newimport') {
      window.sessionStorage.setItem("rentapmode","new");
   }
   var prevrow = window.sessionStorage.getItem('rentapprevrow');
   if (prevrow != -1 && (row == 0 || prevrow == 0) && (row != prevrow)) {
      location.reload(); //reload when row changes to or from row 0 to tell addon buttons because some shouldn't show on row 0
   }
   if (mode === "discarded") {
      var f = document.forms[0];
      for(var i=0; i<f.length; i++)                 //don't allow editing trash.
         if(f.elements[i].id != 'findname' && f.elements[i].id != 'rownumber' && f.elements[i].id != 'idnumber')
            f.elements[i].readOnly = true;
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

function getIDlist() {
   var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
   var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
   var mode = window.sessionStorage.getItem("rentapmode");
   if (mode != 'discarded')
      return kept;
   else
      return trash;
}

function getID() {
   var mode = window.sessionStorage.getItem("rentapmode");
   if(mode === 'newimport') return '';
   var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
   var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
   var row = window.sessionStorage.getItem("rentaprow");
   if (row == null) {
      row = 0;
      window.sessionStorage.setItem("rentaprow",0);
   }
   if(mode != 'discarded' && 0<=row && row<kept.length)
      return Number(kept[row]);
   else if(mode === 'discarded' && 0<=row && row<trash.length) 
      return Number(trash[row]);
   else
      return -1;
}

function getRowOfIDandSetMode(id) {
   var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
   var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
   var trashrow = trash.indexOf(id);
   if(id === 0 || trashrow === -1) { // -1 means not in trash, but 0 is in both trash and kept
      window.sessionStorage.setItem('rentapmode','edit');
      return kept.indexOf(id);
   } else {
      window.sessionStorage.setItem('rentapmode','discarded');
      return trashrow;
   }
}

function restoreState() {
   window.onload = function() {
      var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
      var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
      var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
      var mode = window.sessionStorage.getItem("rentapmode"); 
      var row = window.sessionStorage.getItem("rentaprow")
      if (row == null) {
         row = 0;
         window.sessionStorage.setItem("rentaprow",0);
      }
      if(mode === 'new') {
         window.sessionStorage.setItem("rentaprow",row);
         setRheader();
      } else {
         id = getID(); 
         if (id === -1) {
            id = 0;
            row = 0;
            window.sessionStorage.setItem("rentaprow",0);
         }
         if(mode != 'edited') {
            if(typeof(rentaps[id]) != 'undefined') {
               displayRentap(rentaps[id]);
            } else {
               window.sessionStorage.setItem("rentapprevrow",-1);
               row=0;
               window.sessionStorage.setItem("rentaprow",row);
            }
         } else {
            window.sessionStorage.setItem("rentapmode","edit");
            var displayedRentap = JSON.parse(window.sessionStorage.getItem('rentapDisplayedJSON'));
            displayRentap(displayedRentap);
         }
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
   if(typeof(rentap) != 'undefined') {
      var mode = window.sessionStorage.getItem("rentapmode");
      if (mode === 'new')
         window.sessionStorage.setItem("rentapmode","newimport");
      displayRentap(rentap[0]);
   }
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

function isEdited() {
   var mode = window.sessionStorage.getItem("rentapmode");
   if (mode === "discarded")
      return false; //got here by using navigation in trash which can't be edited so no need for anything else
   var displayedRentap = rentapDisplayed();
   var rentaps = JSON.parse(window.sessionStorage.getItem('rentapsJSON'));
   var row = window.sessionStorage.getItem('rentaprow');
   var id = getID();
   var edited = false;
   if (mode === "new") {
      for (var i=0; i<16; i++) {   // 16 and above is just header and date
         if (displayedRentap[i] != "") 
            edited = true;
      }
   } else {
      for (var i=0; i<rentaps[id].length; i++) {
         if (displayedRentap[i] != rentaps[id][i]) 
            edited = true;
      }
   }
   return edited;
}

function editedVerifyReally() {
   var edited = isEdited();
   var really = true;
   var displayedRentap = rentapDisplayed();
   if (edited) {
      window.sessionStorage.setItem("rentapDisplayedJSON",JSON.stringify(displayedRentap));
      var really = window.confirm("Do you really want to leave this page without saving changes?");
      if (!really)
         window.sessionStorage.setItem("rentapmode","edited");
   }
   return really;
}

function moveOne(direction) {   
   var ids = getIDlist();
   if (ids.length > 1) { // if there's only one id, no place to go
      var really = editedVerifyReally();
      if (really) {
         var rentaps = JSON.parse(window.sessionStorage.getItem('rentapsJSON'));
         var row = window.sessionStorage.getItem('rentaprow');
         var prevrow = row;
         if (direction === 'forward') {
            if (row<ids.length-1) row++; else row=1;
         } else {
            if (row>1) row--; else row=ids.length-1;
         } 
         var id = ids[row];
         if (typeof(id) === 'undefined') {
            id = 0;
            row = 0;
         }
         if(typeof(rentaps[id]) != 'undefined') {
            window.sessionStorage.setItem('rentapprevrow',prevrow);
            window.sessionStorage.setItem('rentaprow',row);
            if (window.sessionStorage.getItem('rentapmode')!='discarded')
               window.sessionStorage.setItem('rentapmode','edit');
            displayRentap(rentaps[id]);
         }
      } 
   }
}

function prevButton() {   
   moveOne('back');
} 

function nextButton() {   
   moveOne('forward');
}

function jumpButton(){
   var really= editedVerifyReally();
   if (really) {
      var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
      var trash = JSON.parse(window.sessionStorage.getItem("rentaptrashJSON"));
      var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
      var row = window.sessionStorage.getItem("rentaprow");
      var id = getID(); //initialize at current id in case can't jump
      var CURRENT = id;
      var mode = window.sessionStorage.getItem("rentapmode");
      if (clickButton == 'row') {
         var input = document.getElementById("rownumber").value;
         if(input == null) 
            window.alert("Please enter a row to go to");
         else 
            var newrow = Number(input);
         if(isNaN(newrow))
            window.alert("Can't go to row '" + input + "' because it's not a number")
         else {
            window.sessionStorage.setItem("rentaprow",newrow); 
            if (getID() === -1) { //getID() here will get the ID that matches newrow
               window.alert("No application available at row: " + newrow.toString());
            } else {
               id = getID();
            }
            window.sessionStorage.setItem("rentaprow",row); //restoring rentaprow for now
         }
         document.getElementById("rownumber").value="";
      } else if (clickButton == 'id') {
         var input = document.getElementById("idnumber").value;
         if(input == null)
            window.alert("Please enter an id to go to");
         else
            var newid = Number(input);
         if(isNaN(newid))
            window.alert("Can't go to id '" + input + "' because it's not a number")
         else {
            if (0<=newid && newid<rentaps.length) {
               if (rentaps[newid] == null || typeof(rentaps[newid][1]) === 'undefined') 
                  window.alert("The application with ID=" + newid.toString() + " has been deleted from Trash");
               else
                  id = newid; 
            } else {
               window.alert("No application available with ID: " + newid.toString());
            }
         }
         document.getElementById("idnumber").value="";
      }
      if (id!=CURRENT && 0<=id && id<rentaps.length) {
         if(typeof(rentaps[id]) != 'undefined') {
            var jumpto = getRowOfIDandSetMode(id);
            window.sessionStorage.setItem("rentapprevrow",row);
            window.sessionStorage.setItem('rentaprow',jumpto);
            displayRentap(rentaps[id]);
            location.reload();
         } else {
            window.alert("The application found is undefined.");
         }
      } else {
         if(id!=CURRENT)
            window.alert("Error finding application."); 
      }
   }
} 

function searchButton() {
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
   var ids = getIDlist();
   var findname = document.getElementById('findname').value;
   if (findname === "") {
      window.sessionStorage.setItem('rentapsFoundJSON',null);
      populateChooseName();
   } else {
      if (RegExp("\^\"").test(findname)) var regexp = RegExp("\^"+findname + "\|\^" + findname.slice(1), "i");
      else var regexp = RegExp(findname, "ig");
      var i = 1; //don't search on row 0 which is the instructions page
      var found = [[[]]];
      while (i < ids.length) {   
         regexp.lastIndex = 0;  //if don't reset lastIndex, it will test this string starting from the position the pattern was found in the previous string
         if (regexp.test(rentaps[ids[i]])) found.push([i,rentaps[ids[i]]]); 
         i++;
      }   
      if(typeof(found[1]) != 'undefined') {
         var RENTAP = found[1];  //save 1st found to be displayed right away
         var row = RENTAP[0]; //RENTAP[0] is the row, RENTAP[1] is the data to be displayed
         var prevrow = window.sessionStorage.getItem('rentaprow');
         var really= editedVerifyReally();
         if (really && typeof(RENTAP[1]) != 'undefined') {
            window.sessionStorage.setItem('rentapprevrow',prevrow);
            window.sessionStorage.setItem('rentaprow',row);
            window.sessionStorage.setItem('rentapmode','edit');
            displayRentap(RENTAP[1]);
         }
         window.sessionStorage.setItem('rentapsFoundJSON',JSON.stringify(found)); //save so Choose Name can display found names
         populateChooseName();
      }
   }
}

function populateChooseName() {
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
   var ids = getIDlist();
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
      while (searchSel.length < ids.length) {
         var namei = document.createElement("option");
         var i = searchSel.length;
         namei.text = rentaps[ids[i]][0];
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
               window.sessionStorage.setItem('rentapmode','edit');
               displayRentap(rentaps[ids[j]]);
            }
         }
      }
}

function trashButton() {
   var butt = document.createElement("button");             //define button element
   var btext = document.createTextNode("Trash");            //define the text
   butt.appendChild(btext);                                 //attach text to the button
   
   var mode = window.sessionStorage.getItem('rentapmode');
   var trash = JSON.parse(window.sessionStorage.getItem('rentaptrashJSON'));
   var rentaps = JSON.parse(window.sessionStorage.getItem("rentapsJSON"));
   
   butt.addEventListener("click", 
      function() {                                          //handle onclick event
         var really= editedVerifyReally();
         if (really) {
            window.sessionStorage.setItem("rentaptemprow",window.sessionStorage.getItem('rentaprow'))
            window.sessionStorage.setItem("rentaprow",1);
            window.sessionStorage.setItem("rentapprevrow",-1);
            window.sessionStorage.setItem("rentapmode","discarded");
            displayRentap(rentaps[trash[1]]);
            location.reload(); // make sure addon buttons know it's row 1
         } 
      },
   false);
   
   if(mode != "discarded" && trash.length >= 2) 
      document.getElementById("trashbutton").appendChild(butt); //put the Trash button on the page only if there's trash and not already in the trash
}

function backButton() {
   var butt = document.createElement("button");             //define button element
   var btext = document.createTextNode("Back");             //define the text
   butt.appendChild(btext);                                 //attach text to the button
   
   var rentapmode = window.sessionStorage.getItem('rentapmode');
   var rentaps = JSON.parse(window.sessionStorage.getItem('rentapsJSON'));
   var row = window.sessionStorage.getItem('rentaptemprow');
   var kept = JSON.parse(window.sessionStorage.getItem("rentapkeptJSON"));
   if (row == null)
      var row = kept.length-1;
   window.sessionStorage.setItem('rentapprevrow',-1); 
   
   butt.addEventListener("click", 
      function() {                                          //handle onclick event
         var id = kept[row];
         if (typeof(id) === 'undefined') {
            row = kept.length-1;
            id = kept[row];
         }
         window.sessionStorage.setItem("rentaprow",row);
         window.sessionStorage.setItem("rentapmode","edit");
         displayRentap(rentaps[id]);
         location.reload(); // make sure addon buttons know what row we're on now
      },
   false);
   
   if(rentapmode === "discarded")
      document.getElementById("backbutton").appendChild(butt); //put the Back button on the page only if viewing a discarded rentap
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
      else if (clickButton == 'row' || clickButton == 'id') 
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

var bordersVisible = true;
function toggleBorders() {
   var printcss=document.styleSheets[0];
   var screencss=document.styleSheets[1];
   if (bordersVisible) {
      printcss.insertRule("*{border-width:0px}",0);
      screencss.insertRule("td:not(#controls) div,td:not(#controls) input,td:not(#controls) textarea{border-width:0px}",0);
      bordersVisible = false;
   } else {
      printcss.deleteRule(0);
      screencss.deleteRule(0);
      bordersVisible = true;
  }
}
