import Vue from "vue";

// eslint-disable-next-line no-unused-vars
export const makeAppendChildToParentMutation = ({ parent, child }) => (
  state,
  { childId, parentId }
) => {
  const resource = state.items[parentId];
  if (!resource[child]) {
    Vue.set(resource, child, {});
  }
  Vue.set(resource[child], childId, childId);
};
