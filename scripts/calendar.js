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

  nowdate = new Date();

  for ( var i = 0; i < caldata.length; i++ ) {

    startdate = new Date( caldata[i]['start'] );

    if ( caldata[i]['end'] != "" ) {
      enddate = new Date( caldata[i]['end']);
    } else {
      enddate = startdate;
    }


    if ( nowdate < enddate ) {

      calhtml += "<tr><td data-label='Date'><b>"

      if ( enddate != startdate ) {
        if ( startdate.getMonth() == enddate.getMonth() && startdate.getFullYear() == enddate.getFullYear() ) {
          calhtml += startdate.getDate() + "&ndash;" + enddate.getDate() + " " + enddate.toLocaleString('default', { month: 'long' }) + " " + enddate.getFullYear();
        } else if ( startdate.getYear() == enddate.getYear() ) {
          calhtml += startdate.getDate() + " " + startdate.toLocaleString('default', { month: 'long' }) + " &ndash; " + enddate.getDate() + " " + enddate.toLocaleString('default', { month: 'long' }) + " " + enddate.getFullYear();
        } else {
          calhtml += startdate.getDate() + " " + startdate.toLocaleString('default', { month: 'long' }) + " " + startdate.getFullYear() + " &ndash; " + enddate.getDate() + " " + enddate.toLocaleString('default', { month: 'long' }) + " " + enddate.getFullYear();
        }
      }

      calhtml += "</b></td>";
      calhtml += "<td data-label='Group'>" + caldata[i]['group'] + "</td>";
      calhtml += "<td data-label='Event'>";
      if ( caldata[i]['web'] != "" ) {
        calhtml += '<a href="' + caldata[i]['web'] + '">' + caldata[i]['name'] + '</a>';
      } else {
        calhtml += caldata[i]['name'];
      }
      
      calhtml += "</td>";
      
      calhtml += "<td data-label='Royals'>"
      if ( caldata[i]['progress'] == 'King' ) {
        calhtml += "King";
      } else if ( caldata[i]['progress'] == 'Queen' ) {
        calhtml += "Queen";
      } else if ( caldata[i]['progress'] == 'Both' ) {
        calhtml += "King & Queen";
      } else {
        calhtml += "&nbsp;"
      }
      calhtml += "</td></tr>\n\r";

    }
  }

  $( "#calendar" ).html( calhtml );

}

function errorCalendar( error ) {
  $( "#calendar" ).html( '<td colspan="4"><i>Calendar failed to load.</i></td>' );
  console.log( "Calendar failed to load: " + error )
}

$( document ).ready( loadCalendar );