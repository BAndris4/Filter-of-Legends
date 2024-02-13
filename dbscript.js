filePath = "champdata.txt"
fetch(filePath)
    .then(response => response.text())
    .then(data => {
        var read_array = data.split("\n");
        var final = [];
        for (let i = 0; i<read_array.length; i++){
            final.push(read_array[i].split("\t"))
        }
        for (let i = 0; i<final.length; i++){
            if (final[i][13]=="1\r"){
                final[i][13]="1";
            }
            else if (final[i][13]=="0\r"){
                final[i][13]="0";
            }
        }
         var table = document.createElement("table");
         table.border = "1";
         
         var headerRow = table.insertRow(0);
         for (let i = 0; i < final[0].length; i++) {
             var headerCell = headerRow.insertCell(i);
             headerCell.innerHTML = final[0][i];
         }
 
         for (let i = 1; i < final.length-1; i++) {
             var row = table.insertRow(i);
             for (let j = 0; j < final[i].length; j++) {
                 var cell = row.insertCell(j);
                 if (j==0){
                    console.log(final[i][j])
                    kep = document.createElement("img");
                    kep.src = "champs/"+final[i][0]+"Square.png";
                    kep.title = final[i][j];
                    cell.innerHTML = final[i][j];
                    cell.appendChild(kep);
                    
                 }
                 else if (final[i][j]=="0") {
                    if (j==2) {
                        cell.innerHTML = "None";
                    }
                    else {
                        cell.innerHTML = "";
                    }
                 } 
                 else if (final[i][j]=="1") {
                    cell.innerHTML = "+";
                 }
                 else {
                    cell.innerHTML = final[i][j];
                 }
             }
         }
 
         document.body.appendChild(table);
    })