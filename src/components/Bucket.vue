<template>
  <div>
    <!-- https://vuetifyjs.com/en/components/breadcrumbs -->
    <!-- <h1>{{bucket}} : {{this.$route.params.path}}</h1> -->
    <!-- <v-breadcrumbs :items="items" divider=">" @click="bread"></v-breadcrumbs> -->
    <span>{{bucket}} : </span><bread_crumb :items="items"></bread_crumb>
    <!-- <v-btn small color="primary" @click="detail = true">Primary</v-btn> -->
    <v-container align-center grid-list-sm fluid text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="f in files" xs2 align-text-center>
          <vdirectory :name="f.name" :bucket="bucket" :filetype="f.type" @showDetail="showDetail"></vdirectory>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="detail" max-width="500px">
      <v-card>
        <v-card-title>
          <span> FilePath : {{ detailContent }}</span>
          <v-spacer></v-spacer>
          <v-menu bottom left>
            <v-btn slot="activator" icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-menu>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" small @click="detail=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { ACTION_NAMES } from "@/store/action_name";
import vdirectory from "@/components/Directory";

import bread_crumb from "@/components/Breadcrumb"

export default {
  data() {
    return {
      fileDetail: false,
      folders: [],
      detail: false ,
      detailContent : ''
     
    };
  },
  computed: {
    bucket() {
      // console.log("return : " + this.$route.params.id);
      return this.$route.params.id;
    },
    items(){
       let pathArr = this.$route.params.path.split('/')
      //  console.log(pathArr)
       let retItems = [] 
       let pathEleParamPath = ''
       for(let idx in pathArr){
          if(pathArr[idx] === ''){
            pathEleParamPath += '/'
            continue
          }
          pathEleParamPath += pathArr[idx] + '/'
          retItems.push({
              text: pathArr[idx],
              disabled: false,
              // ref:   ""
              href:   "/bucket/" + this.bucket + "/path/" + encodeURIComponent(pathEleParamPath)
          })
       }
      return retItems
    },
    ...mapGetters({ files: "getFiles", bucket: "getBucket" })
  },
  components: {
    vdirectory,
    bread_crumb
  },
  mounted() {
    // console.log(this.$data.items);
    this.init();
    this.$on("folderChange", folder => {
      console.log("folderChange: " + folder);
    });
  },
  methods: {
    init() {
      let key = this.$route.params.path;
      // console.log("key:" + key);
      this.getFilesByPath(key);
    },
    getFilesByPath(path) {
      this.$store.dispatch(ACTION_NAMES.CHANGE_DIR, path);
    },
    showDetail(filePath){
        // console.log("show detail :" + filePath)
        this.$data.detail = true
        this.$data.detailContent = filePath
    },
    bread(){
      console.log("bread")
    }
  }
};
</script>

<style>
</style>
