//name of this component for html is concert-view

//camal case for functions
//underscore for variables

//1.variables
//2.components
//3.computed
//4.watchers
//5.methods
//6.template
const ConcertView = Vue.component("concert-view", {
  // created() {
  //   console.log('I am home')
  // },
  props: {
    concert: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseButton
  },
  computed: {
    time() {
      const start = new Date(this.concert.start_time);

      let start_hour = start.getHours();
      let start_min = start.getHours();
      const start_pm = start_hour > 12 ? "pm" : "am";
      start_hour = start_hour % 12;
      start_min = start_min < 10 ? `0${start_min}` : `${start_min}`;

      return `${start.toDateString()} doors at ${start_hour} : ${start_min}`;
    }
  },
  methods: {
    openMap() {
      const url = `https://www.google.com/maps/?q=${this.concert.place.name}`;
      window.open(url, '_blank');
    }
  },
  template: `
        <div class="card">
            {{concert.name}}
            <div style="font-size:1.25rem">
                {{concert.place.name}} - {{time}}
            </div>

            <base-button :content="'See location'" @clicked="openMap"/>
        </div>
    `
  // template: `
  //   <div class="card">
  //     <div class="row">
  //       <div className="column">
  //         {{concert.name}}
  //         <div style="font-size:1.25rem">
  //           {{concert.place.name}} - {{time}}
  //         </div>
  //         <base-button
  //           :content="See Location"
  //         ></base-button>
  //       </div>
  //     </div>
  //   </div>
  // `
});