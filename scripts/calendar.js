---
layout: none
---
async function loadCalendar( jQuery ) {

  if ( isIE() ) {
    $( "#calendar" ).html( '<td colspan="4"><i>Internet Explorer is not supported. Please try Microsoft Edge.</i></td>' );
    $( "#bidlist" ).html( '<td colspan="5"><i>Internet Explorer is not supported. Please try Microsoft Edge.</i></td>' );
    return;
  }

  url = '{{ site.calendar.events.url }}';

  fetch_retry( url, 5, 'events' );

  bidurl = '{{ site.calendar.bidlist.url }}';

  fetch_retry( bidurl, 5, 'bids' );

}

function isIE() {
  ua = navigator.userAgent;
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  
  return is_ie; 
}

const fetch_retry = async (url, n, sheet) => {
  let error;

  if ( sheet == 'bids' ) {
    var htmldest = "#bidlist";
    var cols = 5;
  } else {
    var htmldest = "#calendar";
    var cols = 4;
  }



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

    $( htmldest ).html( '<td colspan="' + cols + '"><i>Loading... ' + Number(i+1) + '/' + Number(n) + '</i></td>' );

    try {
      
      response = await fetch(url, options);

      if (response.status == 200) {

        caltext = await response.text();

        if ( sheet == 'bids' ) {
          Papa.parse( caltext , {
            complete: displayBidlist,
            header: true,
          });
        } else {
          Papa.parse( caltext , {
            complete: displayCalendar,
            header: true,
          });
        };

        return true;
      }
    } catch (err) {
      $( htmldest ).html( '<td colspan="' + cols + '"><i>Failed to load; please check your contnet blocker settings.</i></td>' );
      error = err;
      console.log( error );
    }

    await new Promise(r => setTimeout(r, 2000));

  }
  $( htmldest ).html( '<td colspan="' + cols + '"><i>Failed to load; please check your content blocker settings.</i></td>' );
  throw error;
};


function displayCalendar( results ) {

  var caldata = results.data;

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

function displayBidlist( results ) {

  var caldata = results.data;

  var calhtml = "";

  for ( var i = 0; i < caldata.length; i++ ) {

    var style = "";

    if ( caldata[i]['due'] == "Accepted" ) {
      style = " style='color: #666666;'";
    } else {
      style = " style='font-weight: bold;'";
    }

    calhtml += "<tr><td data-label='Date'" + style + ">" + caldata[i]['date'] + "</td>";
    calhtml += "<td data-label='Region'" + style + ">" + caldata[i]['region'] + "</td>";
    calhtml += "<td data-label='Event'" + style + ">" + caldata[i]['event'] + "</td>";
    calhtml += "<td data-label='Due'" + style + ">" + caldata[i]['due'] + "</td>";
    calhtml += "<td data-label='Bids'" + style + ">" + caldata[i]['bids'] + "</td></tr>";

  }

  $( "#bidlist" ).html( calhtml );

}

function errorCalendar( error ) {
  $( "#calendar" ).html( '<td colspan="4"><i>Calendar could not be displayed.</i></td>' );
  console.log( "Calendar failed to load: " + error )
}

$( document ).ready( loadCalendar );