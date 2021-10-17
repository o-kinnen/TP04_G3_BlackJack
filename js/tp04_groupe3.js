"use strict";
let cards = [];		
let player = [];		
let ia = [];
let value;		
let sumPlayer = 0;		
let sumIa = 0;	
let index;
let indexSupprimer;
let myWindow;

/**
* Fonction qui initialise le lot de carte pour la partie de 32 cartes de 4 groupes allant de 1 à 8
* (Cette fonction n'a pas de paramètre)
* @return {Number[]} un array de nombre des cartes valant entre 1 à 8 pour 4 groupes
*/

function generateCards(){
    for (let i = 1; i < 33; i++){
        if (i < 9){		
            cards.push(i);		//Affecte la valeur de 1 à 8 du 1er groupe de carte
        }
        else if (i < 17){		
            cards.push(i - 8);		//Affecte la valeur de 1 à 8 du 2ème groupe de carte
        }
        else if (i < 25){		
            cards.push(i - 16);		//Affecte la valeur de 1 à 8 du 3ème groupe de carte
        }
        else{		
            cards.push(i - 24);		//Affecte la valeur de 1 à 8 du 4ème groupe de carte
        }
    }
	console.log("Cartes disponibles : " + cards);
    return cards;
}
generateCards();

/**
* Fonction qui donne 2 cartes aléatoires au joueur et à l'ordinateur,
* calcule la somme des valeurs des cartes déjà distribuées pour chaque joueur
* tire une carte continuellement pour l'ordinateur tant qu'il est en dessous de 12
* (Cette fonction n'a pas de paramètre)
* @return {Number[]} un array de nombre des cartes tirées par le joueur
*         {Number[]} un array de nombre des cartes tirées par l'ordinateur	
*         {Number||String[]} un array de nombre ou de string qui indique les cartes restantes      
*         {Number} un nombre qui est la somme des valeurs des cartes du joueur
*         {Number} un nombre qui est la somme des valeurs des cartes de l'ordinateur
*/

function initialCall(){
    for (let i = 0; i < 2; i++){ // Boucle pour le joueur (pioche 2 cartes aléatoire)
        sumPlayer +=  ajouteCarte(player);
    }
    console.log("Main du joueur : " + player);
    console.log("Somme du joueur : " + sumPlayer);


    for (let i = 0; i < 2; i++){ // Boucle pour l'IA (pioche 2 cartes aléatoire)
        sumIa += ajouteCarte(ia);
    }
    console.log("Main de l'IA : " + ia);
    console.log("Somme de l'IA : " + sumIa);

    if (sumIa <= 6) { // Si la somme de l'IA vaut 7 ou moins, il va piocher 3 cartes
        for (let i = 0; i < 3; i++){
            sumIa += ajouteCarte(ia);
        }
        console.log("Main de l'IA : " + ia);
        console.log("Somme de l'IA : " + sumIa);

    } 
	else if (sumIa <= 9){ // Si la somme de l'IA est entre 7 et 9 compris, il va piocher 2 cartes
        for (let i = 0; i < 2; i++) {
            sumIa += ajouteCarte(ia);
        }
        console.log("Main de l'IA : " + ia);
        console.log("Somme de l'IA : " + sumIa);

    } 
	else if (sumIa <= 12){ // Si la somme de l'IA est entre 10 et 12 compris, il va piocher 1 carte
        sumIa += ajouteCarte(ia);
        console.log("Main de l'IA : " + ia);
        console.log("Somme de l'IA : " + sumIa);
    }
	return (player, ia, cards, sumPlayer, sumIa);
}
initialCall();

/**
* Fonction qui tire une carte pour le joueur ou de l'ordinateur au hasard et l'ajoute à son jeu,
* @param {Number[]} un array de nombre du jeu du joueur ou de l'ordinateur
* @return {Number} un nombre qui est la valeur de la carte tirée
*/

function tirer(){
    sumPlayer += ajouteCarte(player); 	// Ajoute la valeur de la carte dans la somme du joueur
    console.log("Main du joueur : " + player);
    console.log("Somme du joueur : " + sumPlayer);
    console.log("Reste des cartes disponibles : " +cards);
    return sumPlayer;
}


/**
* Fonction qui tire une carte pour le joueur ou de l'ordinateur au hasard et l'ajoute à son jeu,
* @param {Number[]} un array de nombre du jeu du joueur ou de l'ordinateur
* @return {Number} un nombre qui est la valeur de la carte tirée
*/

function ajouteCarte(deck){
    index = Math.floor(Math.random() * cards.length);
    value = cards[index]; // Prend la valeur de l'index et la met dans la variable valuePlayer
    deck.push(value); // Met la valeur dans le tableau main
    indexSupprimer = cards.splice(index, 1); // Supprime l'index du tableau
    return value; 
}

/**
* Fonction qui compare le jeu de l'ordinateur et du joueur dès que celui-ci décide de passer  et affiche les résultats au joueur
* (Cette fonction n'a pas de paramètre et ne retourne rien)
*/

function stopCarte(){
	console.log("Somme finale du joueur " + sumPlayer);
	console.log("Somme finale de l'IA " + sumIa);
	if (sumPlayer <= 17 && sumIa <= 17){
		if (sumPlayer > sumIa){
			alert("Félicitation ! Vous avez remporté la partie !");
		}
		else if (sumIa > sumPlayer){
			alert("Dommage ! Vous avez perdu la partie !");
		}
		else{
			alert("Egalité !");
		}
	}
	else if (sumPlayer > 17 && sumIa <= 17){
		alert("Dommage ! Vous avez perdu la partie !");
	}
	else if (sumIa > 17 && sumPlayer <= 17){
		alert("Félicitation ! Vous avez remporté la partie !");
	}
	else{
		alert("Vous avez tout les deux perdus !");
	}
}

/**
* Ferme la fenêtre du jeu pour quitter
* (Cette fonction n'a aucun paramètre et ne retourne rien)
*/

function closeWin(){
  myWindow = window.close("tp04_groupe3.html");  
}

/**
* Relance une nouvelle partie
* (Cette fonction n'a aucun paramètre et ne retourne rien)
*/

function newGame(){
	location.reload();
}
