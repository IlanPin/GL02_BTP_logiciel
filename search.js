const parser = require("./parser.js");
const readlineSync = require("readline-sync");
List_question = parser();

//===================fonction qui permet à l'enseignant de rechercher une question ou la choisir dans une liste de questions=======================
const searchQuestion = function () {
  // récupération de la question saisie par l'enseignant sur le terminal à l'aide de la fonction question de la bibliothèque readline-sync
  let question = readlineSync.question("Entrez votre question : ");

  // utilisation de la méthode filter pour créer un nouveau tableau qui contient toutes les questions qui incluent la saisie de l'utilisateur
  let filteredQuestions = List_question.filter((q) =>
    q.name.includes(question)
  );

  // utilisation d'une instruction conditionnelle pour vérifier si le tableau filteredQuestions est vide ou non
  if (filteredQuestions.length === 0) {
    // si le tableau est vide, cela signifie que la question n'a pas été trouvée, donc on affiche un message d'erreur
    console.log(`La saisie ${question} n'a pas été trouvée`);

    // si le tableau n'est pas vide, cela signifie que la question a été trouvée
  } else {
    // on affiche toutes les questions trouvées
    console.log("Voici les questions trouvées : \n");
    filteredQuestions.forEach((q, index) => {
      console.log(`${index + 1}. ${q.name}`);
    });

    // on demande à l'utilisateur de choisir une question en entrant son numéro
    let questionIndex = readlineSync.question(
      "Choisissez une question en entrant son numéro : "
    );

    // on récupère la question choisie par l'utilisateur
    let selectedQuestion = filteredQuestions[questionIndex - 1];

    // on affiche la question choisie
    console.log(`Vous avez choisi la question : ${selectedQuestion.name}`);
  }
};

// exportation de la fonction searchQuestion
module.exports = searchQuestion;
