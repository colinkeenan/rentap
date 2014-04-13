var self = require("sdk/self");
var data = self.data;
var tabs = require("sdk/tabs");
var clipboard = require("sdk/clipboard");
var ss = require("sdk/simple-storage");
var INITcsv = ['"My First M Last","###-##-####","mo/dy/year","Single/Divorced/Seperated/Married","emailname@emailprovider.com","driver\'s license/ID# and State","555-321-4321","555-123-1234","9080 Example Blvd, $200/mo' +
'\nCity, ST  Zip' +
'\nJun\'09 - present' +
'\nMr. Landlord 555-555-5555","7060 Example Ave, $525/mo' +
'\nCity, ST  Zip, Aug\'08 - Jun\'09' +
'\nMr. Landlord 555-444-4444' +
'\n' +
'\n5040 Example St, Free' +
'\nCity, ST  Zip, Jun\'08 - July\'08' +
'\nRelative/Shelter 555-333-3333' +
'\n' +
'\n3020 Example Rd, $175/wk' +
'\nCity, ST  Zip, -Dec\'07 - May\'08' +
'\nHotel 555-222-2222","My First M Last, age' +
'\nFirst M Last, age, friend/spouse/relative","name, age, type of animal & breed, size' +
'\n' +
'\nor N/A","$200/mo Food Stamps' +
'\n$175 every two weeks from job listed below","Company Name' +
'\nAddress' +
'\nCity, ST  Zip' +
'\n' +
'\nas' +
'\n' +
'\nPosition, # hours/wk, under' +
'\nMs. Supervisor 555-111-1111' +
'\nfor # months/years","Company or Person that evicted you in Month/Year from Address, City, ST  Zip","Offense, County, State, Date, D.O.C. ID, and, if currently on parole/probation, include P.O. name and phone number.","mo/dy/year","","","","","Instructions by Example",0'];
var INITcsvdiscards = ['"Trash is Empty","","","","","","","","","","","","","","","","","","","","","No Trash Left",0'];
var INIT0 = [["Nothing","","","","","","","","","","","","","","","","","","","","","Nothing to See Here",0]];

//initialize csvrentaps[0] to be an instruction page for renters to refer to when filling out an application
if(typeof(ss.storage.csv) === 'undefined') ss.storage.csv = INITcsv;

if(typeof(ss.storage.RHEADER) === 'undefined') 
  ss.storage.RHEADER = [["enter rental address","enter city, state, zip","enter title","enter header name"]];

if(typeof(ss.storage.csvdiscards) === 'undefined') 
  ss.storage.csvdiscards = INITcsvdiscards;

if(typeof(ss.storage.rentapByID) === 'undefined')
  ss.storage.rentapByID = [[false,0]]; 

var csvrentaps = ss.storage.csv;
var RHEADER = ss.storage.RHEADER;
var csvdiscards = ss.storage.csvdiscards;
var rentapByID = ss.storage.rentapByID;

var CSV = require('./ucsv-1.1.0'); //UCSV v1.1.0 Provided under MIT License. Copyright 2010-2012, Peter Johnson http://www.uselesscode.org/javascript/csv/

function arrayofcsvToArrayofArrays(arrayofcsv) {
   var INITARRAY = [[]];
   var arrayofArrays = [[]];
   if (typeof(arrayofcsv) != 'undefined') {
      for(var i=0; i<arrayofcsv.length; i++) {
         if (typeof(arrayofcsv[i]) == 'string') {
            arrayofArrays[i] = CSV.csvToArray(arrayofcsv[i])[0];
         } else if (i == 0) {
               arrayofArrays = INIT0;
         } else {
            arrayofcsv.splice(i,1);
            i--;
         }
      }
   } else {  
      arrayofArrays = INIT0;
   }
   if (arrayofArrays === INITARRAY)
      arrayofArrays = INIT0;
   return arrayofArrays;
}

function initIDs(argArr) {
   var csvdb = argArr[0];
   var db = argArr[1];
   var isTrash = argArr[2];
   var len = db.length
   if (len > 1) { 
      for (var i=0; i<len; i++) {
         db[i][22] = i.toString();
         csvdb[i] = CSV.arrayToCsv([db[i]]);
         rentapByID[i] = [isTrash,i];
      }
   }
}

var rentaps = arrayofcsvToArrayofArrays(csvrentaps);
var discards = arrayofcsvToArrayofArrays(csvdiscards);
if (rentaps[0].length === 22) {
   initIDs([csvrentaps,rentaps,false]);
   initIDs([csvdiscards,discards,true]);
}

var saveButton = require("sdk/page-mod");
saveButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveButton.js"),   
   onAttach: function onAttach(worker) {
      worker.on('message', function(RENTAP) { // RENTAP is [mode,row,rentap]
         if(RENTAP[0] === 'edit') {
            csvrentaps[RENTAP[1]] = CSV.arrayToCsv([RENTAP[2]]); 
         } else {
            var rentapID = Number(RENTAP[2][22]);
            rentapByID[rentapID] = [false,RENTAP[1]]; //rentap[22] is the ID, false answers Is this a discard?, and RENTAP[1] is row
            csvrentaps.push(CSV.arrayToCsv([RENTAP[2]]));
         }
      });
   }
});

var saveHeaderButton = require("sdk/page-mod");
saveHeaderButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(rheader) { //rheader comes from saveHeaderButton.js
         RHEADER.push(rheader);
      });
   }
});

var editHeaderButton = require("sdk/page-mod");
editHeaderButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("editHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(iR) { //iR comes from editHeaderButton.js
         RHEADER[iR[0]] = iR[1];          // and contains the index (iR[0]), and data to be saved.
      });
   }
});

var defaultHeaderButton = require("sdk/page-mod");
defaultHeaderButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("defaultHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(rheader) { //rheader comes from defaultHeaderButton.js
         RHEADER[0] = rheader;
      });
   }
});

var delRheaderButton = require("sdk/page-mod");
delRheaderButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("delHeaderButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(i) {
         RHEADER.splice(i,1);
      });
   }
});

var delRentapButton = require("sdk/page-mod");
delRentapButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("delRentapButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(row) {
         var discards = arrayofcsvToArrayofArrays(csvdiscards);
         var id = Number(discards[row][22]);
         csvdiscards.splice(row,1);           //delButton is only visible on a discard
         discards.splice(row,1); // just so discards will be right for setting up rentapByID
         rentapByID[id] = [true,0]; //true that it had been discarded, and together with 0 signals deleted 
  // need to update the row of all discards that were after the one being deleted since they will be one row lower
         for (var nrow=discards.length-1; nrow>=row; nrow--) 
            rentapByID[Number(discards[nrow][22])] = [true,nrow];
      })
   }
});

var discardButton = require("sdk/page-mod");
discardButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("discardButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(row) {
         var rentaps = arrayofcsvToArrayofArrays(csvrentaps);
         var discards = arrayofcsvToArrayofArrays(csvdiscards);
         var id = Number(rentaps[row][22]);
         csvdiscards.push(csvrentaps[row]);
         csvrentaps.splice(row,1);
         rentaps.splice(row,1);  // just so rentaps will be right for setting up rentapByID
         rentapByID[id] = [true,discards.length-1];              //true that it's discarded, and it's on row discards.length-1
   //also need to update the row of all rentaps that were after the one being discarded since they will be one row lower
         for (var nrow=rentaps.length-1; nrow>=row; nrow--) 
            rentapByID[Number(rentaps[nrow][22])] = [false,nrow];
      });
   }
});

var restoreButton = require("sdk/page-mod");
restoreButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("restoreButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(args) { //args = [row,newrow,id]
         var row = args[0], newrow = args[1], id = args[2];
         csvrentaps.splice(newrow,0,csvdiscards[row]); 
         csvdiscards.splice(row,1); 
         var rentaps = arrayofcsvToArrayofArrays(csvrentaps);
         var discards = arrayofcsvToArrayofArrays(csvdiscards);
         rentapByID[id] = [false,newrow];                      // false that it's discarded. it's now on newrow of rentaps
    // need to update all the rows of rentaps after the inserted one at newrow in rentaps and after deleted one at row in discards
         for (var nrow=discards.length-1; nrow>=row; nrow--) 
            rentapByID[Number(discards[nrow][22])] = [true,nrow];
         for (var nrow=rentaps.length-1; nrow>=newrow; nrow--) 
            rentapByID[Number(rentaps[nrow][22])] = [false,nrow];
      });
   }
});

var copyCSVButton = require("sdk/page-mod");
copyCSVButton.PageMod({
  include: [data.url("rentap.html*")],
  contentScriptWhen: 'end',
  contentScriptFile: data.url("copyCSVtextButton.js"),
  onAttach: function onAttach(worker) {
    worker.on('message', function(csvrentapstocopy) {
      clipboard.set(csvrentapstocopy);
    });
  }
});

var copySQLButton = require("sdk/page-mod");
copySQLButton.PageMod({
  include: [data.url("rentap.html*")],
  contentScriptWhen: 'end',
  contentScriptFile: data.url("copySQLtextButton.js"),
  onAttach: function onAttach(worker) {
    worker.on('message', function(sqltocopy) {
      clipboard.set(sqltocopy);
    });
  }
});

var loadData = require("sdk/page-mod");
loadData.PageMod({
   include: [data.url("rentapfirst.html*")],
   contentScriptWhen: 'ready',
   contentScriptFile: data.url("loadData.js"),        //loadData.js puts the whole ss database into sessionStorage
   onAttach: function onAttach(worker) {
      var rentaps = arrayofcsvToArrayofArrays(csvrentaps);
      var discards = arrayofcsvToArrayofArrays(csvdiscards);
      worker.postMessage([RHEADER,rentaps,discards,rentapByID]);
      tabs.activeTab.url = data.url("rentap.html");
   }
});

var startRentap = require("sdk/page-mod");
startRentap.PageMod({
   include: ["file://*"],
   contentScriptWhen: 'ready',
   contentScript: '',
   onAttach: function() {
     var regexp = RegExp("rentapstart\.html\$")
     if (regexp.test(tabs.activeTab.url))
        tabs.activeTab.url = data.url("rentapfirst.html");
   }
});



