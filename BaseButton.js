const BaseButton = Vue.component("base-button", {
  props: {
    content: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  //different from data in app this one is local
  data() {
    return {
      loading: false
    };
  },

  computed: {
    background_class() {
      return {
        "loading-background": this.loading,
        'disabled-background': !this.enabled
        //'button-outline': true
      };
    }
  },

  methods: {
    click() {
      if(!this.enabled) return;

      this.loading = true;
      setTimeout(() => {
        this.$emit("clicked");
        this.loading = false;
      }, 1000);
    }
  },

  template: `
        <div class="button" 
        @click="click"
        :class="background_class">
            {{content}}
        </div>
    `
});