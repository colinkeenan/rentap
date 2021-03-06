var buttons = require('sdk/ui/button/action');
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
'\nfor # months/years","Company or Person that evicted you in Month/Year from Address, City, ST  Zip","Offense, County, State, Date, D.O.C. ID, and, if currently on parole/probation, include P.O. name and phone number.","mo/dy/year","","","","","Instructions by Example"'];

//initialize csvrentaps[0] to be an instruction page for renters to refer to when filling out an application
if(typeof(ss.storage.csv) === 'undefined') ss.storage.csv = INITcsv;

if(typeof(ss.storage.RHEADER) === 'undefined') 
  ss.storage.RHEADER = [["enter rental address","enter city, state, zip","enter title","enter header name"]];

if(typeof(ss.storage.trash) === 'undefined') 
  ss.storage.trash = [0];

var csvrentaps = ss.storage.csv;
var RHEADER = ss.storage.RHEADER;
var trash= ss.storage.trash;

var CSV = require('./ucsv-1.1.0'); //UCSV v1.1.0 Provided under MIT License. Copyright 2010-2012, Peter Johnson http://www.uselesscode.org/javascript/csv/

function arrayofcsvToArrayofArrays(arrayofcsv) {
   var INITARRAY = [[]];
   var arrayofArrays = [[]];
   if (typeof(arrayofcsv) != 'undefined') {
      for(var i=0; i<arrayofcsv.length; i++) {
         if (typeof(arrayofcsv[i]) === 'string') {
            arrayofArrays[i] = CSV.csvToArray(arrayofcsv[i])[0];
         } else if (i == 0) {
               arrayofArrays = CSV.csvToArray(INITcsv)[0];
         } else {
            arrayofArrays[i] = [null];
         }
      }
   } else {  
      arrayofArrays = INITcsv;
   }
   if (arrayofArrays === INITARRAY)
      arrayofArrays = INITcsv;
   return arrayofArrays;
}

function copyArray(source,destination) {
   var i = source.length;
   var j = destination.length;
   if (i<j) destination.splice(i,j-i);
   while (i--) destination[i] = source[i];
}

var loadData = require("sdk/page-mod");
loadData.PageMod({
   include: [data.url("rentapfirst.html*")],
   contentScriptWhen: 'ready',
   contentScriptFile: data.url("loadData.js"),        //loadData.js puts the whole ss database into sessionStorage
   onAttach: function onAttach(worker) {
      var rentaps = arrayofcsvToArrayofArrays(csvrentaps);
      worker.postMessage([RHEADER,rentaps,trash]);
      tabs.activeTab.url = data.url("rentap.html");
   }
});

var saveButton = require("sdk/page-mod");
saveButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("saveButton.js"),   
   onAttach: function onAttach(worker) {
      worker.on('message', function(argArr) { // argArr is [mode,id,rentap]
         if(argArr[0] === 'edit') {
            csvrentaps[argArr[1]] = CSV.arrayToCsv([argArr[2]]); 
         } else {
            csvrentaps.push(CSV.arrayToCsv([argArr[2]]));
         }
      });
   }
});

var delRentapButton = require("sdk/page-mod");
delRentapButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("delRentapButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(id) {
         if(id===csvrentaps.length-1) csvrentaps.splice(id,1);
         else csvrentaps[id] = null; //Not splicing it because want to preserve all the ID's
         trash.splice(trash.indexOf(id),1); //Easier navigation of trash if remove ID of deleted rentap
      })
   }
});

var discardButton = require("sdk/page-mod");
discardButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("discardButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(newtrash) {
         copyArray(newtrash,trash);
      });
   }
});

var restoreButton = require("sdk/page-mod");
restoreButton.PageMod({
   include: [data.url("rentap.html*")],
   contentScriptWhen: 'end',
   contentScriptFile: data.url("restoreButton.js"),
   onAttach: function onAttach(worker) {
      worker.on('message', function(newtrash) { 
         copyArray(newtrash,trash);
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


var button = buttons.ActionButton({
  id: "rentap-link",
  label: "Start Rental Application Extension",
  icon: {
    "32": "./icon.png",
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open(data.url("rentapfirst.html"));
}
