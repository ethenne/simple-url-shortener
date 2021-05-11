<template>
  <div>
    <div class="row">
      <div class="col col-12 offset-0 mt-2">
        <h1 class="text-center text-primary">
          Create your pretty short link
        </h1>
      </div>
    </div>

    <div class="col col-8 align-middle mt-5 offset-2">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="submit(url)">
            <div class="form-group">
              <label for="url">Enter URL</label>
              <textarea
                type="url"
                class="form-control"
                v-model="url"
                style="height: 150px"
              />
            </div>
            <div class="for-group" v-show="shortUrl">
              <p>
                Short URL:
                <a
                  :href="shortUrl"
                  class="text-primary"
                  @click="clear">{{ shortUrl }}
                </a>
              </p>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" type="submit">Shorten URL</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: () => {
    return {
      url: "",
      shortUrl: "",
    };
  },
  methods: {
    async submit(url) {
      try {
        const api = "http://localhost:5000/shorten/url";
        const { data } = await axios.post(api, { url });
        this.shortUrl = data.shortURL;
      } catch (error) {
        console.log(error);
      }
    },
    clear(){
      this.url = "";
    }
  },
};
</script>

