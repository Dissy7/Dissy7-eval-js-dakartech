let taches = [];
const formulaire =  document.getElementById("formulaire");
const saisie = document.getElementById("tache");
const liste = document.getElementById("maliste");
const compteur = document.getElementById("compteur");
formulaire.addEventListener("submit", function(event){
    event.preventDefault();
    const text = saisie.value.trim();
    if(text !== ""){
        const nouvelleTache = {texte: text , terminee: false};
        taches.push(nouvelleTache);
        afficherListe();
        compteurAJour();
        saisie.value = "";
    }
});
function afficherListe(){
    liste.innerHTML = "";
    for(let i = 0; i < taches.length; i++){
        const tache = taches[i];
        const newElement = document.createElement("li");
        const cocher = document.createElement("input");
        cocher.type = "checkbox";
        cocher.checked = tache.terminee;
        cocher.addEventListener("change", function(){
            tache.terminee = cocher.checked;
            afficherListe();
            compteurAJour();
        });
        const texteTache = document.createElement("span");
        texteTache.textContent = tache.texte;
        if(tache.terminee){
            texteTache.classList.add("completed");
        }
        const supprimer = document.createElement("button");
        supprimer.textContent = "Supprimer";
        supprimer.addEventListener("click", function(){
            supprimerTache(i);
        });
        newElement.appendChild(cocher);
        newElement.appendChild(texteTache);
        newElement.appendChild(supprimer);
        liste.appendChild(newElement);
    }
}
function supprimerTache(index){
    taches.splice(index,1);
    afficherListe();
    compteurAJour();
}
function compteurAJour(){
    const tachesNonTerminees = taches.filter(tache => !tache.terminee).length;
    compteur.textContent = tachesNonTerminees;
}