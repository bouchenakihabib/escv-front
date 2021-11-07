<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by keywords"
          v-model="keyword"  v-on:keyup.enter="search()"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="search()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>CV's List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(cv, index) in cvs"
          :key="index"
          @click="setActiveCv(cv, index)"
        >
          {{ cv.name }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCvs()">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCv">
        <h4>CV</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentCv.name }}
        </div>
        <div>
          <label><strong>Content:</strong></label> {{ currentCv.content }}
        </div>
        <router-link :to="'/mes-cvs/' + currentCv.name" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Cv...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CvDataService from "../services/CvDataService";

export default {
  name: "cvs-list",
  data() {
    return {
      cvs: [],
      currentCv: null,
      currentIndex: -1,
      keyword:"",

      page: 1,
      count: 0,
      pageSize: 3,

      pageSizes: [3,6,9]
    };
  },
  methods: {
    retrieveCvs() {
       CvDataService.getAll()
        .then(response => {
          this.cvs = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCvs();
      this.currentCv = null;
      this.currentIndex = -1;
    },

    setActiveCv(cv, index) {
      this.currentCv = cv;
      this.currentIndex = cv ? index : -1;
    },
    removeAllCvs() {
      CvDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
          this.$forceUpdate();
        })
        .catch(e => {
          console.log(e);
        });
        this.$forceUpdate();
    },
    search() {
      CvDataService.search(this.keyword)
        .then(response => {
          this.cvs = response.data;
          this.setActiveCv(null);
          console.log(response.data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveCvs();
    }
  },
  mounted() {
    this.retrieveCvs();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>