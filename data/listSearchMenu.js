var searchSel = document.createElement("select");
var chooseName = document.createElement("option");
chooseName.text = "Choose Name";
searchSel.add(chooseName, null);
document.getElementById("listsearchmenu").appendChild(searchSel); //put the dropdown menu list on the page

var JSONfound = window.sessionStorage.getItem('rentapJSONfound'); //stringified form array of arrays
if(JSONfound != null) var found = JSON.parse(JSONfound); //back to actual array of arrays
   else var found = [['none']]
   
self.on("message", function(rentap) {
   if(found[0][0] === "none") {
      while (searchSel.length < rentap.length) {     //Everytime the page is refreshed, and there's no found names, populate
         var namei = document.createElement("option"); //the search dropdown list from rentap that came from the worker
         var i = searchSel.length;                 //which contains all the applications
         var rentapfieldi = rentap[i] 
         var fullnamei = rentapfieldi[0]
         namei.text = fullnamei;
         namei.value = i;
         searchSel.add(namei, null);
      };
   } else {
      while (searchSel.length < found.length) {
         var namei = document.createElement("option");
         var i = searchSel.length;
         var rentapfieldi = found[i][1];       
         var fullnamei = rentapfieldi[0]
         namei.text = fullnamei;
         namei.value = found[i][0];
         searchSel.add(namei, null);
      }
   }
});

searchSel.onchange = 
   function(){
      self.postMessage('click'); //tell worker about click so worker can give back rentap
      self.on("message", function(rentap) {
         var i = searchSel.selectedIndex;
         var j = searchSel.options[i].value;
         window.sessionStorage.setItem("rentapJSON",JSON.stringify([rentap[j]]));
         window.sessionStorage.setItem('rentapCSVi',j);
         window.sessionStorage.setItem('rentapmode','edit');
         self.postMessage(''); //tell worker to refresh the page, displaying the newly selected application
      });
   }



