const fs = require('fs');
const colors = require('colors');
//const VpfParser = require('./VpfParser.js');
const parser = require('./parser');
const parserExam = require('./parserExam');
const listQuestion = parser();
const readline = require('readline');
const vg = require('vega');
const vegalite = require('vega-lite');

const cli = require("@caporal/core").default;

cli
	.version('vpf-parser-cli')
	.version('0.07')
	
	//lister les questions de la banque de question
	.command('question','List all question in the question bank')
	.action(({args, options, logger}) => {
		let i=0;
        for(question in listQuestion){
            logger.info("Question n°"+i+": "+listQuestion[i-1]);
            i++;
        }
	})


	//search a particular question in the bank of question
	.command('search','search a queestion in the bank question by typing characters of the entire question')
	.argument('question','part or the entire question to search')
	.action(({args,logger}) => {
		//utilisation de la méthode filter pour créer un nouveau tableau qui contient toutes les questions qui incluent la saisie de l'utilisateur
		let filteredQuestions = listQuestion.filter((q) =>
			q.name.includes(args.question)
		);

		// utilisation d'une instruction conditionnelle pour vérifier si le tableau filteredQuestions est vide ou non
		if (filteredQuestions.length === 0) {
			// si le tableau est vide, cela signifie que la question n'a pas été trouvée, donc on affiche un message d'erreur
			logger.info(`La saisie ${args.question} n'a pas été trouvée`);

			// si le tableau n'est pas vide, cela signifie que la question a été trouvée
		} else {
			// on affiche toutes les questions trouvées
			logger.info("Voici les questions trouvées : \n");
			filteredQuestions.forEach((q, index) => {
			logger.info(`${index + 1}. ${q.name}`);
			});
	}})

	//add a particular question to a exam file 
	.command('add','add a question by his number to a exam file')
	.argument('<number>','number of the question')
	.argument('<file>','the exam file where the question must be add')
	.action(({args,logger}) => {
		fs.appendFile(args.file,listQuestion[parseInt(args.number)].toString(),(err) => {
			if(err){
				logger.info('fichier non existant ou chemin inacessible');
			}
			logger.info(`La question ${args.number} a ete ajoutee`);
		})
	})
	
	//generate vcard file for the teacher containing his number_id and his name and his phone number
	.command('vcard','generate a vcard file containing information of one teacher')
	.argument('<id>','the teacher id')
	.argument('<name>','The teacher name')
	.argument('<phone>','his phone number')
	.action(({args,options,logger}) => {
		let vCard = "BEGIN:VCARD";
		vCard += "\nVERSION:4.0";
		vCard += `\nFN:${args.id}`;
		vCard += `\nNAME:${args.name}`;
		vCard += `\nEMAIL:${args.phone}`;
		vCard += "\nEND:VCARD";
	  
		// création du fichier vCard
		fs.writeFileSync(`${args.name}.vcf`, vCard);
	})

	//simulation de test 
	.command('compareAnswer',"Compare les reponses d'un etudiant avec la correction d'un exam choisi")
	.argument('<answer>',"fichier contenant les reponses d'un etudiant")
	.argument('<exam>',"examen compose par l'etudiant")
	.action(({args,logger,options}) => {
		//reponse de l'etudiant
		fs.readFile(args.answer,"utf-8", (err,data) =>{
			if(err){
				logger.info("Le fichier de reponse de l'etudiant est illisible")
			}
			answerStudent = data.split(',');
			//reponse aux questions de l'examen
			questionExam =parserExam(args.exam);
			//note a l'examen
			let note = 0;
			//numero correspond au nulero de question
			for(let numero = 0; numero < questionExam.length; numero++){
				if(answerStudent[numero] === questionExam[numero].answer){
					note++
				}
			}
			note = note * 20/questionExam.length;
			logger.info(note);
		})
	})
				
cli.run(process.argv.slice(2));
	