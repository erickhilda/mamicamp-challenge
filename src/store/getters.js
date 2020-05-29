import { objectPropertiesCounter } from "@/helpers/objectPropertiesCounter";

export default {
  authenticatedUser(state) {
    return state.authId ? state.users[state.authId] : null;
  },

  userPosts: state => id => {
    const user = state.users[id];
    if (user.posts) {
      return Object.values(state.posts).filter(post => post.userId === id);
    }
    return [];
  },

  userThreadsCount: state => id =>
    objectPropertiesCounter(state.users[id].threads),
  userPostsCount: state => id => objectPropertiesCounter(state.users[id].posts),
  threadRepliesCount: state => id =>
    objectPropertiesCounter(state.threads[id].posts) - 1
};
