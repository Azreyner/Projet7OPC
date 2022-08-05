function getRecipes(tabFiltre) {
    let tabArray = []

    //si il n'y a pas de filtre
    if(tabFiltre.length == 0){
        recipes.forEach(e => {
            tabArray.push(e)
        })
    }// sinon si il y a un ou plusieurs filtres
    else{
        recipes.forEach(recette => {
            //test = checkFiltreUstensil(tabFiltre, recette.ustensils)
            //console.log(test)
            if(!checkFiltreAppliance(tabFiltre, recette.appliance) || !checkFiltreUstensil(tabFiltre, recette.ustensils) || !checkElementIngredient(tabFiltre, recette.ingredients)){
                tabArray.push(recette)
            }
        })
    }  
    
    return tabArray;
}

// && !checkElementIngredient(tabFiltre, e.ingredients) && !checkFiltreUstensil(tabFiltre, e.ustensils)

//Pour les filtres, permet de voir si certains éléments de la recette ne contiennent pas ce qui doit être filtré
function checkFiltreAppliance(lesFiltres, appliance){
    valeurRetour = true;
    
    for (var i = 0; i < lesFiltres.length; i++) {
  
      if(lesFiltres[i] == appliance.toUpperCase()){
        valeurRetour = false
      }
  
    }
  
    return valeurRetour
}

function checkFiltreUstensil(lesFiltres, ustensils){
    valeurRetour = true;

    for (var i = 0; i < lesFiltres.length; i++) {

        ustensils.forEach(ustensil => {
            if(ustensil.toUpperCase() == lesFiltres[i]){
                valeurRetour = false
            }
      });
  
    }

    return valeurRetour;
}

function checkElementIngredient(lesFiltres, ingredients){
    valeurRetour = true;

    for (var i = 0; i < lesFiltres.length; i++) {
        
        ingredients.forEach(ingredient => {
        if(lesFiltres[i].toUpperCase() == ingredient.ingredient.toUpperCase()){
            valeurRetour = false;
          }
      });
  
    }
  
    return valeurRetour
}



// alimente liste recette
function buildRecipeBloc(laRecipe){

    const main = document.getElementById('main')
    // Création d'élement
    const blocRecipe = document.createElement('div');
    const descriptionRecipe = document.createElement('div');
    const headerDescription = document.createElement('div');
    const detailDescription = document.createElement('div');
    const titreRecipe = document.createElement('h4');
    const dureeRecipe = document.createElement('span');
    const listeIngredient = document.createElement('ul')
    const paragraphe = document.createElement('p');

    //Attributs
    blocRecipe.setAttribute("class", "blocRecipe")
    blocRecipe.setAttribute("id", laRecipe.name)
    descriptionRecipe.setAttribute("class", "descriptionRecipe")
    headerDescription.setAttribute("class", "headerDescription")
    detailDescription.setAttribute("class", "detailDescription")

    paragraphe.setAttribute("class", "paragraphe")

    //Placement
    blocRecipe.appendChild(descriptionRecipe)
    descriptionRecipe.appendChild(headerDescription)
    descriptionRecipe.appendChild(detailDescription)
    headerDescription.appendChild(titreRecipe)
    headerDescription.appendChild(dureeRecipe)
    detailDescription.appendChild(listeIngredient)
    detailDescription.appendChild(paragraphe)

    //Contenu
    titreRecipe.innerText = laRecipe.name;
    dureeRecipe.innerText = laRecipe.time + ' min';

    let htmlListe = "";
    laRecipe.ingredients.forEach(e => {
        if(e.unit != null && e.quantity != null){
            htmlListe += "<li><span>" + e.ingredient + ":</span> " + e.quantity + " " + e.unit + "</li>"
        }
        else if(e.quantity != null){
            htmlListe += "<li><span>" + e.ingredient + ":</span> " + e.quantity + "</li>"
        }
        else{
            htmlListe += "<li><span>" + e.ingredient + "</span></li>"
        }
    })

    listeIngredient.innerHTML = htmlListe;

    paragraphe.innerText = laRecipe.description

    main.appendChild(blocRecipe);
}