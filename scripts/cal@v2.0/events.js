---
layout: none
---
const eventsUrl = '{{ site.cal2.events.url }}'

{% raw %}

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

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

const eventpage = {
  methods: {
    getEvent: function ( slug ) {
      return caldata.find(o => o.slug === slug);
    }
  },
  template: '<span>' +
            '<p>eventpage for {{ $route.params.slug }}</p>' +
//            '<p>{{ getEvent(slug)["event-name"] }}</p>' +
            '</span>'
};

const eventscal = {
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

      for ( var i = 0 ; i < this.caldata.length ; i++ ) {
        this.caldata[i]['slug'] = slugify( this.caldata[i]['host-branch'] + '-' + this.caldata[i]['event-name'] + '-' + this.caldata[i]['start-date'] );
      }

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
    },

    eventIcons: function ( event ) {

      iconhtml = '';

      if ( event['progress'] == 'King' ) {
        iconhtml += '<i class="fas fa-chess-king" title="King present"></i>&nbsp;';
      } else if ( event['progress'] == 'Queen' ) {
        iconhtml += '<i class="fas fa-chess-queen" title="Queen present"></i>&nbsp;';
      } else if ( event['progress'] == 'Both' ) {
        iconhtml += '<i class="fas fa-chess-king" title="King present"></i>&nbsp;<i class="fas fa-chess-queen" title="Queen present"></i>&nbsp;';
      }

      if ( event['activities'].indexOf( 'Heavy Fighting' ) != -1 || event['activities'].indexOf( 'Fencing' ) != -1 ) {
        iconhtml += '<i class="fas fa-shield-alt" title="Armoured combat or Fencing"></i>&nbsp;';
      }

      if ( event['activities'].indexOf( 'Archery' ) != -1 ) {
        iconhtml += '<i class="fas fa-bullseye" title="Archery"></i>&nbsp;';
      }

      // if ( event['website'] != "" ) {
      //   iconhtml += '<a href="' + event['website'] + '"><i class="fab fa-chrome" title="Link to event website"></i></a>&nbsp;';
      // }

      if ( event['facebook'] != "" ) {
        iconhtml += '<a href="' + event['facebook'] + '"><i class="fab fa-facebook-square" title="Link to Facebook event"></i></a>&nbsp;';
      }

      if ( event['status'] == 'official' ) {
        iconhtml += '<i class="fas fa-check-circle" title="Official event approved by Chronicler"></i>';
      } else if ( event['status'] == 'pending' ) {
        iconhtml += '<i class="fas fa-clock" title="Pending review by Chronicler"></i>';
      } else {
        iconhtml += '<i class="fas fa-question-circle" title="Chronicler requires further information on this event"></i>';
      }

      return iconhtml;

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
            '     <table>' +
 
            '       <caption><h3>Upcoming Events</h3></caption>' +

            '       <thead>' +
            '         <tr valign="top">' +
            '           <th scope="col">' +
            '             <h3>Date</h3>' +
            '           </th>' +
            '           <th scope="col">' +
            '             <h3>Group</h3>' +
            '           </th>' +
            '           <th scope="col">' +
            '             <h3>Event</h3>' +
            '           </th>' +
            '           <th scope="col">' +
            '             <h3>Info</h3> ' +
            '           </th>' +
            '         </tr>' +
            '       </thead>' +
  
            '       <tbody>' +
            '         <tr v-for="event in caldata" v-if="eventDisplay(event)" :style="getEventStyle(event)">' +
            '           <td data-label="Date">{{ event | displayDate }}</td> ' + 
            '           <td data-label="Group">{{ event["host-branch"] }}</td> ' + 
            '           <td data-label="Event"> ' +
            '             <span v-if="event.website != \'\'"><a :href="event.website">{{ event["event-name"] }}</a></span>' +
            '             <span v-else>{{ event["event-name"] }}</span>' +
            '           </td> ' + 
            '           <td data-label="Info"><span class="eventicons" style="font-size: 1.3em;" v-html="eventIcons(event)"></span></td> ' + 
            '         </tr> ' +
            '       </tbody>' +

            '     </table>' +
            '   </div> ' +

            '   <div v-else> ' +
            '     <p v-if="status == \'failed\'">Calendar failed to load</p> ' +
            '     <p v-else>Loading calendar... attempt {{ retry }}/{{ retries }}</p> ' +
            '   </div> ' +

            ' </span> '
};

const routes = [
  { path: '', component: eventscal },
  { path: '/:slug', component: eventpage }
]

const router = new VueRouter({
  routes: routes
})

var vm = new Vue({
  router
}).$mount('#drachenwald-calendar');

{% endraw %}