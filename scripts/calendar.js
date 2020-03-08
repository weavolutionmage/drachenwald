---
layout: none
---
async function loadCalendar( jQuery ) {

  if ( isIE() ) {
    $( "#bidlist" ).html( '<td colspan="5"><i>Internet Explorer is not supported. Please try Microsoft Edge.</i></td>' );
    return;
  }

  url = '{{ site.calendar.events.url }}';

  fetch_retry( url, 5, 'events' );

}

function isIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
  {
      return true
  }

  return false;
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
      error = err;
      console.log( error );
    }

    await new Promise(r => setTimeout(r, 5000));

  }
  $( htmldest ).html( '<td colspan="' + cols + '"><i>Failed to load; please check your content blocker settings.</i></td>' );
  throw error;
};

function displayCalendar( results ) {

  if ( typeof grouplist == 'undefined' ) {
    var grouplistlower = [];
  } else {
    var grouplistlower  = [];
    for (var i = 0; i < grouplist.length; i++) {
        grouplistlower.push(grouplist[i].toLowerCase());
    }
  }

  var caldata = results.data;

  caldata.sort(function(a, b) {
    return Date.parse(a['start-date']) - Date.parse(b['start-date']);
  });

  if ( typeof maxentries == 'undefined' ) {
    var rowlimit = caldata.length;
  } else if ( maxentries > caldata.length ) {
    var rowlimit = caldata.length;
  } else {
    var rowlimit = maxentries;
  }

  var calhtml = "";

  nowdate = new Date();
  displayed = 0;

  for ( var i = 0; i < caldata.length && displayed < rowlimit; i++ ) {

    startdate = new Date( caldata[i]['start-date'] );

    if ( caldata[i]['end-date'] != "" ) {
      enddate = new Date( caldata[i]['end-date']);
    } else {
      enddate = startdate;
    }

    if ( nowdate < enddate ) {

      if ( grouplistlower.length < 1 || $.inArray( caldata[i]['host-branch'].toLowerCase() , grouplistlower ) > -1 ) {

        displayed++;
        
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
        calhtml += "<td data-label='Group'>" + caldata[i]['host-branch'] + "</td>";
        calhtml += "<td data-label='Event'>";
        if ( caldata[i]['website'] != "" ) {
          calhtml += '<a href="' + caldata[i]['website'] + '">' + caldata[i]['event-name'] + '</a>';
        } else {
          calhtml += caldata[i]['event-name'];
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
  }

  $( "#calendar" ).html( calhtml );

}

function errorCalendar( error ) {
  $( "#calendar" ).html( '<td colspan="4"><i>Calendar could not be displayed.</i></td>' );
  console.log( "Calendar failed to load: " + error )
}