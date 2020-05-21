<template>
  <div>
    <category-list-item
      v-for="(category, index) in categories"
      :category="category"
      :key="`category_${category['.key']}_${index}`"
    />
  </div>
</template>

<script>
import CategoryListItem from "@/components/Category/CategoryListItem";

export default {
  components: {
    CategoryListItem
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>
