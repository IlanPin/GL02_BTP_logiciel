
var QUESTION = function(nomFichier,nm,ans,type){
	this.nomFichier = nomFichier;
	this.name = nm;
	this.answer = ans;
	this.type = type;
}

//Methode tostring retourne la chaine de caractere avec laquelle afficher l'objet question
QUESTION.prototype.toString = function(){
	return `question:${this.name}\n reponse:${this.answer}\n\n`;
}



module.exports = QUESTION;



