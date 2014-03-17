/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser({keepExtensions:true,uploadDir:path.join(__dirname,'/files')}));
app.use(app.router);


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/api', function (req, res) {
    res.send('api...');
});
app.get('/predict/:jobid', function (req, res) {
    var exec = require('child_process').exec;
    exec('/home/xudshen/workspace/leaf_recognition/leaf_recognition/test/prepare_single.py ' +
        '/home/xudshen/workspace/leaf_recognition/webapp/public/img/predict/' + req.params.jobid +'.jpg ' + req.params.jobid,
        function (error, stdout, stderr) {
            if (error) {
                console.log(error);
            }
            var info = JSON.parse(stdout);
            res.render('predict', {title: 'Predict: ' + info['predict_name'],features: info['features'], jobid: req.params.jobid, predict_name: info['predict_name']});
    });
});
app.post('/predict', express.multipart(), function (req, res) {

    console.log(req.files)
    var redis = require("redis"),
        client = redis.createClient();
    client.select(14);

    client.on("error", function (err) {
        console.log("Error " + err);
    });

    client.incr('next.job.id', function (err, reply) {
        require('fs').rename(
            req.files.sample.path,
            path.resolve('/home/xudshen/workspace/leaf_recognition/webapp/public/img/predict/' + reply + path.extname(req.files.sample.name || '')),
            function (error) {
                if (error) {
                    res.send({
                        error: 'Ah crap! Something bad happened'
                    });
                    return;
                }
                res.redirect('/predict/' + reply);
            }
        );
        client.end();
    });
});

app.get('/api/species/:id', function (req, res) {
//    res.setHeader('Content-Type', 'application/json');
//    res.end(JSON.stringify({'id': req.params.id}, null, 3));
    fs = require('fs')
    fs.readFile('/home/xudshen/workspace/leaf_recognition/webapp/public/infos/' + req.params.id, 'utf8', function (err,data) {
        if (err) {
            res.send("Can not find info");
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
