//Le main avec tout les blocs de recette
leMain = document.getElementById('main');
dropDownIngredients = document.getElementById('myDropdown ingredient');
dropDownUstensils = document.getElementById('myDropdown ustensiles');
dropDownAppliances = document.getElementById('myDropdown appareils')
let inputActif = false;
let elementAucuneRecette = document.getElementById("aucuneRecette")

filtresActifs = []


async function init(filtresActifs) {

  //on vide le main à chaque fois pour être sûr que la liste de recette ne se dédouble pas
  leMain.innerHTML = '';
  barreDeRecherche = document.getElementById('searchBar');

  // Récupère toutes les datas de recettes puis on construits les blocs recettes
  const dataRecipes = getRecipes(filtresActifs);

  Array.prototype.forEach.call(dataRecipes, recipe => {
    buildRecipeBloc(recipe)
  });

  if(!isPageEmpty()){

    if(!elementAucuneRecette.hasAttribute("id")){
      elementAucuneRecette.setAttribute("id", "aucuneRecette")
    }
    
    mettreAJourFiltre()
    inputRecherche(barreDeRecherche, true)

  }
  else{
    elementAucuneRecette.removeAttribute("id")
  }

}

function isPageEmpty(){
  
  let tabRecette = document.querySelectorAll(".blocRecipe")

  for (let i = 0; i < tabRecette.length; i++) {
    if(!tabRecette[i].hasAttribute("style")){
      return false
    }
    
  }
  return true
}

//Check si la recette est actuellement affiché dans sur le page, si oui return true
function checkerPresenceRecette(id){
  let listeRecette = document.querySelectorAll(".blocRecipe");
  let styleElement;
  

  for (let i = 0; i < listeRecette.length; i++) {
    
    styleElement = listeRecette[i].getAttribute('style');

    if(listeRecette[i].id === id && (styleElement == null || styleElement.includes('block') )){
      
      return true

    }
  }

  return false
}

//Check si le mot clé est actuellement présent de la liste des filtre actif, si oui return true
function checkerPresenceFiltre(element){
  
  element = element.toUpperCase();

  for (let i = 0; i < filtresActifs.length; i++) {
    
    if(filtresActifs[i] === element.toUpperCase()){
      return true
    }

  }

  return false
}


/* Quand l'utilisateur clique sur le dropdown */
function monDropdown(e) {
    e.nextElementSibling.classList.toggle("show");
    switch (e.classList) {
      case 'dropbtn bleu':
        document.getElementById("myDropdown ingredient").classList.toggle("show");
        break;
      case 'dropbtn rouge':
        document.getElementById("myDropdown ustensiles").classList.toggle("show");
        break;
      case 'dropbtn vert':
        document.getElementById("myDropdown appareils").classList.toggle("show");
        break;
      default:
        break;
    }
    
  }

function mettreAJourFiltre(){

  //On vide les dropDwon de filtres
  dropDownIngredients.innerHTML = '';
  dropDownUstensils.innerHTML = '';
  dropDownAppliances.innerHTML = '';

  //Recupère ensuite la datas des ingrédients, appareils et ustensils puis on construit les dropdowns avec ces données 
  dataIngredients = getIngredients();
  dataAppareils = getAppliances();
  dataUstensils = getUstensils();

  //console.log(filtresActifs)
  //console.log(element)
  

  //console.log(dataIngredients)
  /* fouiller les 3 data... pour nettoyer les filtres pris*/
  Array.prototype.forEach.call(dataIngredients, lIngredient => {
      buildDropDownIngredient(lIngredient)
    });
    
  Array.prototype.forEach.call(dataAppareils, appareil => {
      buildDropDownAppliances(appareil)
    });

  Array.prototype.forEach.call(dataUstensils, ustensil => {
    buildDropDownUstensils(ustensil)
  });

  }
  
  function filterFunction(lInput) {
    var input, filter, ul, li, a, i;
    input = lInput
    filter = input.value.toUpperCase();
    let div;
    if(lInput.classList.contains('bleu')){
      div = document.getElementById("myDropdown ingredient");
    } else if(lInput.classList.contains('rouge')){
      div = document.getElementById("myDropdown ustensiles");
    }
    else{
      div = document.getElementById("myDropdown appareils");
    }


    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

function checkDoubleValeur(leTableau, element){

  for (var i = 0; i < leTableau.length; i++) {

    if(leTableau[i].toUpperCase() == element.toUpperCase()){
      return true
    }

  }

  return false
}

/* SECTION BARRA DE RECHERCHE */

function inputRecherche(lInupt, isFromInit){
  let input = lInupt.value.toUpperCase();
  let listeRecette = document.querySelectorAll(".blocRecipe");
  
  if(!(input.length < 3)){
    inputActif = true;

    for(let x = 0; x < listeRecette.length; x++) {
      
      if(checkID(listeRecette[x], input) || checkDescription(listeRecette[x], input)  || checkIngredient(listeRecette[x], input)){
        if(listeRecette[x].hasAttribute("style")){
          listeRecette[x].removeAttribute("style");
        }
      }
      else{
        listeRecette[x].style.display = "none";
      }
    }
  }
  else if(input.length < 3 && inputActif == true){

    listeRecette.forEach(element => {
      if(element.hasAttribute("style")){
        element.removeAttribute("style");
      }
    })

  }

  if(!isFromInit){
    mettreAJourFiltre()
  }
  
  if(isPageEmpty()){
    
    elementAucuneRecette.removeAttribute("id")

  }else{
    if(!elementAucuneRecette.hasAttribute("id")){
      elementAucuneRecette.setAttribute("id", "aucuneRecette")
    }
  }

}

//On check si le titre de la recette contient les caractères de ce qu'il y a entré dans la barre de recherche
function checkID(element, input){

  if(element.id.toUpperCase().includes(input)){
    return true;
  }
  else{
    return false;
  }

}

//On check si les ingrédients de la recette contiennent les caractères de ce qu'il y a entré dans la barre de recherche
function checkIngredient(element, input){
  let listeIngredient = element.querySelectorAll('li');
  
  for (let x = 0; x < listeIngredient.length; x++) {
    if(listeIngredient[x].innerText.toUpperCase().includes(input.toUpperCase())){
      return true;
    }
    else{
      return false;
    }
  }

}

//On check si la description de la recette contient les caractères de ce qu'il y a entré dans la barre de recherche
function checkDescription(element, input){
  
  let descriptionElement = element.querySelector('.paragraphe');

  if(descriptionElement.textContent.toUpperCase().includes(input)){
    return true;
  }
  else{
    return false;
  }
  
}

/* FIN SECTION BARRE DE RECHERCHE */



/* SECTION FILTRE PAR MOT CLÉS */

//Fonction qui permet de créer le petit "bloc filtre" décoratif en plus de faire fonctionner le filtre.
function creerFiltre(event){

  let element = event
  
  
  //console.log(element)
  
  zoneFiltre = document.getElementById("zoneFiltre")
  blocFiltre = document.createElement("div")
  text = document.createElement("p")
  icone = document.createElement("i")
  
  couleurClass = element.parentNode.classList
  
  icone.setAttribute("class", "fa-regular fa-circle-xmark fa-xl");
  blocFiltre.setAttribute("class","blocFiltre")
  icone.setAttribute("onclick", "supprimerFiltre(this)")
  text.innerText = element.textContent;

  if(couleurClass.contains("bleu")){
    blocFiltre.style.backgroundColor = '#3282f7';
  }else if(couleurClass.contains("vert")){
    blocFiltre.style.backgroundColor = '#68d9a4';
  }else{
    blocFiltre.style.backgroundColor = '#ed6454';
  }
  
  zoneFiltre.appendChild(blocFiltre)
  blocFiltre.appendChild(text)
  blocFiltre.appendChild(icone)

  
  //On ajoute le filtre choisi dans le tableau de filtres actifs
  filtresActifs.push(element.textContent.toUpperCase())
  
  
  //console.log(filtresActifs)

  //On rappel la fonction init mais avec cette fois-ci le tableau contenenant le ou les filtres actifs (le tableau peut-être vide si on a supprimmer tout les filtres).
  //console.log(element)
  init(filtresActifs)
  
}

//On supprime un filtre et on reconstruit une liste de recette avec le filtre actualisé
function supprimerFiltre(event){

  for (var i = 0; i < filtresActifs.length; i++) {
    if (filtresActifs[i] === event.parentNode.textContent.toUpperCase()) {
      filtresActifs.splice(i, 1);
    }
  }
  event.parentNode.remove()
  init(filtresActifs)
}



//Lancement fonction INIT
init(filtresActifs);