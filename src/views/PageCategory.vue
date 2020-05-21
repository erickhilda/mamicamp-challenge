<template>
  <div class="col-full">
    <h1>{{ category.name }}</h1>
    <category-list-item :category="category" />
  </div>
</template>

<script>
import sourceData from "@/data";
import CategoryListItem from "@/components/Category/CategoryListItem";

export default {
  components: {
    CategoryListItem
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    category() {
      return sourceData.categories[this.id];
    }
  }
};
</script>
