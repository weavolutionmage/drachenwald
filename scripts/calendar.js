---
layout: none
---
function loadCalendar( jQuery ) {

  url = '{{ site.calendar.events.url }}';

  Papa.parse(url, {
    download: true,
    header: true,
    complete: displayCalendar,
    error: errorCalendar
  });

}

function displayCalendar( results ) {

  caldata = results.data;

  caldata.sort(function(a, b) {
    return Date.parse(a.start) - Date.parse(b.start);
  });

  var calhtml = ""

  nowdate = Date.now();

  for ( var i = 0; i < caldata.length; i++ ) {

    startdate = Date.parse( caldata[i]['start'] )

    if ( caldata[i]['end'] != "" ) {
      enddate = Date.parse( caldata[i]['end']);
    } else {
      enddate = startdate;
    }

    if ( nowdate < enddate ) {

      calhtml += "<tr><td>" + caldata[i]['start'].replace(/-/g, '&#8209;');
      if ( enddate != startdate ) {
        calhtml += " &ndash; " + caldata[i]['end'].replace(/-/g, '&#8209;');
      }
      calhtml += "</td>";
      calhtml += "<td>" + caldata[i]['name'] + "</td>";
      calhtml += "<td>" + caldata[i]['group'] + "</td>";
      
      calhtml += "<td>"
      if ( caldata[i]['progress'] == 'King' ) {
        calhtml += "King";
      } else if ( caldata[i]['progress'] == 'Queen' ) {
        calhtml += "Queen";
      } else if ( caldata[i]['progress'] == 'Both' ) {
        calhtml += "King & Queen";
      }
      calhtml += "</td></tr>";
    }
  }

  $( "#calendar" ).html( calhtml );

}

function errorCalendar( error ) {
  $( "#calendar" ).html( '<td colspan="4"><i>Calendar failed to load.</i></td>' );
  console.log( "Calendar failed to load: " + error )
}

$( document ).ready( loadCalendar );