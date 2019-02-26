<template>
  <div>
    <!-- https://vuetifyjs.com/en/components/breadcrumbs -->
    <!-- <h1>{{bucket}} : {{this.$route.params.path}}</h1> -->
    <!-- <v-breadcrumbs :items="items" divider=">" @click="bread"></v-breadcrumbs> -->
    <v-container grid-list-md text-xs-left drak>
      <v-layout row wrap>
        <v-flex xs12>
          <span>Bucket : {{bucket}}   |   File Counts :</span>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated delay=1 jackInTheBox"
           
          >
            <span :key="count" style="color:#a169bd">{{count}}</span>
          </transition>
        </v-flex>
        <!-- <v-flex xs12>
               <span>Current Path : {{bucket}}</span>
        </v-flex>-->
      </v-layout>
    </v-container>

    <v-container grid-list-md text-xs-left>
      <v-layout row warp>
        <v-flex xs3>
          <span>SearchPath:</span>
        </v-flex>
        <v-flex xs6>
          <v-text-field solo-inverted flat label="Search" @keydown="changePath" :value="searchValue"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <bread_crumb :items="breaditems"></bread_crumb>
    <!-- <v-btn small color="primary" @click="detail = true">Primary</v-btn> -->
    <!-- {{files}} -->
    <v-divider></v-divider>
    <v-container v-if="files.length !== 0" align-center grid-list-sm fluid text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="f in files" xs2 align-text-center>
          <transition-group name="list-complete" tag="p">
            <vdirectory
              :key="f.name"
              :name="f.name"
              :bucket="bucket"
              :filetype="f.type"
              :pathto="f.path"
              :size="f.size"
              @showDetail="showDetail"
              class="list-complete-item"
            ></vdirectory>
          </transition-group>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else align-center grid-list-sm fluid text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <template>
            <div>
              <h1>Empty</h1>
            </div>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
    <transition name="fade">
      <!-- -->
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
                <span>Size: {{detailContent.size}} Bytes</span>
              </v-flex>
              <v-flex xs12>
                <v-btn color="primary" small @click="detail=false">Close</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </transition>
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
        type: "",
        size: 0
      }
    };
  },
  computed: {
    bucket() {
      // console.log("return : " + this.$route.params.id);
      return this.$route.params.id;
    },
    count() {
      return this.files.length;
    },
    searchValue(){
      return this.$store.getters.getCurrentPath
    },
    breaditems() {
      // let pathArr = this.$route.params.path.split("/");

      let pathArr = this.$store.getters.getCurrentPath.split("/");
      //  console.log(pathArr)
      let retItems = [
        {
          text: "bucket",
          disabled: false,
          href: "/"
        }
      ];
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
          href: pathEleParamPath
        });
      }
      // console.log(retItems)
      return retItems;
    },
    ...mapGetters({ files: "getFiles", bucket: "getBucket" })
  },
  watch: {
    count: function(newValue, oldValue) {}
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
        let v = event.target.value;
        if (v === "") {
          v = "_";
        }
        this.getFilesByPath(v);
        // this.$parent.$emit("changeArea", event.target.value);
        // use   this.$on('changeArea', msg => this.chArea(msg)); in the parent
      }
    }
  }
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/animate.css@3.5.1");
span {
  font-size: 200%;
}
.list-complete-item {
  transition: all 0.5s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
