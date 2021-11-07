import http from "../../http-common";


class CvDataService {
  getAll() {
    return http.get(`/getAll`);
  }

  get(id) {
      return http.get(`/get/${id}`);
  }

  findByName(name) {
    return http.get(`/findByName/${name}`);
  }
  search(pattern) {
    return http.get(`/find/${pattern}`);
  }

  upload(file, onUploadProgress){

    return http.post(`/add`,file, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  deleteById(cvId) {
    return http.delete(`/removeById/${cvId}`);
  }

  deleteByName(name) {
      return http.delete(`/removeByName/${name}`);
  }

  deleteAll() {
    return http.delete(`/removeAll`);
  }
}

export default new CvDataService();