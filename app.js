var fs = require('fs'),
	path = require('path'),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	assert = require('assert'),
	sys = require('sys'),
	exec = require('child_process').exec;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
	Correspond to the 'Submit' post event from client.
	Run the program uploaded from client.
*/
app.post('/runProgram', function(req, res) {
	var language = req.body.language,
		runProgramOutput,
		cmd;

	function puts(error, stdout, stderr) {
		runProgramOutput = stdout;
		if (stderr.length > 0) {
			runProgramOutput = stderr;
		}
		
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(runProgramOutput.toString()));
	}

	// Saving uploaded script in a local tmp file		
	fs.writeFile('./tmp', req.body.content, function(err){
	
	});
	
	/**
		@language: the langauge chosen by the client.
		options: python, javascript, c_cpp
	*/
	switch (language) {
		case 'python': 
			cmd = 'python'; 
			exec(cmd + " tmp", puts);
			break;
		case 'javascript': 
			cmd = 'node'; 
			exec(cmd + " tmp", puts);
			break;
		case 'c_cpp':
			cmd = 'g++';
			fs.rename('./tmp', './tmp.cpp');
			exec(cmd + " -o a.out tmp.cpp; ./a.out", puts);
			break;
	}
	
});

app.listen(3001);
console.log('Server started: http://localhost:3001/');
