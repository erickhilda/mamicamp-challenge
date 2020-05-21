<template>
  <div>
    <category-list-item
      v-for="category in categories"
      :category="category"
      :key="`category_${category['.key']}`"
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
