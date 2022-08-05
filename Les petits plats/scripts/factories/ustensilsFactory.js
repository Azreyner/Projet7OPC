function getUstensils() {
    let tabArray = []
    recipes.forEach(e => {
        e.ustensils.forEach(element => {
            //recipes.forEach(e => {
                if(checkerPresenceRecette(e.name)){
                    if(checkDoubleValeur(tabArray, element) || checkerPresenceFiltre(element)){
        
                    }else{
                        tabArray.push(element)
                    }
                }
                
            //})
        })
        
    })
    
    return tabArray;
}

function buildDropDownUstensils(ustensile){
    // Création d'élement
    const aElement = document.createElement('a');
    const dropDown = document.getElementById('myDropdown ustensiles')
    
    aElement.setAttribute("href", "#"+ustensile)
    aElement.setAttribute("onclick", "creerFiltre(this)")
    aElement.innerText = ustensile;

    dropDown.appendChild(aElement)
}