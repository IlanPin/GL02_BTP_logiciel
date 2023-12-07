
const parserExam = function(cheminFichier){
    //import de l'ensemble des fichiers contenant les questions
    const fs = require('fs');
    const QUESTION = require('./QUESTION');
    const gift = fs.readFileSync(cheminFichier, 'utf-8');
    
    //================etape de tokenisation==================
    // Un fichier gift est sous la forme gift = *element\n
    //je recupere donc chaque element
    let elements = gift.split(/\n+/);
    let objetQuestion = new Array();
    
    //=================je recupere les groupes et les commentaires Ils seront peut etre utilisés dans un avenir ===================
    //recupere les groupes
    let group = elements.filter(element => element.startsWith('$'));

    //recupere les comment
    let comment = elements.filter(element => element.slice(0,2)==='//');
    //console.log(comment);


    //=================je recupere les questions. Chaque question commençant par un ::
    let questions = elements.filter(element => element.slice(0,2)==='::');
    //console.log(questions);

    let parsedQuestion = questions.filter(question => question.match(/(.*{.*}.*)/));
    
    //pour chaque question je construis l'objet question constitué de l'intitulé de la question et de sa réponse
    parsedQuestion.forEach(question => {
        //let matched = question.match(/~=.*~/);
        let matched =question.match(/~=([^~]+)~/);
        //console.log(matched);
        if(matched){
            let answer = matched[1];
            let q = new QUESTION(question,answer);
            objetQuestion.push(q);
        }
        
    });
    return objetQuestion;
}
module.exports = parserExam;
