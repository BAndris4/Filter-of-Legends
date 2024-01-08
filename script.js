function sorting(final){
    filtered = []
    for (let i=1; i<final.length; i++){
        good = 0;
        for (let j=0; j<final[i].length; j++){
            
            if (j == 1 || j == 2){
                if ((filter[j] == "All") || (final[i][j].includes(filter[j]))){
                    good += 1;
                }
            }
            
            else {
                if ((filter[j] == "All") || (filter[j] == final[i][j])){
                    good += 1;
                }
            }
        }
        if (good == final[i].length){
            filtered.push(final[i]);
        }
    }
    new_filtered = []
    for (let i = 0; i<filtered.length-1;i++){
        new_filtered[i]=filtered[i];
    }
    return new_filtered;
}

function write_into(filtered){
    var images = [];
    for (let i=0; i<filtered.length; i++) {
        images[i] = document.createElement("img");
    }
    var source = document.getElementById("champborder");
    console.log(source);
    source.innerHTML = "";
    for (let i = 0; i<filtered.length; i++){
        images[i].src = "champs/"+filtered[i][0]+"Square.png";
        source.appendChild(images[i]);
    }
}
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
        //filter = [hero, role, location, tjdd, wtg, sotr, iat, ih, wp, wgoh, goh, nth, htp, ihuitn]
        filter = ["All", "All", "All", "All", "All", "All", "All", "All", "All", "All", "All", "All", "All", "All"]
        filtered = sorting(final);
        write_into(filtered);
        const optionMenus = document.querySelectorAll(".select-menu");

        optionMenus.forEach((optionMenu, index) => {
            const selectBtn = optionMenu.querySelector(".select-btn");
            const options = optionMenu.querySelectorAll(".option");
            const sBtn_text = optionMenu.querySelector(".sBtn-text");

            selectBtn.addEventListener("click", () => {
                optionMenus.forEach((menu, i) => {
                    if (i !== index) {
                        menu.classList.remove("active");
                    }
                });

                optionMenu.classList.toggle("active");
            });

            options.forEach(option => {
                option.addEventListener("click", () => {
                    let selectedOption = option.querySelector(".option-text").innerText;
                    filter[index+1] = selectedOption;
                    sBtn_text.innerText = selectedOption;
                    optionMenu.classList.remove("active");
                    filtered = sorting(final);
                    write_into(filtered);
                });
            });
        });


        const checkboxes = document.querySelectorAll('.checkbox input[type="checkbox"]');

        // Add event listener to each checkbox
        checkboxes.forEach((checkbox, index) => {
            checkbox.addEventListener('click', () => {
                if (checkbox.checked) {
                    filter[index+3] = "1";
                } else {
                    filter[index+3] = "All";
                }
                console.log(filter);
                filtered=sorting(final);
                console.log(filtered);
                write_into(filtered);
            });
        });

        
    });
