<template>
  <div>
    <section class="hero is-success is-bold is-medium is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">@{{getUserLogin}}</h1>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- START ARTICLE FEED -->

      <div v-if="getTotalPosts == 0">
        <br />
        <h2 class="title is-2 has-text-centered">Здесь ничего нет...</h2>
      </div>

      <div v-else class="posts" v-for="(post, index) in getPosts" 
      :key="`${index}-${post.post_id}`">
        <component-post v-on:child-edit-message="editMessage"
        v-bind:user-login="getUserLogin" v-bind:post="post"></component-post>
      </div>

      <button
        v-show="getAuth != false && writePost == false"
        @click="writePost = !writePost"
        class="button is-success is-outlined is-fixed-button is-large"
      >
        <!-- <span class="icon is-medium"> -->
        <font-awesome-icon icon="plus" />
        <!-- </span> -->
      </button>

      <b-modal v-model="writePost">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <textarea
                v-model="message"
                class="textarea"
                id
                cols="30"
                rows="11"
                style="resize: none"
              ></textarea>
            </div>
            <div class="field is-grouped">
              
              <p class="control">
                <button v-if="update == false" 
                @click="postInsert()" class="button is-success">Добавить</button>
                <button v-else @click="postUpdate()" class="button is-warning"> Обновить</button>
              </p>

              <p class="control">
                <button @click="$emit('close')" class="button">Cancel</button>
              </p>
            </div>
          </div>
        </div>
      </b-modal>
      <br>
      <div v-if="getTotalPosts != 0">
        <b-pagination 
        :total="getTotalPosts"
        :current.sync="current"
        range-before="2"
        range-after="2"
        order="is-centered"
        size="is-medium"
        :per-page="10"
        @change="pageChange"
      ></b-pagination>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import componentPost from "../components/componentPost";
export default {
  name: "posts",
  data() {
    return {
      writePost: false,
      update: false,
      post_id: null,
      message: "",
      current: 1,
      // Для обновления записи
    };
  },
  computed: {
    ...mapGetters("posts", ["getPosts", "getUserLogin", "getTotalPosts"]),
    ...mapGetters("cookiesState", ["getAuth", 'getUser_id']),
    pagination: () => {
      return this.getTotalPosts / 10;
    },
  },
  methods: {
    ...mapActions("posts", ["actionGetPosts", "actionPostInsert", "actionPostUpdate"]),
    postInsert() {
      this.actionPostInsert({
        message: this.message,
        pagination: this.$route.params.pagination,
      });
      this.writePost = false;
      this.message = '';
    },
    createDataPagination() {
      return {
        user_id: this.$route.params.user_id,
        pagination: this.current,
        $routeParamLogin: this.$route.params.user_id,
      }
    },
    pageChange(value) { 
      this.current = value
      this.$router.push({
        name: 'posts', 
        params: {user: this.getUser_id, pagination: this.current}
      })
      let data = this.createDataPagination()
      this.actionGetPosts(data);
    },

    clearModalEdit() {
      this.writePost = false;
      this.update = false;
      this.message = '';
      this.post_id = ''
    },

    editMessage(post) {
      this.writePost = true;
      this.update = true;
      this.post_id = post.post_id;
      this.message = post.message;
    },
    postUpdate() {
      this.actionPostUpdate({
        message: this.message,
        post_id: this.post_id
      });
      this.clearModalEdit();
    },


  },
  mounted() {
    let pagination = +this.$route.params.pagination;
    if (pagination == 0) {
      pagination = 1

      this.$router.push({
        name: 'posts', 
        params: {pagination: this.current}
      })
    }
    this.current = pagination;
    let data = this.createDataPagination()

    this.actionGetPosts(data);
  },
  components: {
    "component-post": componentPost,
  },
};
</script>

<style>
.is-fixed-button {
  position: fixed !important;

  z-index: 101;
  bottom: 60px;
  right: 15px;
}
</style>