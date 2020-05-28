<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CategoryList from "@/components/Category/CategoryList";
import asyncDataStatus from "@/mixins/asyncDataStatus";

export default {
  name: "HelloWorld",
  components: { CategoryList },
  mixins: [asyncDataStatus],
  data() {
    return {
      ready: false
    };
  },
  computed: {
    categories() {
      return Object.values(this.$store.state.categories);
    }
  },
  methods: {
    ...mapActions(["fetchAllCategories", "fetchForums"])
  },
  created() {
    this.fetchAllCategories()
      .then(categories =>
        Promise.all(
          categories.map(category =>
            this.fetchForums({ ids: Object.keys(category.forums) })
          )
        )
      )
      .then(() => {
        this.asyncDataStatus_fetched();
      });
  }
};
</script>
