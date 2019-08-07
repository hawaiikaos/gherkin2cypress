const fs = require('fs');
const filePath = process.argv[2];
var output = `import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

`;

function writeStep(line, stepType) {
	const step = line.replace(stepType, '').trim();
	output = output + `${stepType}("${step}", () => {
	return true;
});

`
}

function writeHeader(line) {
	output = output + `// ${line}

`;
}

function writeOutput() {
	const filename = filePath.split('/').pop();
	const path = filePath.split('/').slice(0, -1).join('/');
	const newPath = filePath.split('/').slice(0, -1).join('/') + '/' + filename.replace('.feature', '');
	try {
	  	if (!fs.existsSync(newPath)) {
	  		fs.mkdir(newPath, function() {
	  			const outputFilePath = newPath + '/' + filename.replace('.feature','.js');
	  			fs.writeFile(outputFilePath, output, function(err) {
	  				if(err) {
	  		        	return console.log(err);
	  		    	} else {
	  		    		console.log(outputFilePath + ' created.');
	  		    	}
	  			});
	  		});
	  	} else {
			// folder already exists, don't overwrite
	  		console.log('Feature file folder already exists. Remove the folder and retry. Exiting.');
	  	}
	} catch(err) {
		console.error(err);
	}
}

fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) throw err;
	const lines = data.match(/[^\r\n]+/g);
	lines.forEach(function(l) {
		l = l.trim();
		if (l.match(/^@/)) {
		} else if (l.match(/^Feature:/) || l.match(/^Scenario:/)) {
			writeHeader(l);
		} else if (l.match(/^When/)) {
			writeStep(l, 'When');
		} else if (l.match(/^Then/)) {
			writeStep(l, 'Then');
		} else if (l.match(/^Given/)) {
			writeStep(l, 'Given');
		} else if (l.match(/^And/)) {
			writeStep(l, 'Then');
		} else {
			// something else
		}
		
	});
	writeOutput();
 });

