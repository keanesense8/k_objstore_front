<template>
  <v-card
    flat
    color="#F5F5F5"
    height="118px"
    width="100px"
    hover
    @click="changeDir"
    text-align-center
    to
  >
    <v-img :src="srcIcon" height="96px" width="100px" aspect-ratio="0.7"></v-img>

    <span class="title font-weight-light">{{name}}</span>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { ACTION_NAMES } from "@/store/action_name";

export default {
  props: {
    name: String,
    bucket: String,
    pathto: String,
    filetype: String
  },
  computed: {
    srcIcon() {
      let type = this.$props.filetype;
      //  console.log("suffix:" + suffix.includes("\."))
      //  if(fileName.includes("\.")){
      //     let suffix = fileName.substring(fileName.indexOf("\.") + 1 , fileName.length)
      //     return "icons/" + suffix + ".png"
      //  }
      return "icons/" + type + ".png";
      //  return "icons/dir.png"
    }
  },
  methods: {
    changeDir() {
      // console.log("goto : " + this.$props.pathto);
      // console.log("encoder" + encodeURIComponent("/"))
      if (this.$props.filetype === "dir") {
        let goto = this.$route.params.path + this.$props.name + "/";
        console.log("goto:" + goto);
        this.$router.replace(
          "/bucket/" + this.$props.bucket + "/path/" + encodeURIComponent(goto)
        );
        // this.$emit("folderChange" , this.$props.pathto)
        this.$store.dispatch(ACTION_NAMES.CHANGE_DIR, goto);
      }else{
        console.log("show detail")
      }

    }
  }
};
</script>

<style>
</style>
