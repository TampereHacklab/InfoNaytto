$(document).ready(function() {

  //first parameter is pysakki ID number
  //second parameter is the direction of the route
   haePysakinLahdot('3033', 'menee');
   haePysakinLahdot('3099', 'menee');
   haePysakinLahdot('3032', 'tulee');
   haePysakinLahdot('3100', 'tulee');
   haeSaatiedot();
   haeKirjoitusalusta();

	setInterval( function() {

    $('#lahtevat').html('');
    $('#tulevat').html('');

		haePysakinLahdot('3033', 'menee');
		haePysakinLahdot('3099', 'menee');
		haePysakinLahdot('3032', 'tulee');
		haePysakinLahdot('3100', 'tulee');
		haeSaatiedot();
    haeKirjoitusalusta();
	}, 20000 );

  //Documentation in https://fullcalendar.io/
  //More eventSources in http://www.webcal.fi/fi-FI/kalenterit.php
  $('#calendar').fullCalendar({
      googleCalendarApiKey: ' AIzaSyAW65dK4G94Bv5Pg71f8Vqi7CcK8CpXYks ',
      eventSources: [
    			{
    				googleCalendarId: 'tamperehacklab@gmail.com'
    			},
    			{
    				googleCalendarId: 'fi.finnish#holiday@group.v.calendar.google.com'
    			},
    			{
    				googleCalendarId:  'asks8c75rb1gpnks5g4cgop3pfq5mg74@import.calendar.google.com',
    				backgroundColor: 'blue'
    			},
    			{
    				googleCalendarId:  'nnavnmpo242bpa58u1l7h229dsmbkhi3@import.calendar.google.com',
    				backgroundColor: 'cyan',
    				textColor:'black'
    			}
  		],
      header: {
        left: '',
        center: 'title',
        right:''
      },
  		firstDay:1,
  		weekNumbers: true
  });

});

function haePysakinLahdot(id, suunta){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://127.0.0.1:8080/pysakki?id=" + id, true );
	xmlHttp.responseType = "json";
	xmlHttp.onload = function() {

		var pysakin_nimi = "<div class='pysakin_nimet'>" + xmlHttp.response.nimi + "</div>";
		var pysakin_bussit = "<table class='bussilista'>";
		$.each(xmlHttp.response.bussit, function (index, value) {
			pysakin_bussit = pysakin_bussit + "<tr><td class='bussinro'>" + value.numero + "</td><td>klo " + value.aika + '</td></tr>';
		});

    if (xmlHttp.response.bussit.length == 0){
      pysakin_bussit = pysakin_bussit + "<tr><td class='bussinro'>-</td><td>-</td></tr>";
    }

		pysakin_bussit = pysakin_bussit + "</table>";
		if (suunta === 'menee'){
			$('#lahtevat').html( $('#lahtevat').html()  + pysakin_nimi + pysakin_bussit);
		} else {
			$('#tulevat').html( $('#tulevat').html()  + pysakin_nimi + pysakin_bussit);
		}

	};
    xmlHttp.onerror = error;
    xmlHttp.send();
}

function haeSaatiedot(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://127.0.0.1:8080/saatila.html", true );
	xmlHttp.onload = function() {

		$('#saa').html(xmlHttp.response);

	};
    xmlHttp.onerror = error;
    xmlHttp.send();
}

function haeKirjoitusalusta(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://127.0.0.1:8080/notepad.html", true );
	xmlHttp.onload = function() {

		$('#notepad').html(xmlHttp.response);

	};
    xmlHttp.onerror = error;
    xmlHttp.send();
}

function error(message) {
	console.log(message);
}
