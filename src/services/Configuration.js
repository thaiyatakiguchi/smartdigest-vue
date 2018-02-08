import Vue from 'vue'

export default {
  getAllInstance (keyword) {
    return Vue.http.get('http://139.59.235.227:5005/getallinstance/')
      .then(response => {
        return response.data
      }, response => {
        return response.data.error
      })
  },
  createInstance ( url, time, instance_name ) {
    return Vue.http.post('http://139.59.235.227:5005/instant')
      .then(response => {
        return response.data
      }, response => {
        return response.data.error
      })
  }
}
