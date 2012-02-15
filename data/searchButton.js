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
         self.on("message", function(foundnames) {
            var CSV = foundnames[1]
            window.sessionStorage.setItem('csv', CSV[1]);
            window.sessionStorage.setItem('CSVi',CSV[0]);
            window.sessionStorage.setItem('mode','edit');
            var i=1;
            var names = "";
            var rows = "";
            while(i<foundnames.length) {
               var CSV = foundnames[i];
               
               rows = rows + CSV[0] + ",";
               
               var csvfield = CSV[1].split("\"\,\"")
               var fullname = csvfield[0].slice(1)
               names = names + fullname + ",";
               
               i++;
            }
            rows = rows.slice(0,rows.indexOf("\,!"));
            names = names.slice(0,names.indexOf("\,!"));
            window.sessionStorage.setItem('foundrows',rows);
            window.sessionStorage.setItem('foundnames',names);
         });
      }
   },
false);

document.getElementById("searchbutton").appendChild(butt); //put the button on the page
