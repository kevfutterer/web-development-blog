import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get(process.env.baseUrl + "/posts.json")
        .then(res => {
          const postsArray = [];
          for (const key in res.data) {
            postsArray.push({...res.data[key], id: key})
          }
          vuexContext.commit('setPosts', postsArray)
        })
        .catch(e => context.error(e))
      },
      addPost(vuexContext, post) {
        const createdPost = { ...post, updatedDate: new Date() }
        return axios
				.post(
					"https://nuxt-blog-e0b7b-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth="+vuexContext.state.token, createdPost)
				.then((res) => {
          vuexContext.commit('addPost', {...createdPost, id: res.data.name})

        })
				.catch((e) => {
					console.log(e);
				});
      },
      editPost(vuexContext, editedPost) {
        return axios
				.put(
					"https://nuxt-blog-e0b7b-default-rtdb.europe-west1.firebasedatabase.app/posts/" +
						editedPost.id +
						".json?auth=" + vuexContext.state.token,
					editedPost
				)
        .then(res => {
          vuexContext.commit('editPost', editedPost)
        })
				.catch((e) => console.log(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
				process.env.fbAPIKey;
			if (!authData.isLogin) {
				authUrl =
					"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
					process.env.fbAPIKey;
			}
			return this.$axios
				.$post(authUrl, {
					email: authData.email,
					password: authData.password,
					returnSecureToken: true,
				})
				.then((result) => {
          vuexContext.commit('setToken', result.idToken)
          localStorage.setItem('token', result.idToken)
          localStorage.setItem('tokenExpiration', new Date().getTime() + result.expiresIn*1000)
          Cookie.set('jwt', result.idToken)
          Cookie.set('expirationDate', new Date().getTime() + +result.expiresIn*1000)
          vuexContext.dispatch('setLogoutTimer', result.expiresIn * 1000)
				})
				.catch((e) => {
					console.log(e);
				});
      },
      setLogoutTimer(vuexContext ,duration) {
        setTimeout(() => {
          vuexContext.dispatch('logout')
          // vuexContext.commit('clearToken')
        }, duration)
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return 
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split("=")[1]
        } else if (process.client) {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        } 
        if (new Date().getTime() > +expirationDate || !token) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
        vuexContext.commit('setToken',  token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');
        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        }
      }
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       vuexContext.commit('setPosts', [
      //           {
      //             id: "1",
      //             title: "First Post",
      //             previewText: "This is my first post!",
      //             thumbnail:
      //               "https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?fit=bounds&format=jpg&width=960",
      //           },
      //           {
      //             id: "2",
      //             title: "Second Post",
      //             previewText: "This is my second post!",
      //             thumbnail:
      //               "https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/The-10-Tech-Trends-That-Will-Transform-Our-World/960x0.jpg?fit=bounds&format=jpg&width=960",
      //           },
      //         ],
      //       )
      //       resolve();
      //     }, 1500);
      //   })
      // },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore