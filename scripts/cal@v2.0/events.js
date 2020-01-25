---
layout: none
---
const eventsUrl = '{{ site.cal2.events.url }}'

{% raw %}

function isIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
  {
      return true
  }

  return false;
}



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

      if ( grouplistlower.length < 1 || $.inArray( caldata[i]['group'].toLowerCase() , grouplistlower ) > -1 ) {

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
  }

  $( "#calendar" ).html( calhtml );

}

Vue.component('events-calendar', {
  data: function () {
    return {
      url: eventsUrl,
      retries: 5,
      retry: 0,
      timeout: 5000,
      status: 'waiting',
      caldata: [],
    }
  },
  created: function () {
    this.loadCalendar();
  },
  methods: {
    loadCalendar: function () {
      this.fetchretry( this.url, this.retries );
    },
    fetchretry: function ( url ) {

      this.status = 'loading';
      this.retry++;

      self = this;

      axios.get(url)
        .then(function (response) {
          // handle success
          var caltext = response['data'];

          Papa.parse( caltext , {
            complete: self.storeCalendar,
            error: self.fetcherror,
            header: true,
          });
        })
        .catch(function (error) {
          self.fetcherror( error );
        });

    },

    fetcherror: function ( error ) {
      this.status = 'retrying';
      console.log( "Fetch error " + error + " on retry " + this.retry );
      if ( this.retry < this.retries ) {
        setTimeout( self.fetchretry, self.timeout, this.url );
      } else {
        console.log( "Fetch error " + error );
        console.log( "Retries exhausted" );
        self.status = 'failed';
      }
    },

    storeCalendar: function ( results ) {
      this.status = 'loaded';
      this.caldata  = results.data;
      console.log( "Parsing complete" );
    }
  },
  template: `<span>
  <div v-if='status=="loaded"'>
    <div v-for='event in caldata' class='notice'>
      <h1>{{ event['event-name'] }}</h1>
      <p>
      {{ event.region }}
      </p>
    </div>
  </div>
  <div v-else>
    <p>Retry number {{ retry }}: {{ url }}</p>
    <p>Status {{ status }}</p>
  </div>
  
  </span>`
});

var vm = new Vue({
  el: '#drachenwald-calendar'
});

{% endraw %}