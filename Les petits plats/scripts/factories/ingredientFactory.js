function getIngredients() {

    let tabArray = []

    recipes.forEach(e => {
        if(checkerPresenceRecette(e.name)){
            //console.log("YES")
            e.ingredients.forEach(element => {
                if(checkDoubleValeur(tabArray, element.ingredient) || checkerPresenceFiltre(element.ingredient)){
    
                }else{
                    tabArray.push(element.ingredient)
                }
            })
        }  
    })
    
    return tabArray;
}

function buildDropDownIngredient(lIngredient){
    // Création d'élement
    const aElement = document.createElement('a');
    const dropDown = document.getElementById('myDropdown ingredient')

    //aElement.setAttribute("onclick", "creerFiltre()")
    aElement.setAttribute("onclick", "creerFiltre(this)")
    aElement.setAttribute("href", "#"+lIngredient)
    aElement.innerText = lIngredient;

    dropDown.appendChild(aElement)
}