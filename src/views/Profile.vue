<template>
  <page>
    <span slot="content">
      <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
      >
        <h1 class="h4">Meu Perfil</h1>

        <button class="btn btn-warning btn-sm">
          <i class="fa fa-edit"></i> Editar
        </button>
      </div>

      <div class="row justify-content-center">
        <div class="col-4 overflow-auto rounded-circle" :style="'background: url(' + require('@/assets/img/profile.jpg')+ '); background-size:cover; background-position: center; height:' + profileImageHeightPx"
            ref="profileimg">
        </div>
        <div class="col-7 pl-4 pt-4 h5">
          <span>
            <strong>
              Debora Cristina
            </strong><br><br>
            fcristinadebora@gmail.com
          </span>
        </div>
      </div>
    </span>
  </page>
</template>

<script>
import Page from "@/components/Page";
export default {
  components: {
    Page,
  },

  data() {
    return {
      profileImageHeight: "0px",
    };
  },

  computed: {
    profileImageHeightPx() {
      return this.profileImageHeight;
    },
  },

  created() {
    window.addEventListener("resize", this.setProfileImageHeight);
  },

  mounted() {
    this.setProfileImageHeight();
  },

  methods: {
    setProfileImageHeight() {
      this.profileImageHeight = this.$refs.profileimg.clientWidth + "px";
      console.log(this.$refs.profileimg.clientWidth);
    },
  },
};
</script>