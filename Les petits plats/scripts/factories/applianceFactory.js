function getAppliances() {
    let tabArray = []
    recipes.forEach(e => {
        if(checkerPresenceRecette(e.name)){
            
            if(checkDoubleValeur(tabArray, e.appliance) || checkerPresenceFiltre(e.appliance)){

            }else{
                tabArray.push(e.appliance)
            }
        }
        
    })
    
    return tabArray;
}

function buildDropDownAppliances(appliance){
    // Création d'élement
    const aElement = document.createElement('a');
    const dropDown = document.getElementById('myDropdown appareils')

    aElement.setAttribute("href", "#"+appliance)
    aElement.setAttribute("onclick", "creerFiltre(this)")
    aElement.innerText = appliance;

    dropDown.appendChild(aElement)
}