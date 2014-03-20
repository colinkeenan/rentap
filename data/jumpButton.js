//in sessionStorage:
//   rentapRHEADERJSON (array of rentap headers)
//   rentapRHEADERi    (index of last header used)
//   rentapcsvJSON     (array of rentap applications as csv)
//   rentaprow         (index of last application displayed)

function jumpButton(){
   var csv = JSON.parse(window.sessionStorage.getItem("rentapcsvJSON"));
   var jumptorow = document.getElementById("rownumber").value;
   var rentap = CSV.csvToArray(csv[jumptorow]);
   if (jumptorow<=csv.length-1 && jumptorow>=0) {
      window.sessionStorage.setItem("rentapJSON", JSON.stringify(rentap));
      window.sessionStorage.setItem('rentapCSVi',jumptorow);
      window.sessionStorage.setItem('rentapmode','edit');
   }
}
