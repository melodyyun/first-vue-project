// root state or data is synced to all component (single state)
// other components' state will only affect themselves (local state)

const app = new Vue({
  el: "#app",
  data: {
    search: "",
    message: "Good morning, have a 🥐",
    // food: [
    //   { name: "Pizza", icon: "🍕" },
    //   { name: "Hotdog", icon: "🌭" },
    //   { name: "Burger", icon: "🍔" },
    //   { name: "Bacon", icon: "🥓" },
    //   { name: "Pancakes", icon: "🥞" },
    //   { name: "Taco", icon: "🌮" },
    //   { name: "Fries", icon: "🍟" }
    // ],
    sort_modifier: 1,
    concerts: []
  },
  components: {
    ConcertView
  },
  created(){
    this.getConcerts();
    this.$on('new-concert', concert => {
      this.concerts.push(concert);
    })
  },
  //computed helps to already define variable for you so you don't need to  definein data
  computed: {
    // filtered_food() {
    //   return (
    //     this.food
    //       // filter to make sure what user is searching matches anything in the array
    //       .filter(
    //         f => f.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
    //       )
    //       .sort((a, b) => {
    //         // sort alphabetically
    //         if (a.name > b.name) return this.sort_modifier;
    //         if (a.name < b.name) return -1 * this.sort_modifier;
    //         return 0;
    //       })
    //   );
    // },
    filtered_concerts() {
      return (
        this.concerts
          // filter to make sure what user is searching matches anything in the array
          .filter(
            f => f.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
          )
          .sort((a, b) => {
            // sort alphabetically
            if (a.name > b.name) return this.sort_modifier;
            if (a.name < b.name) return -1 * this.sort_modifier;
            return 0;
          })
      );
    },
    sort_btn_text() {
      return this.sort_modifier > 0 ? "A-Z" : "Z-A";
    },
    venues() {
      const set = {}
      for(let i = 0; i< this.concerts.length; i++){
        set[this.concerts[i].place.name] = true;
      }
      return Object.keys(set);
    }
  },
  // methods responds to input or something happening helps makes things more reuseable
  methods: {
    toggleSort() {
      this.sort_modifier = -1 * this.sort_modifier;
    },
    getConcerts() {
      fetch(
        "https://gist.githubusercontent.com/nchudleigh/92637a91938b16e105105de3ee91a569/raw/bbb5b1d549847e74afca77c2cfa3b514585678ad/events.json"
      )
        .then(r => {
          return r.json();
        })
        .then(r => {
          console.table(r);
          this.concerts = r;
        });
    }
  }
});