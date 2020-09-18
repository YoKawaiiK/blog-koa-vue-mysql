<template>
    <div>
        

        <article class="articles">
        <div class="column is-8 is-offset-2">
          <!-- START ARTICLE -->
          <div class="card article">
            <div class="card-content">
              <div class="media">  
                <div class="media-content has-text-centered">
                  <p v-show="getUser_id != $route.params.user_id"
                  class="title article-title">@{{userLogin}}</p>
                  <div class="tags has-addons level-item">
                    <span class="tag">{{post.date}}</span>
                  </div>
                </div>
              </div>
              <div class="content article-body">
                <p> {{post.message}} </p>
              </div>
                <footer v-show="getUser_id == $route.params.user_id &&
                getUser_id
                "
                class="card-footer">
                    <!-- <a href="#" class="card-footer-item">Комментировать</a> -->
                    <span @click="$emit('child-edit-message', {post_id: post.post_id, message: post.message})"
                    class="card-footer-item button">Изменить</span>
                    <span @click="actionPostDelete(post.post_id)"
                    class="card-footer-item button">Удалить</span>
                </footer>
            </div>
          </div>
          <!-- END ARTICLE -->
        </div>
      </article>

    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'post',
    props: ['post', 'user-login'],
    computed: {
      ...mapGetters('cookiesState', ['getUser_id'])
    },
    methods: {
      ...mapActions('posts', ['actionPostDelete']),

    }
}
</script>