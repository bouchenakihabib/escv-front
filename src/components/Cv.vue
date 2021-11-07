<template>
  <div v-if="currentCv" class="col-md-6">
    <h4>CV</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentCv[0].name }} 
        </div>
        <div>
          <label><strong>Content:</strong></label> {{ currentCv[0].content }}
        </div>

    <button class="badge badge-danger mr-2"
      @click="deleteCv()"
    >
      Delete
    </button>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Cv...</p>
  </div>
</template>

<script>
import CvDataService from "../services/CvDataService";

export default {
  name: "cv-details",
  data() {
    return {
      currentCv: null,
    };
  },
  methods: {
    getCv(name) {
      CvDataService.findByName(name)
        .then(response => {
          this.currentCv = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCv() {
      CvDataService.deleteById(this.currentCv[0].cvId)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "cvs" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getCv(this.$route.params.name);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>