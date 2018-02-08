import Vue from 'vue'

export default {
  getFrequency (keyword) {
    return Vue.http.get('http://139.59.235.227:5005/SDG_FC/' + keyword)
      .then(response => {
        return response.data
      }, response => {
        return response.data.error
      })
  }
}
