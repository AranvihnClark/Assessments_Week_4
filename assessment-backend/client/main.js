const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById(`fortuneButton`);
const languageOption = document.querySelector(`#select-list`);
const careerPath = document.getElementById(`career-path`);
const showLinksBtn = document.getElementById(`show-links-button`);
const hideLinksBtn = document.getElementById(`hide-links-button`);
const removeLanguage = document.querySelector(`#delete-input`);
const deleteBtn = document.getElementById(`delete-button`);
const submitChangesBtn = document.getElementById(`submit-changes-button`);
const selectOption = document.getElementById(`select-option`);
const replaceOption = document.getElementById(`replace-option`);

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data)
        })
        .catch(err => console.log(err));
}

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
    .then(res => {
        const data = res.data;
        alert(data);
    })
    .catch(err => console.log(err));
}

const addLanguage = (event) => {
    let langaugeDisplay = [];
    let selectedLanguage = languageOption.options[languageOption.selectedIndex].text;
    
    langaugeDisplay.push(selectedLanguage);

    axios.post("http://localhost:4000/api", langaugeDisplay)
        .then(res => {
            // Removes all child nodes in the display so we can recreate it.
            while (careerPath.hasChildNodes()){
                careerPath.removeChild(careerPath.firstChild)
            }

            // Removes all options in the replace section. We do this as well because it makes it easier to generate a proper list to select later.
            while (selectOption.hasChildNodes()){
                selectOption.removeChild(selectOption.firstChild)
            }

            // This creates the default 'choose here' option for the select option in the replace section later because we deleted it above. This is so that all languages can be properly selected.
            let defaultOption = document.createElement(`option`);
            defaultOption.selected = true;
            defaultOption.text = `Choose here`;
            selectOption.appendChild(defaultOption);
            
            // We are going to remove the language from our list of options in both the locations (the replace section and the add section). The reason we can do this is because they both have the same class so we can search via `.getElementsByClassName` to get an array that we can manipulate. We do this first so that we can properly add the same option to the select options list in the replace section of the webpage.
            let selectedOption = languageOption.options[languageOption.selectedIndex].className;
            const optionsToDelete = document.getElementsByClassName(selectedOption);

            // And here we are delete each child node that has said class name.
            while(optionsToDelete.length > 0){
                optionsToDelete[0].parentNode.removeChild(optionsToDelete[0]);
            }

            // We run a for loop to check all the objects in the array so that we can add all of it to the proper locations.
            for(let i = 0; i < res.data.length; i++) {
                // We delimit "language" so that we can use it easily later. We also create a new <p> element to be able to display the languages we want to learn and append it to the correct element to show them nice and neatly.
                const {language} = res.data[i];
                let newP = document.createElement(`p`);

                newP.innerHTML = `Language: ${language}`;
                careerPath.appendChild(newP);

                // Here we also add a new option in the select option in the replace section since it is a now a language in our learning path.
                let newOption = document.createElement(`option`);
                newOption.innerHTML = language;
                newOption.className = `${language.toLowerCase()}-option`;
                selectOption.appendChild(newOption);
            }            
        })
        .catch(err => console.log(err));
}

const showLinks = () => {
    axios.get("http://localhost:4000/api")
        .then(res => {
            // This will look a lot like above as we are just going to flush the old data, repeat what we did above, but also include a link to learn the language that we selected.
            while (careerPath.hasChildNodes()){
                careerPath.removeChild(careerPath.firstChild)
            }

            for(let i = 0; i < res.data.length; i++) {
                const {language, link} = res.data[i];

                // Creating two <p> elements; one for the language itself and one for the link for that language.
                let newP = document.createElement(`p`);
                let newPLink = document.createElement(`p`);

                newPLink.innerHTML = `Link: ${link}`;
                newP.innerHTML = `Language: ${language}`;

                newP.appendChild(newPLink);
                careerPath.appendChild(newP);
            }
        })
        .catch(err => console.log(err));
}

const hideLinks = () => {
    axios.get("http://localhost:4000/api")
        .then(res => {
            // This is basically exactly the same as the above but without the link being shown - which, of course, means it is basically the same as the addLanguage function above, but without us needing to add anything.
            while (careerPath.hasChildNodes()){
                careerPath.removeChild(careerPath.firstChild)
            }

            for(let i = 0; i < res.data.length; i++) {
                const {language} = res.data[i];
                let newP = document.createElement(`p`);

                newP.innerHTML = `Language: ${language}`;
                careerPath.appendChild(newP);
            }
        })
        .catch(err => console.log(err));
}

const deleteLanguage = () => {
    // First we grab the name of the language we inputted and store it into an array so we can later search for the correct language in our database.
    let selectedLanguage = removeLanguage.value;
    axios.delete(`http://localhost:4000/api/${selectedLanguage}`)
    .then(res => {

        // Like always, we flush the old data so we can display the correct data after we remove the language we entered out of our database.
        while (careerPath.hasChildNodes()){
            careerPath.removeChild(careerPath.firstChild)
        }

        let removeInSelect = document.getElementsByClassName(`${selectedLanguage.toLowerCase()}-option`);

        while(removeInSelect.length > 0){
            removeInSelect[0].parentNode.removeChild(removeInSelect[0]);
        }
        // const optionsToDelete = document.getElementsByClassName(selectedOption);

        // while(optionsToDelete.length > 0){
        //     optionsToDelete[0].parentNode.removeChild(optionsToDelete[0]);
        // }

        // A for loop is ran to find to display the list of our languages to learn minus what we just deleted.
        for(let i = 0; i < res.data.length; i++) {
            const {language} = res.data[i];
            let newP = document.createElement(`p`);

            newP.innerHTML = `Language: ${language}`;
            careerPath.appendChild(newP);
        }

        // Now, we have to add that language we deleted back into the list of what we can add to learn, if we want to select that language again as something we want on our learning path. We create two options because an option can only be appended to one child at a time.
        let optionToAdd1 = document.createElement(`option`);
        let optionToAdd2 = document.createElement(`option`);
        
        optionToAdd1.innerHTML = selectedLanguage;
        optionToAdd2.innerHTML = selectedLanguage;

        optionToAdd1.className = `${selectedLanguage.toLowerCase()}-option`;
        optionToAdd2.className = `${selectedLanguage.toLowerCase()}-option`;

        languageOption.appendChild(optionToAdd1);
        replaceOption.appendChild(optionToAdd2);
    })
    .catch(err => console.log(err));
}

const replaceLanguage = () => {
    let selectLanguage = selectOption.value;
    let removeLanguage = replaceOption.value;
    let selectedLanguages = [selectLanguage, removeLanguage];
    axios.put(`http://localhost:4000/api/${selectedLanguages}`)
    .then(res => {
        // As always, we flush the list in order to show the new list.
        while (careerPath.hasChildNodes()){
            careerPath.removeChild(careerPath.firstChild)
        }

        // Here we remove all options to have the selected class name for our language.
        let removeInPath = document.getElementsByClassName(`${selectLanguage.toLowerCase()}-option`);
        while(removeInPath.length > 0){
            removeInPath[0].parentNode.removeChild(removeInPath[0]);
        }

        // We are doing the same as the above but for the selected class name we are replacing the above with.
        let addInPath = document.getElementsByClassName(`${removeLanguage.toLowerCase()}-option`);
        while(addInPath.length > 0){
            addInPath[0].parentNode.removeChild(addInPath[0]);
        }

        for(let i = 0; i < res.data.length; i++) {
            const {language} = res.data[i];
            let newP = document.createElement(`p`);

            newP.innerHTML = `Language: ${language}`;
            careerPath.appendChild(newP);
        }
        // Here we will add the correct options to their corresponding selections so they may once again be selected.
        let optionToAddSelect = document.createElement(`option`);
        let optionToAddReplace = document.createElement(`option`);
        let optionToAddAdd = document.createElement(`option`);
        
        optionToAddSelect.innerHTML = removeLanguage;
        optionToAddReplace.innerHTML = selectLanguage;
        optionToAddAdd.innerHTML = selectLanguage;

        optionToAddSelect.className = `${removeLanguage.toLowerCase()}-option`;
        optionToAddReplace.className = `${selectLanguage.toLowerCase()}-option`;
        optionToAddAdd.className = `${selectLanguage.toLowerCase()}-option`;

        languageOption.appendChild(optionToAddAdd);
        selectOption.appendChild(optionToAddSelect);
        replaceOption.appendChild(optionToAddReplace);
    })
    .catch(err => console.log(err));
}

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener(`click`, getFortune);
languageOption.addEventListener(`change`, addLanguage);
showLinksBtn.addEventListener(`click`, showLinks);
hideLinksBtn.addEventListener(`click`, hideLinks);
deleteBtn.addEventListener(`click`, deleteLanguage);
submitChangesBtn.addEventListener(`click`, replaceLanguage);