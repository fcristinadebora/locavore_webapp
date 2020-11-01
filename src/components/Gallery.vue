<template>
  <div>
    <lingallery v-if="images.length > 0" :mobile-height="400" :responsive="true" :height="height" :items="images"></lingallery>
  </div>
</template>

<script>
import Lingallery from "lingallery";

export default {
  components: { Lingallery },

  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },

  data() {
    return {
      height: 400,
    }
  },
}
</script>