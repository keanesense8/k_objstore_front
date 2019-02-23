<template>
  <div>
    <h1>{{this.$route.params.id }} : {{this.$route.params.path}}</h1>

    <v-container align-center grid-list-sm fluid text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="folder in folders" xs2 align-text-center>
          <vdirectory :name="folder" :bucket="bucket" pathto="/gslb/program/FDN/" v-on:folderChange="getFilesByPath"></vdirectory>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import vdirectory from "@/components/Directory";

export default {
  data() {
    return {
      folders: []
    };
  },
  computed: {
    bucket() {
      console.log("return : " + this.$route.params.id);
      return this.$route.params.id;
    }
  },
  components: {
    vdirectory
  },
  mounted() {
    // console.log(this.$data.items);
    this.init();
    this.$on("folderChange" , (folder) => {
        console.log("folderChange: " + folder)
    })
  },
  methods: {
    init() {
      let key = this.$route.params.path;
      console.log("key:" + key);
      this.getFilesByPath(key);
    },
    getFilesByPath(path) {
      this.$http.get("/api/fileList").then(response => {
        let filterRes = response.data.filter((n, i) => {
          return n.path === path;
        });
        console.log(filterRes);
        if (filterRes.length !== 0) {
          this.$data.folders = filterRes[0].files;
        }
      });
    }
  }
};
</script>

<style>
</style>
