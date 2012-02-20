var butt = document.createElement("button");    //define button element
var btext = document.createTextNode("Search");  //define the text
butt.appendChild(btext);                        //attach text to the button

butt.addEventListener("click",                  //handle onclick event
   function(){   
      var findname = document.getElementById('findname').value;
      if (findname === "") {
         self.postMessage("showAllNames");
      } else {
         self.postMessage(document.getElementById('findname').value);     // sends search-box text to saveButton.PageMod worker
         self.on("message", function(found) {
            if(typeof(found[1]) != 'undefined') {
               var RENTAP = found[1];  //save 1st found to be displayed right away
               window.sessionStorage.setItem('rentapJSON', JSON.stringify([RENTAP[1]])); //RENTAP[1] is the data to be displayed
               window.sessionStorage.setItem('rentapCSVi',RENTAP[0]); //RENTAP[0] is the row RENTAP[1] is on
               window.sessionStorage.setItem('rentapmode','edit');
               window.sessionStorage.setItem('rentapJSONfound',JSON.stringify(found)); //save so Choose Name can display found names
            }
         });
      }
   },
false);

document.getElementById("searchbutton").appendChild(butt); //put the button on the page
