const parser = require("./parser.js");
const readlineSync = require("readline-sync");
const fs = require("fs");
List_question = parser();

//==========================fonction qui retourne une question à partir de ce qu'a saisi l'enseignant=======================
const search = function () {
  // récupération de la question saisie par l'enseignant sur le terminal
  // à l'aide de la fonction question de la bibliothèque readline-sync
  let question = readlineSync.question("Entrez votre recherche : ");

  // question trouvée ou non à l'aide la méthode find
  let result = List_question.find((q) => q.name.includes(question));

  // si la question est trouvée, on retourne son intitulé
  if (result) {
    return result.name;

    // sinon on retourne null
  } else {
    return null;
  }
};

//=========================fonction qui retourne une liste regroupant les questions saisies par l'enseignant=======================
const listQuestionExam = function () {
  // création de liste qui va contenir les questions
  let questions_exam = Array();

  // création d'une variable question
  let question;

  // création d'une variable qui va détermniner si l'enseignant veut ajouter une question
  let insert = readlineSync.question(
    "Voulez-vous ajouter une question (oui/non) : "
  );

  // création d'une variable qui permet de savoir si l'enseignant vaut garder la question trouvée
  let keepIt;

  // tant que l'enseignant veut ajouter des questions, elles seront ajoutées à la liste
  do {
    // utilisation de la fonction search
    question = search();

    // si la question a été trouvée, on ne l'ajoute pas forcément à la liste
    if (question != null) {
      // on demande à l'enseignant s'il veut ajouter la question trouvée
      keepIt = readlineSync.question(
        `Voulez-vous ajouter ${question} \n (oui/non) : `
      );

      // si oui, on l'ajoute à la liste
      if (keepIt.toLowerCase() === "oui") {
        questions_exam.push(question);
        console.log("La question a été ajoutée \n");

        // sinon elle n'est pas ajoutée, et on demande à l'enseignant d'être plus précis
      } else {
        console.log("La question n'a pas été ajoutée, soyez plus précis \n");
      }

      // sinon elle n'est pas ajoutée
    } else {
      console.log(
        "La question n'a pas été trouvée, elle n'a pas été ajoutée \n"
      );
    }

    // on demande à l'enseignant s'il veut ajouter une question
    insert = readlineSync.question(
      "Voulez-vous ajouter une question (oui/non) : "
    );
  } while (insert.toLowerCase() === "oui");

  // on retourne la liste de questions
  return questions_exam;
};

//==========================fonction va créer une fiche d'examen sous format GIFT=======================
const createExamSheet = function () {
  // message de bienvenu rappelant le but de la fonctionnalité
  console.log(
    "Bienvenu dans la création d'une fiche d'examen sous format GIFT \n"
  );
  // récupération de la liste des questions
  questions = listQuestionExam();
  // création d'une chaine de caractères qui va contenir toutes les questions
  let giftContent = "";
  // ajout de chaque question à la chaine de caractères
  questions.forEach((q) => {
    giftContent += `${q}\n\n`;
  });
  // on demande à l'enseignant de saisir le nom du fichier
  let fileName = readlineSync.question("Entrez le nom du fichier : ");
  // on crée le fichier gift
  fs.writeFileSync(`${fileName}.gift`, giftContent);
};

module.exports = { search, listQuestionExam, createExamSheet };
