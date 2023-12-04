const QUESTION = require('./QUESTION');
const parser = require('./parser');
const listQuestion = parser();
const readline = require('readline');
const fs = require('fs');


//interface utilisateur
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Affiche l'ensemble des actions qu'il peut effectuer
r1.question("Que voulez vous faire?\n\
1.creer un examen\n 2.Lister les questions disponibles\n \
3.Ajouter une question à un examen\nEntrez le numero de l'action que vous voulez \
effectuer: ",(answer) => {
    switch(answer){
        case '1':
            //recuperer le nom du fichier qu'ellesouhaite creer
            r1.question("Entrer le nom du fichier d'examen", (nomFichier) =>{
                nomFichier = nomFichier + '.gift'
                fs.writeFileSync(nomFichier,'');
                r1.close();
            })
             break;
        case '2': 
        //afficher la liste des questions
        let i=1;
        for(question in listQuestion){
            console.log("Question n°"+i+": "+listQuestion[i-1]);
            i++;
        }
        r1.close();
        break;
        case '3':
            r1.question("Entrer le numero de la question à ajouter", (numQuestion) =>{
                //recuperer le nom du fichier
                //nomFichier = nomFichier + '.gift'
                r1.question('entrer le nom du fichier', (nom2) => {
                    nom2 = nom2 + '.gift'
                    fs.writeFileSync(nom2,listQuestion[parseInt(numQuestion)].toString());
                    r1.close();
                })
    
            })
        break;
    }
})
