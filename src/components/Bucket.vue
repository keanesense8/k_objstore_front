<template>
  <div>
    <!-- https://vuetifyjs.com/en/components/breadcrumbs -->
    <!-- <h1>{{bucket}} : {{this.$route.params.path}}</h1> -->
    <!-- <v-breadcrumbs :items="items" divider=">" @click="bread"></v-breadcrumbs> -->
     <v-container grid-list-md text-xs-left drak>
          <v-layout row wrap>
            <v-flex xs12>
             <span>Bucket : {{bucket}}</span>
            </v-flex>
            <!-- <v-flex xs12>
               <span>Current Path : {{bucket}}</span>
            </v-flex> -->
            <v-flex xs12>
               <span>File Counts : {{count}}</span>
            </v-flex>
           
          </v-layout>
        </v-container>
   
    
      <v-container grid-list-md text-xs-left>
        <v-layout row warp>
          <v-flex xs2>
            <span style="font-size: 200%;">Path:</span>
          </v-flex>
          <v-flex xs6>
            <v-text-field solo-inverted flat label="Search" @keydown="changePath"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
   
    <!-- <bread_crumb :items="items"></bread_crumb> -->
    <!-- <v-btn small color="primary" @click="detail = true">Primary</v-btn> -->
    <!-- {{files}} -->
    <v-container v-if="files.length !== 0" align-center grid-list-sm fluid text-xs-center>
      <v-layout   row wrap>
        <v-flex  v-for="f in files" xs2 align-text-center>
          <vdirectory
            :name="f.name"
            :bucket="bucket"
            :filetype="f.type"
            :pathto="f.path"
            @showDetail="showDetail"
          ></vdirectory>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else align-center grid-list-sm fluid text-xs-center>
      <v-layout   row wrap>
        <v-flex xs12>
            <template>
              <div><h1>Empty</h1></div>
              
            </template>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-dialog v-model="detail" max-width="700px" color="red">
      <v-card>
        <v-container grid-list-md text-xs-left drak>
          <v-layout row wrap>
            <v-flex xs12>
              <span>Name: {{detailContent.name}}</span>
            </v-flex>
            <v-flex xs12>
              <span>Path: {{detailContent.path}}</span>
            </v-flex>
            <v-flex xs12>
              <span>Type: {{detailContent.type}}</span>
            </v-flex>
            <v-flex xs12>
              <v-btn color="primary" small @click="detail=false">Close</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { ACTION_NAMES } from "@/store/action_name";
import vdirectory from "@/components/Directory";

import bread_crumb from "@/components/Breadcrumb";

export default {
  data() {
    return {
      fileDetail: false,
      folders: [],
      detail: false,
      detailContent: {
        name: "",
        path: "",
        type: ""
      }
    };
  },
  computed: {
    bucket() {
      // console.log("return : " + this.$route.params.id);
      return this.$route.params.id;
    },
    count(){
      return this.files.length
    },
    items() {
      let pathArr = this.$route.params.path.split("/");
      //  console.log(pathArr)
      let retItems = [];
      let pathEleParamPath = "";
      for (let idx in pathArr) {
        if (pathArr[idx] === "") {
          pathEleParamPath += "/";
          continue;
        }
        pathEleParamPath += pathArr[idx] + "/";
        retItems.push({
          text: pathArr[idx],
          disabled: false,
          // ref:   ""
          href:
            "/bucket/" +
            this.bucket +
            "/path/" +
            encodeURIComponent(pathEleParamPath)
        });
      }
      return retItems;
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
    // this.$on("folderChange", folder => {
    //   console.log("folderChange: " + folder);
    // });
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
    showDetail(fileEle) {
      // console.log("show detail :" + filePath)
      this.$data.detail = true;
      this.$data.detailContent = fileEle;
    },
    bread() {
      console.log("bread");
    },
    changePath(event) {
      if (event.which === 13) {
        console.log("textinput :" + event.target.value);
        let v = event.target.value
        if(v === ''){
          v = '_'
        }
        this.getFilesByPath(v)
        // this.$parent.$emit("changeArea", event.target.value);
        // use   this.$on('changeArea', msg => this.chArea(msg)); in the parent
      }
    }
  }
};
</script>

<style>
</style>
