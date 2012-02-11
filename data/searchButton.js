var butt = document.createElement("button");    //define button element
var btext = document.createTextNode("Search");  //define the text
butt.appendChild(btext);                        //attach text to the button

butt.addEventListener("click",                  //handle onclick event
   function(){   
      self.postMessage(document.getElementById('findname').value);     // sends search-box text to saveButton.PageMod worker
      self.on("message", function(CSV) {
         window.sessionStorage.setItem('csv', CSV[1]);
         window.sessionStorage.setItem('CSVi',CSV[0]);
         window.sessionStorage.setItem('mode','edit');
      });
   },
false);

document.getElementById("searchbutton").appendChild(butt); //put the button on the page
