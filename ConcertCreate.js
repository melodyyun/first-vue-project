const ConcertCreate = Vue.component("concert-create", {
  components: {
    BaseButton
  },
  props: {
    venues: {
      type: Array,
      required: true,
      default: []
    },
  },
  data() {
    return {
      name: "",
      place: "",
      start_date: new Date().toISOString().split("T")[0],
      start_time: "19:30"
    };
  },
  computed: {
    name_valid() {
      return !!(this.name.length);
    },
    place_valid() {
      return !!(this.place.length);
    },
    valid() {
      // forces length num to become a boolean ! flips to boolean second ! shows if it has a length or no
      return (
        this.name_valid && 
        this.place_valid)
    }
  },
  methods: {
    submit() {
      if(!this.valid) return;

      const payload = {
        'name': this.name,
        'place': {
          'name': this.place
        },
        'start_time': `${this.start_date}T${this.start_time}`
      }
      this.$root.$emit('new-concert', payload);
      this.name = '';
    }
  },
  //can customize when it runs
  //watch doesn't fire on initialization only updates
  watch: {
    venues(){
      // handler(){
      //   this.place = this.venues[0]
      // }
      // deep: true,
      this.place = this.venues[0]
    }
  },
  template: `
    <div class="card">

          Who is playing?
          <input type="text" 
            placeholder="Band Name"
            v-model="name"
          />
          <div v-if="!name_valid" style="color: red">The name needs to be set</div>

          Where is it?
          <select v-model="place">
            <option v-for="v in venues" :value="v">
              {{v}}
            </option>
          </select>

          When does it start?
          <div>
          <input type="date"
            style="width:40%"
            v-model="start_date"
          />
          
          at
          <input type="time"
            style="width:40%"
            v-model="start_time"
          />
          
          </div>

          <base-button 
            :content="'Submit'" 
            :enabled="valid"
            @clicked="submit"/>

    </div>
  `
});