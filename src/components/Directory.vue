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
    <v-img src="icons/folder.png" height="96px" width="100px" aspect-ratio="0.7"></v-img>

    <span class="title font-weight-light">{{name}}</span>
  </v-card>
</template>

<script>
export default {
  props: {
      name: String,
      bucket: String,
      pathto: String
  },
  methods: {
    changeDir() {
      console.log("goto : " + this.$props.pathto);
      // console.log("encoder" + encodeURIComponent("/"))
      this.$router.replace(
        "/bucket/" +
          this.$props.bucket +
          "/path/" +
          encodeURIComponent(this.$props.pathto)
      );
      this.$emit("folderChange" , this.$props.pathto)
    }
  }
};
</script>

<style>
</style>
