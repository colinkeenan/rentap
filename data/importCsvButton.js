var butt = document.createElement("button");    //define button element
var btext = document.createTextNode("Import CSV");  //define the text
butt.appendChild(btext);                        //attach text to the button

butt.addEventListener("click",                  //handle onclick event
   function(){
      var rentapcsv = document.getElementById("csv").value
      self.postMessage(rentapcsv); //first give worker the csv information to be converted to an array
      self.on("message", function(rentap) {  //then worker returns the data to be displayed
         window.sessionStorage.setItem("rentapJSON", JSON.stringify(rentap));
      }); 
   },
false);

document.getElementById("importCsvButton").appendChild(butt); //put the button on the page
