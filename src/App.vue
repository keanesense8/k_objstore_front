<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed clipped class="grey lighten-4" app v-model="drawer">
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
 
          </v-layout>
          <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
          <v-list-tile :key="i" v-else @click="bucket(i)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="grep" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">
        Object&nbsp;
        <span class="text">Store</span>
      </span>
      <v-text-field solo-inverted flat label="Search" prepend-icon="search"></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container class="#F5F5F5">
      
            <router-view/>
 
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: null,
    items: []
  }),
  mounted() {
    // console.log(this.$data.items);
    this.init();
  },
  methods: {
    init() {
      console.log("init");
      // this.$data.items = [
      //   { heading: "Buckets" },
      //   { icon: "archive", text: "bucket1" },
      //   { divider: true },
      //   { icon: "archive", text: "bucket2" }
      // ];

      this.$http.get("api/buckets").then(response => {
        // console.log('get from api :' + response.data)
        let futureItems = [{ heading: "Buckets" }];
        // console.log(response.data.files);
        for (let f in response.data) {
          futureItems.push({ icon: "archive", text: response.data[f] });
        }

        this.$data.items = futureItems;
      });
     
    },
    bucket(index){
      console.log('bucket : ' + this.items[index].text)
      this.$router.push('/bucket/' + this.items[index].text + "/path/"  + encodeURIComponent("/"))
    }
  }
};
</script>
