var searchSel = document.createElement("select");
var chooseName = document.createElement("option");
chooseName.text = "Choose Name";
searchSel.add(chooseName, null);
document.getElementById("listsearchmenu").appendChild(searchSel); //put the dropdown menu list on the page
var foundrowsCSV = window.sessionStorage.getItem("foundrows")
var foundnamesCSV = window.sessionStorage.getItem("foundnames")
if(foundrowsCSV != null) var foundrows = foundrowsCSV.split("\,");
   else var foundrows = ["0"];
if(foundnamesCSV != null) var foundnames = foundnamesCSV.split("\,");
   else var foundnames = ["none"];
self.on("message", function(csv) {
   if(foundnames[0] === "none") {
      while (searchSel.length < csv.length) {     //Everytime the page is refreshed, and there's no foundnames, populate
         var namei = document.createElement("option"); //the search dropdown list from csv that came from the worker
         var i = searchSel.length;                 //which contains all the applications
         var csvfieldi = csv[i].split("\"\,\"")
         var fullnamei = csvfieldi[0].slice(1)
         namei.text = fullnamei;
         namei.value = i;
         searchSel.add(namei, null);
      };
   } else {
      while (searchSel.length <= foundnames.length) {
         var namei = document.createElement("option");
         var i = searchSel.length-1;
         namei.text = foundnames[i];
         namei.value = foundrows[i];
         searchSel.add(namei, null);
      }
   }
});

searchSel.onchange = 
   function(){
      self.postMessage('click'); //tell worker about click so worker can give back csv
      self.on("message", function(csv) {
         var i = searchSel.selectedIndex;
         var j = searchSel.options[i].value;
         window.sessionStorage.setItem("csv",csv[j]);
         window.sessionStorage.setItem('CSVi',j);
         window.sessionStorage.setItem('mode','edit');
         self.postMessage(''); //tell worker to refresh the page, displaying the newly selected application
      });
   }



