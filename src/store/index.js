import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { objectPropertiesCounter } from "@/helpers/objectPropertiesCounter";

Vue.use(Vuex);

const makeAppendChildToParentMutation = ({ parent, child }) => (
  state,
  { childId, parentId }
) => {
  const resource = state[parent][parentId];
  if (!resource[child]) {
    Vue.set(resource, child, {});
  }
  Vue.set(resource[child], childId, childId);
};

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: "7uVPJS9GHoftN58Z2MXCYDqmNAh2"
  },
  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post);
    },
    appendPostToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "posts"
    }),
    appendPostToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "posts"
    }),
    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },
    setThread(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread);
    },
    appendThreadToForum: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads"
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "threads"
    }),
    setItem(state, { item, id, resource }) {
      item[".key"] = id;
      Vue.set(state[resource], id, item);
    }
  },
  getters: {
    authenticatedUser(state) {
      return state.users[state.authId];
    },
    userThreadsCount: state => id =>
      objectPropertiesCounter(state.users[id].threads),
    userPostsCount: state => id =>
      objectPropertiesCounter(state.users[id].posts),
    threadRepliesCount: state => id =>
      objectPropertiesCounter(state.threads[id].posts) - 1
  },
  actions: {
    fetchItem({ state, commit }, { id, emoji, resource }) {
      console.log("🔥‍", emoji, id);
      return new Promise(resolve => {
        firebase
          .database()
          .ref(resource)
          .child(id)
          .once("value", snapshot => {
            commit("setItem", {
              resource,
              id: snapshot.key,
              item: snapshot.val()
            });
            resolve(state[resource][id]);
          });
      });
    },
    fetchItems({ dispatch }, { ids, resource, emoji }) {
      return Promise.all(
        ids.map(id => dispatch("fetchItem", { id, resource, emoji }))
      );
    },
    fetchPosts({ dispatch }, { ids }) {
      return dispatch("fetchItems", { resource: "posts", emoji: "💬", ids });
    },
    fetchThread({ dispatch }, { id }) {
      return dispatch("fetchItem", { resource: "threads", id, emoji: "📄" });
    },
    fetchUser({ dispatch }, { id }) {
      return dispatch("fetchItem", { resource: "users", id, emoji: "🙋" });
    },
    // fetchPost({ dispatch }, { id }) {
    //   return dispatch("fetchItem", { resource: "posts", id, emoji: "💬" });
    // },
    createPost({ commit, state }, post) {
      const postId = "greatPost" + Math.random();
      post[".key"] = postId;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit("setPost", { post, postId });
      commit("appendPostToThread", {
        parentId: post.threadId,
        childId: postId
      });
      commit("appendPostToUser", { parentId: post.userId, childId: postId });
      return Promise.resolve(state.posts[postId]);
    },
    updateUser({ commit }, user) {
      commit("setUser", { userId: user[".key"], user });
    },
    updateThread({ state, commit, dispatch }, { title, text, id }) {
      return new Promise(resolve => {
        const thread = state.threads[id];
        const newThread = { ...thread, title };
        commit("setThread", { thread: newThread, threadId: id });

        dispatch("updatePost", { id: thread.firstPostId, text }).then(() => {
          resolve(newThread);
        });
      });
    },
    updatePost({ state, commit }, { id, text }) {
      return new Promise(resolve => {
        const post = state.posts[id];
        commit("setPost", {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        });
        resolve(post);
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
        commit("appendThreadToForum", { parentId: forumId, childId: threadId });
        commit("appendThreadToUser", { parentId: userId, childId: threadId });

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
