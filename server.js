var request = require('request'),
    express = require('express'),
  	app = express();

//Serve static files from this directory
app.use(express.static('/home/pi/infonaytto/public'));

app.listen(8080, function() {
    console.log('server listening on port 8080');
});

//Pysakki information begins
app.get('/pysakki', function(req, res){

	var id=req.query.id;

	if (id == ''){
		res.write('Pysakin tunniste puuttuu.','utf8');
		res.end();
		return;
	}
	if (typeof(id) === 'undefined'){
		res.write('Pysakin tunniste onpi tuntematon.','utf8');
		res.end();
		return;
	}

  //Check documentation and create your own account for bussi API in
  //http://developer.publictransport.tampere.fi/pages/en/home.php
	request('http://api.publictransport.tampere.fi/prod/?request=stop&user=infonaytto&pass=mode5wry&dep_limit=4&time_limit=360&code=' + req.query.id, function (error, response, body) {
		if (!error && response.statusCode == 200) {

			try {
				result = JSON.parse(body)[0];
			} catch (ex) {
				console.log(ex.message);
				res.write('Pysakin haku epäonnistui','utf8');
				res.end();
				return;
			}

			var response = new Object();

			response.nimi = unescape(result.name_fi);
			response.bussit = [];

			for (var departure of result.departures){
				var bussi = new Object();

				bussi.numero = departure.code;
				var hours = departure.time.substr(0,2);
				var minutes = departure.time.substr(2);

				// hours after midnight are presented as 25 etc. so we need to convert
				// them to normal hours
				// plus sign in front of the variable to change from string to int
				if (+hours > 24){
						hours = +hours - 24;
				}
				bussi.aika = hours + ':' + minutes;

				response.bussit.push(bussi);
			}

			res.write(JSON.stringify(response),'utf8');
			res.end();

		}
	})

});
//Pysakki information ends
