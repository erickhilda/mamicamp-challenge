<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <category-list :categories="categories" />
  </div>
</template>

<script>
import CategoryList from "@/components/Category/CategoryList";

export default {
  name: "HelloWorld",
  components: { CategoryList },
  computed: {
    categories() {
      return Object.values(this.$store.state.categories);
    }
  },
  created() {
    this.$store.dispatch("fetchAllCategories").then(categories => {
      categories.forEach(category =>
        this.$store.dispatch("fetchForums", {
          ids: Object.keys(category.forums)
        })
      );
    });
  }
};
</script>
