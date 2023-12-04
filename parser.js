const parser = function(){

    //import des modules de lecture des fichiers et dossier
    const fs = require('fs');
    const path = require('path');

    //import de l'objet de question
    const QUESTION = require('./QUESTION');
    let objetQuestion = new Array();
    
    //Lecture des fichiers dans le dossier
    fichiers=fs.readdirSync('./SujetB_data','utf-8');
    //Parcours des fichiers du dossier
    fichiers.forEach((fichier) =>{
        const cheminFichier = path.join('./SujetB_data',fichier);

     //=================Parsage du contenu d'un fichier=======================
        const gift = fs.readFileSync(cheminFichier, 'utf-8');

        //================etape de tokenisation==================
        // Un fichier gift est sous la forme gift = *element\n
        let elements = gift.split(/\n+/);

        //==============il s'agit ici de l'ABNF d'un fichier GIFT==========
        //console.log(elements);
        //element = question / group / comment/ feedback
        //comment = //*CHAR
        //group = $*CHAR
        //question =::*CHAR
        
        //=================je recupere les groupes et les commentaires Ils seront peut etre utilisés dans un avenir ===================
        //recupere les groupes
        let group = elements.filter(element => element.startsWith('$'));

        //recupere les comment
        let comment = elements.filter(element => element.slice(0,2)==='//');
        //console.log(comment);


        //=================je recupere les questions. Chaque question commençant par un ::
        let questions = elements.filter(element => element.slice(0,2)==='::');

        //recupere les questions valides. Une question valide etant une question à choix multiple c'est à dire contenat "{}"
        let parsedQuestion = questions.filter(question => question.match(/(.*{.*}.*)/));
        
        //pour chaque question je construis l'objet question constitué de l'intitulé de la question et de sa réponse
        parsedQuestion.forEach(question => {
            let matched =question.match(/~=([^~]+)~/);
            if(matched){
                let answer = matched[1];
                let q = new QUESTION(question,answer);
                objetQuestion.push(q);
            }
            
        });
    })
    
    return objetQuestion;
    
}

module.exports = parser;
