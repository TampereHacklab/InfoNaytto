$(document).ready(function() {

  //the parameter is bus stop ID number
   haePysakinLahdot('3029');
   haePysakinLahdot('3099');
   haePysakinLahdot('3028');
   haePysakinLahdot('3100');
   haeSaatiedot();
   haeKirjoitusalusta();

	setInterval( function() {

    $('#lahtevat').html('');
    $('#tulevat').html('');

    haePysakinLahdot('3029');
    haePysakinLahdot('3099');
    haePysakinLahdot('3028');
    haePysakinLahdot('3100');
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
    			{//suomalaiset juhlapyhät
    				googleCalendarId: 'fi.finnish#holiday@group.v.calendar.google.com'
    			},
    			{//Hyvä tietää -tapahtumia
    				googleCalendarId:  'asks8c75rb1gpnks5g4cgop3pfq5mg74@import.calendar.google.com',
    				backgroundColor: 'blue'
    			},
    			{//nimipäivät
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
  		weekNumbers: true,
      timeFormat: 'HH:mm',
      monthNames: ['TAMMIKUU', 'HELMIKUU', 'MAALISKUU', 'HUHTIKUU', 'TOUKOKUU',
                  'KESÄKUU', 'HEINÄKUU', 'ELOKUU', 'SYYSKUU', 'LOKAKUU',
                   'MARRASKUU', 'JOULUKUU'],
      dayNamesShort: ['Su','Ma','Ti','Ke','To','Pe','La'],
      weekNumberTitle:'vk',
      eventLimit: false,
      eventLimitText: "",
      timezone: "local"
  });


  setInterval( function() {
    $('#calendar').fullCalendar('render');
  }, 3600000 );

});

function haePysakinLahdot(id){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://127.0.0.1:8080/pysakki?id=" + id, true );
	xmlHttp.responseType = "json";
	xmlHttp.onload = function() {

		var pysakin_bussit = "";
		$.each(xmlHttp.response.bussit, function (index, value) {
			pysakin_bussit = pysakin_bussit + "<tr><td class='bussinro'>" + value.numero + "</td><td>klo " + value.aika + '</td></tr>';
		});

    for (var i = 5 - xmlHttp.response.bussit.length; i > 0; i-- ){
      pysakin_bussit = pysakin_bussit + "<tr><td class='bussinro'>-</td><td>-</td></tr>";
    }

    $('#' + id).html(pysakin_bussit);

	};
    xmlHttp.onerror = error;
    xmlHttp.send();
}

function haeSaatiedot(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://127.0.0.1:8080/saatila.html", true );
	xmlHttp.onload = function() {

    if (xmlHttp.response)
		  $('#saa').html(xmlHttp.response);

	};
    xmlHttp.onerror = error;
    xmlHttp.send();
}

function haeKirjoitusalusta(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://127.0.0.1:8080/notepad.html", true );
	xmlHttp.onload = function() {

    if (xmlHttp.response)
		  $('#notepad').html(xmlHttp.response);

	};
    xmlHttp.onerror = error;
    xmlHttp.send();
}

function error(message) {
	console.log(message);
}
