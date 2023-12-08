const parserExam = require('./parserExam');//appel du parser
const fs = require("fs");
const readlineSync = require("readline-sync");


//=============================choisir un fichier=========================================//

let exam1;

// Récupérer la liste des fichiers disponibles dans le répertoire
const examfile = fs.readdirSync('./exam'); // Le chemin du répertoire où se trouvent ses propres fichiers
const examfile2 = fs.readdirSync('./SujetB_data'); // Le chemin du répertoire où se trouvent ses propres fichiers

// Afficher les fichiers disponibles à l'utilisateur
console.log('Fichiers disponibles :');

const allFiles = [...examfile, ...examfile2]; // Concaténation des deux tableaux

console.log('Fichiers disponibles :');
allFiles.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
});


// Demander à l'utilisateur de choisir le premier fichier
let choix = readlineSync.questionInt('Choisissez un premier fichier en entrant son numéro : ');

// Vérifier si le choix est valide
if (choix > 0 && choix <= allFiles.length) {
    exam1 = allFiles[choix - 1];
    console.log(`Vous avez choisi : ${exam1}\n`);
} else {
    console.log('Choix invalide');
}

console.log(exam1);


//================================fonction pour récupérer le fichier=======================//

const isValid = function(file) {

    const list = parserExam(file);

    let bool = false;

    if(list.length >=15 && list.length <= 20){
        bool = true;
    }

//================================verifier les doublons=======================//

    let isUnique = true;
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i].name === list[j].name && list[i].answer === list[j].answer && list[i].type === list[j].type) {
                isUnique = false;
                break;
            }
        }
        if (!isUnique) {
            break;
        }
    }

    if (!isUnique) {
        console.log("L'examen contient des doublons de questions.");
    }


    return bool && isUnique;

}

//========================================verifier la fichier====================================//
let test;

// Vérification en fonction du chemin du fichier choisi
if (exam1.startsWith('exam')) {
    test = isValid('./exam/'+exam1);
} else {
    test = isValid('./SujetB_data/'+exam1);
}

// Affichage du résultat

if(test){
    console.log("Le fichier est valide");
}else {
    console.log("Le fichier n'est pas valide");
}


