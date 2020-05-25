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
      if (!thread.post) {
        Vue.set(thread, "posts", {});
      }
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { userId, postId }) {
      const user = state.users[userId];
      if (!user.post) {
        Vue.set(user, "posts", {});
      }
      Vue.set(user.posts, postId, postId);
    },
    setUser(state, { userId, user }) {
      Vue.set(state.users, userId, user);
    },
    setThread(state, { threadId, thread }) {
      Vue.set(state.threads, threadId, thread);
    },
    appendThreadToForum(state, { forumId, threadId }) {
      const forum = state.forums[forumId];
      if (!forum.threads) {
        Vue.set(forum, "threads", {});
      }
      Vue.set(forum.threads, threadId, threadId);
    },

    appendThreadToUser(state, { userId, threadId }) {
      const user = state.users[userId];
      if (!user.threads) {
        Vue.set(user, "threads", {});
      }
      Vue.set(user.threads, threadId, threadId);
    }
  },
  getters: {
    authenticatedUser(state) {
      return state.users[state.authId];
    }
  },
  actions: {
    createPost({ commit, state }, post) {
      const postId = "post" + Math.random();
      post[".key"] = postId;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit("setPost", { post, postId });
      commit("appendPostToThread", { threadId: post.threadId, postId });
      commit("appendPostToUser", { userId: post.userId, postId });

      return Promise.resolve(state.posts[postId]);
    },
    updateUser({ commit }, user) {
      commit("setUser", { userId: user[".key"], user });
    },
    updateThread({ state, commit }, { title, text, id }) {
      return new Promise(resolve => {
        const thread = state.threads[id];
        const post = state.posts[thread.firstPostId];

        const newThread = { ...thread, title };
        const newPost = { ...post, text };

        commit("setThread", { thread: newThread, threadId: id });
        commit("setPost", { post: newPost, postId: thread.firstPostId });

        resolve(newThread);
      });
    },
    createThread({ commit, state, dispatch }, { text, title, forumId }) {
      return new Promise(resolve => {
        const threadId = "thread" + Math.random();
        const userId = state.authId;
        const publishedAt = Math.floor(Date.now() / 1000);

        const thread = {
          ".key": threadId,
          title,
          forumId,
          publishedAt,
          userId
        };

        commit("setThread", { threadId, thread });
        commit("appendThreadToForum", { forumId, threadId });
        commit("appendThreadToUser", { userId, threadId });

        dispatch("createPost", { text, threadId }).then(post => {
          commit("setThread", {
            threadId,
            thread: { ...thread, firstPostId: post[".key"] }
          });
        });

        resolve(state.threads[threadId]);
      });
    }
  },
  modules: {}
});
