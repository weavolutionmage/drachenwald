---
layout: none
---
const eventsUrl = '{{ site.cal2.events.url }}'

{% raw %}

function getEventStartDate( event ) {
  return new Date( event['start-date'] );
}

function getEventEndDate( event ) {
  if ( event['end-date'] != "" ) {
    return new Date( event['end-date'] );
  } else {
    return new Date( event['start-date'] );
  }
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

      this.caldata = results.data.sort(function(a, b) {
        return Date.parse(a['start-date']) - Date.parse(b['start-date']);
      });

      console.log( "Parsing complete" );
    },

    getEventStyle: function ( event ) {

      var eventStyle = {
        padding: '2em'
      }

      if ( event.status == 'official' ) {
        eventStyle['background-color'] = '#ffffff';
      } else {
        eventStyle['background-color'] = '#eeeeee';
      }

      return eventStyle;
    },

    eventDisplay: function ( event ) {
      nowdate = new Date();

      computeDate = getEventEndDate( event ).setDate( getEventEndDate( event ).getDate() + 1);

      if ( nowdate > computeDate ) {
        return false;
      }

      if ( event['status'] == 'blank' ) {
        return false;
      }

      return true;
    },

    getDisplayDate: function ( event ) {

      startdate = getEventStartDate( event );
      enddate = getEventEndDate( event );

      calhtml = '';

      if ( startdate.getDate() == enddate.getDate() && startdate.getMonth() == enddate.getMonth() && startdate.getFullYear() == enddate.getFullYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else if ( startdate.getMonth() == enddate.getMonth() && startdate.getFullYear() == enddate.getFullYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric' }) + "&ndash;" + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else if ( startdate.getYear() == enddate.getYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short' }) + " &ndash; " + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + " &ndash; " + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      };

      return calhtml;
    }
  },

  filters: {
    displayDate: function ( event ) {
      startdate = getEventStartDate( event );
      enddate = getEventEndDate( event );

      calhtml = '';

      if ( startdate.getDate() == enddate.getDate() && startdate.getMonth() == enddate.getMonth() && startdate.getFullYear() == enddate.getFullYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else if ( startdate.getMonth() == enddate.getMonth() && startdate.getFullYear() == enddate.getFullYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric' }) + "–" + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else if ( startdate.getYear() == enddate.getYear() ) {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short' }) + " – " + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      } else {
        calhtml += startdate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + " – " + enddate.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      };

      return calhtml;
    }
  },

  template: '<span>' +

            '   <div v-if="status==\'loaded\'">' +
            '     <div v-for="event in caldata" v-if="eventDisplay(event)" >' +
            '       <div :style="getEventStyle(event)"> ' + 

            '         <h1>{{ event["event-name"] }}<br><i>{{ event | displayDate }}</i></h1> ' +

            '         <p v-if="event.summary != \'\'"> ' +
            '           {{ event.summary }} ' +
            '         </p>' +

            '         <p> ' +
            '           Hosted by <b>{{ event["host-branch"] }}</b> in <b>{{ event["country"] }}</b>. ' +
            '         </p> ' +

            '         <p> ' +
            '           <span v-if="event.website != \'\'"> ' +
            '             <a :href="event.website" class="btn btn--primary">Visit event website</a> ' +
            '           </span> ' +

            '           <span v-if="event.facebook != \'\'"> ' +
            '             <a :href="event.facebook" class="btn btn--primary">Follow on Facebook</a> ' +
            '           </span> ' +
            '         </p> ' +

            '         <p v-if="event.status == \'official\'"> ' +
            '         <i>This is an official event for the purpose of Kingdom business.</i>' +
            '         </p> ' +

            '         <p v-if="event.status == \'unofficial\'">' +
            '         <i>The Chronicler has not yet approved this as an official event.</i>' +
            '         </p> ' +

            '         <p v-if="event.status == \'pending\'">' +
            '         <i>This event is pending review by the Chronicler.</i>' +
            '         </p> ' +

            '       </div> ' +
            '       <br> ' + 
            '     </div> ' +
            '   </div> ' +

            '   <div v-else> ' +
            '     <p v-if="status == \'failed\'">Calendar failed to load</p> ' +
            '     <p v-else>Loading calendar... attempt {{ retry }}/{{ retries }}</p> ' +
            '   </div> ' +

            ' </span> '
});

var vm = new Vue({
  el: '#drachenwald-calendar'
});

{% endraw %}