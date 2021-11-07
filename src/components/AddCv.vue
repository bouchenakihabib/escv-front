<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload($event)"/>
      </label>
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
      <br>
      <button v-on:click="submitFile()">Submit</button>
    </div>
    <div class="success" v-if="submitted"> 
      {{ this.text }} 
      <button class="btn btn-success" @click="newCV()">Add</button>
    </div>
  </div>
</template>

<script>

import CvDataService from "../services/CvDataService";

export default {
  name: "upload-cv",
  data(){
    return {
      file: '',
      submitted: false,
      progress: 0,
      text: "upload succesful !"
    }
  },
  methods: {
      handleFileUpload( event ){
        this.file = event.target.files[0];
        this.progress = 0;
      },
      submitFile() {
        let formData = new FormData();

        formData.append('file',this.file);


        CvDataService.upload(formData,(event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
        })
        .then(response =>{
          this.submitted = true;
					console.log(response.data);
				})
				.catch(e => {
          this.progress = 0;
					console.log(e);
				});
    },
    newCV() {
      this.submitted = false;
      this.file = '';
      this.progress = 0;
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>