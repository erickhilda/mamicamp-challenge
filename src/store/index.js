import Vue from "vue";
import Vuex from "vuex";
import sourceData from "@/data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: "7uVPJS9GHoftN58Z2MXCYDqmNAh2"
  },
  mutations: {
    setPost(state, { postId, post }) {
      Vue.set(state.posts, postId, post);
    },
    appendPostToThread(state, { threadId, postId }) {
      const thread = state.threads[threadId];
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { userId, postId }) {
      const user = state.users[userId];
      Vue.set(user.posts, postId, postId);
    },
    setUser(state, { userId, user }) {
      Vue.set(state.users, userId, user);
    }
  },
  getters: {
    authenticatedUser(state) {
      return state.users[state.authId];
    }
  },
  actions: {
    createPost({ commit }, post) {
      const postId = "greatPost" + Math.random();
      post[".key"] = postId;

      commit("setPost", { post, postId });
      commit("appendPostToThread", { threadId: post.threadId, postId });
      commit("appendPostToUser", { userId: post.userId, postId });
    },
    updateUser({ commit }, user) {
      commit("setUser", { userId: user[".key"], user });
    }
  },
  modules: {}
});
