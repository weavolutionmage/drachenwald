---
layout: none
---
async function loadBidlist( jQuery ) {

  if ( isIE() ) {
    $( "#bidlist" ).html( '<td colspan="5"><i>Internet Explorer is not supported. Please try Microsoft Edge.</i></td>' );
    return;
  }

  bidurl = '{{ site.calendar.bidlist.url }}';

  fetch_retry( bidurl, 5, 'bids' );

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