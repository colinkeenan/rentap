var butt = document.createElement("button");    //define button element
var btext = document.createTextNode("Jump");  //define the text
butt.appendChild(btext);                        //attach text to the button

butt.addEventListener("click",                  //handle onclick event
   function(){
      var jumptorow = document.getElementById("rownumber").value
      self.postMessage(jumptorow); //first tell worker what to jump to
      self.on("message", function(csv) {  //then worker returns the data to be displayed
         if (csv != "error") {
            window.sessionStorage.setItem('csv', csv);
            window.sessionStorage.setItem('CSVi',jumptorow);
            window.sessionStorage.setItem('mode','edit');
         }
      }); 
   },
false);

document.getElementById("jumpbutton").appendChild(butt); //put the button on the page
