---
layout: none
---
async function loadCalendar( jQuery ) {

  url = '{{ site.calendar.events.url }}';

  await fetch_retry( url, 5 );

}

const fetch_retry = async (url, n) => {
  let error;
  for (let i = 0; i < n; i++) {

    if ( i > 0 ) {
      var myHeaders = new Headers();
      myHeaders.append('pragma', 'no-cache');
      myHeaders.append('cache-control', 'no-cache');
  
      options = {
        method: 'GET',
        headers: myHeaders,
      };
    } else {
      options = {
        method: 'GET',
      };
    }

    $( "#calendar" ).html( '<td colspan="4"><i>Loading calendar... ' + Number(i+1) + '/' + Number(n) + '</i></td>' );

    try {
      
      response = await fetch(url, options);

      if (response.status == 200) {

        caltext = await response.text();

        Papa.parse( caltext , {
          complete: displayCalendar,
          header: true,
        });

        return true;
      }
    } catch (err) {
      $( "#calendar" ).html( '<td colspan="4"><i>Calendar failed to load.</i></td>' );
      error = err;
      console.log( error );
    }

    await new Promise(r => setTimeout(r, 2000));

  }
  $( "#calendar" ).html( '<td colspan="4"><i>Calendar failed to load.</i></td>' );
  throw error;
};


function displayCalendar( results ) {

  caldata = results.data;

  caldata.sort(function(a, b) {
    return Date.parse(a.start) - Date.parse(b.start);
  });

  var calhtml = "";

  nowdate = new Date();

  for ( var i = 0; i < caldata.length; i++ ) {

    startdate = new Date( caldata[i]['start'] );

    if ( caldata[i]['end'] != "" ) {
      enddate = new Date( caldata[i]['end']);
    } else {
      enddate = startdate;
    }

    if ( nowdate < enddate ) {

      calhtml += "<tr><td data-label='Date'><b>";

      if ( startdate.getDate() == enddate.getDate() && startdate.getMonth() == enddate.getMonth() && startdate.getFullYear() == enddate.getFullYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else if ( startdate.getMonth() == enddate.getMonth() && startdate.getFullYear() == enddate.getFullYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric' }) + "&ndash;" + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else if ( startdate.getYear() == enddate.getYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short' }) + " &ndash; " + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + " &ndash; " + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
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
  $( "#calendar" ).html( '<td colspan="4"><i>Calendar could not be displayed.</i></td>' );
  console.log( "Calendar failed to load: " + error )
}

$( document ).ready( loadCalendar );