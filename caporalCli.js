const fs = require('fs');
const colors = require('colors');
//const VpfParser = require('./VpfParser.js');
const parser = require('./parser');
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
		let i=1;
        for(question in listQuestion){
            logger.info("Question n°"+i+": "+listQuestion[i-1]);
            i++;
        }
	})

	//add a particular question to a file
	.command('add','add a question by his number to a file')
	.argument('<number>','number of the question')
	.argument('<file>','the file where the question must be add')
	.action(({args,logger}) => {
		fs.appendFile(args.file,listQuestion[parseInt(args.number)].toString(),(err) => {
			if(err){
				logger.info('fichier non existant ou chemin inacessible');
			}
			logger.info(`La question ${args.number} a ete ajoutee`);
		})
	})

	//specification 5 donner les resultats d'un exam
	.command('compareAnswer',"compare les reponses d'un etudiant au test avec la correction de l'examen")
	.argument('<answer>',"Fichier de reponse de l'etudiant")
	.argument('<exam>',"Fichier de l'exam en question")
	.action(({args,logger,options}) => {
		fs.readFile(args.answer,'utf-8',(err,data) => {
			if(err){
				logger.info("")
			}
		})
	})
				
cli.run(process.argv.slice(2));
	