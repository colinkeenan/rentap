var butt = document.createElement("button");    //define button element
var btext = document.createTextNode("Jump");  //define the text
butt.appendChild(btext);                        //attach text to the button

butt.addEventListener("click",                  //handle onclick event
   function(){
      var jumptorow = document.getElementById("rownumber").value
      self.postMessage(jumptorow); //first tell worker what to jump to
      self.on("message", function(rentap) {  //then worker returns the data to be displayed
         if (rentap != "error") {
            window.sessionStorage.setItem("rentapJSON", JSON.stringify(rentap));
            window.sessionStorage.setItem('rentapCSVi',jumptorow);
            window.sessionStorage.setItem('rentapmode','edit');
         }
      }); 
   },
false);

document.getElementById("jumpbutton").appendChild(butt); //put the button on the page
