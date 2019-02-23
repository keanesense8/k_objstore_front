<template>
  <div>
    <h1>{{bucket}} : {{this.$route.params.path}}</h1>

    <v-container align-center grid-list-sm fluid text-xs-center>
      <v-layout row wrap>
        <v-flex v-for="f in files" xs2 align-text-center>
          <vdirectory :name="f.name" :bucket="bucket"  :filetype="f.type"></vdirectory>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { ACTION_NAMES } from "@/store/action_name";
import vdirectory from "@/components/Directory";

export default {
  data() {
    return {
      fileDetail: false,
      folders: []
    };
  },
  computed: {
    bucket() {
      console.log("return : " + this.$route.params.id);
      return this.$route.params.id;
    },
    ...mapGetters({files :'getFiles' , bucket: "getBucket"})
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
      // console.log("key:" + key);
      this.getFilesByPath(key);
    },
    getFilesByPath(path) {
       this.$store.dispatch(ACTION_NAMES.CHANGE_DIR , path)
    }
  }
};
</script>

<style>
</style>
