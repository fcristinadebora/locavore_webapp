<template>
  <div class="col-12">
    <div v-if="currentFile" class="progress">
      <div
        class="progress-bar progress-bar-success bg-gradient progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
      </div>
    </div>

    <label class="btn btn-default overflow-hidden">
      <input type="file" ref="file" @change="selectFile" />
    </label>

    <button
      class="btn btn-sm btn-success"
      :disabled="!selectedFiles"
      @click="upload"
      type="button"
    >
      Upload
    </button>
    <div class="alert alert-light" role="alert">{{ message }}</div>
  </div>
</template>

<script>
import fileUpload from "@/common/fileUpload";

export default {
  props: {
    targetUrl: { type: String },
  },

  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  },

  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },

    upload() {
      this.progress = 0;

      this.currentFile = this.selectedFiles.item(0);
      this.message = "Enviando arquivo...";
      fileUpload(
          this.currentFile,
          (event) => {
            this.progress = Math.round((100 * event.loaded) / event.total);
          },
          this.targetUrl
        )
        .then((response) => {
          this.$emit("upload", response);
          this.message = 'Arquivo enviado com sucesso';
        })
        .catch((error) => {
            console.log(error)
          this.progress = 0;
          this.message = "Falha ao enviar o arquivo";
          this.currentFile = undefined;
          this.$emit("upload", error);
        });

      this.selectedFiles = undefined;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress{
    height: 3px!important;
}
</style>