var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

var tasks = {
  "1": { "id": '1', "text": "What you need to do", "note": "Adding created timestamp", "created_at": "1506927424595" , "updated_at": "1506927424595", "status": "Completed"},
  "2": { "id": "2", "text": "Implement awesome js app", "note": "JS APP", "created_at": "1506927424595" , "updated_at": "1506927424595", "status": "InComplete"},
  "3": { "id": "3", "text": "Polish Aoo", "note": "Polish app with your own css" , "created_at": "1506927424595" , "updated_at": "1506927424595", "status": "InComplete"},
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/api/tasks', function(req, res) {
	res.json(tasks);
});

app.post('/api/tasks', function(req, res) {
	console.log('POST a new Task', req.body);
	if (!req.body || !req.body.id || !req.body.text) {
		res.status(400).send('Invalid task format');
		return;
	}
	if (tasks[req.body.id]) {
		res.status(409).send('Conflict. Task already defined');
		return;
	}

	tasks[req.body.id] = {
		id: req.body.id,
		text: req.body.text,
		note: req.body.note,
		status: req.body.status,
		created_at: req.body.created_at,
		updated_at: req.body.updated_at,
	};
	res.status(204).send();
});

app.put('/api/tasks/:id', function(req, res) {
	console.log('PUT a new Task', req.params.id, req.body);
        if (!tasks[req.params.id]) {
                res.status(404).send();
                return;
        }

	tasks[req.params.id].text = req.body.text;
	tasks[req.params.id].note = req.body.note;
	tasks[req.params.id].status = req.body.status;
	tasks[req.params.id].created_at = req.body.created_at;
	tasks[req.params.id].updated_at = req.body.updated_at;

	res.json(tasks[`${req.params.id}`]);
});

app.delete('/api/tasks/:id', function(req, res) {
	if (!tasks[req.params.id]) {
		res.status(404).send();
		return;
	}

	delete tasks[req.params.id];
	res.status(204).send();
});

app.listen(3000, function () {
	  console.log('To-Do app listening on port 3000!');
});
