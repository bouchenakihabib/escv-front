import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/mes-cvs",
    name: "cvs",
    component: () => import("./components/CvsList")
  },
  {
    path: "/mes-cvs/:name",
    name: "cv-details",
    component: () => import("./components/Cv")
  },
  {
    path: "/upload-cv",
    name: "add",
    component: () => import("./components/AddCv")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;