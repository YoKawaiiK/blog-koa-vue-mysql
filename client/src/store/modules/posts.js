import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        posts: [],
        totalPosts: null,
        userLogin: ''
    },
    getters: {
        getPosts(state) {
            return state.posts;
        },
        getUserLogin(state) {
            return state.userLogin;
        },
        getTotalPosts(state) {
            return state.totalPosts
        }
    },
    mutations: {
        postDelete(state, post_id) {
            state.posts.forEach( (post, i, posts) => {
                if(posts[i].post_id == post_id) {
                    state.posts.splice(i, 1);
                }
            })
            state.totalPosts-- 
        },
        postInsert(state, post) {
            state.posts.unshift(post)
            
        },
        totalPosts(state) {
            state.totalPosts++
        },
        postUpdate(state, post) {
            state.posts.forEach( (itemPost, i, posts) => {
                if (posts[i].post_id == post.post_id) {
                    state.posts[i].message = post.message;
                }
            })
        }
    },
    actions: {
        async actionGetPosts({state, dispatch}, data) {
            Vue.axios.put(`/api/posts/user/${data.user_id}/pagination/${data.pagination}`)
            .then(response => {
                if (response.data.errorPosts) {
                    dispatch('message/errorPosts', null ,{root: true})
                } 
                else {
                    
                    if (
                        state.totalPosts == null
                        ) 
                    {
                        state.totalPosts = response.data.totalPosts;
                    }

                    state.posts = response.data.posts;
                    state.userLogin = response.data.userLogin;
                }
            })
        },
        async actionPostDelete({commit, dispatch, getters}, post_id) {
            let response = await Vue.axios.post('/api/delete', {post_id: post_id})
            if (response.data.postDeletedError) {
                await dispatch('message/postDeletedError', null, {root: true})
            }
            else { 
                let responseOneLastPost = await Vue.axios
                .post('/api/post', {post_id: getters.getPosts[0].post_id})

                if (responseOneLastPost.data.error) {
                    await dispatch('message/postDeletedError', null ,{root: true}) 
                    return false
                } 
                await commit('postDelete', post_id)
                    
                // Вставить в начало списка 1 элемент 
                if (responseOneLastPost.data.post_id) {
                    await commit('postInsert', responseOneLastPost.data)
                }
                await dispatch('message/postDeleted', null, {root: true})
            }
        },
        async actionPostInsert({commit, dispatch, getters}, data) {
            let response = await Vue.axios.post('/api/insert', {message: data.message})
            if (response.data.post_id) {
                if (data.pagination == 1) {
                // Если это pagination = 0
                    // Удалить последний элемент
                    if (getters.getPosts.length == 9) {
                        let lastPost_id = getters.getPosts[getters.getPosts.length - 1].post_id
                        commit('postDelete', lastPost_id)  
                    }
                    // Поставить добавленный элемент в начало

                    commit('postInsert', response.data)
                }   
                    // Увеличить общее число постов
                    commit('totalPosts')
                await dispatch('message/insertPost', null, {root: true})
            }
            else if (response.data.error) {
                await dispatch('message/postDeleted', null, {root: true})
            }
            else {
                await dispatch('message/error', null, {root: true})
            }
        },
        async actionPostUpdate({dispatch, commit}, post) {
            let response = await Vue.axios.patch('/api/update', post)
            if (response.data.postUpdated) {
                commit('postUpdate', post)
            }
            else if (response.data.updateLengthError) {
                dispatch('message/updateLengthError', null, {root: true})
            }
            else if (response.data.errorParse) {
                dispatch('message/errorParse', null, {root: true})
            }
            else {
                dispatch('message/errorUpdate', null, {root: true})
            }
        }
    }
}