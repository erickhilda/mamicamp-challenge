<template>
  <span :title="timestamp | formatDate">{{ timestamp | postAge }}</span>
</template>

<script>
import moment from "moment";

export default {
  props: {
    timestamp: {
      required: true,
      type: Number
    }
  },
  filters: {
    formatDate(date) {
      return moment.unix(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    postAge(date) {
      return moment.unix(date).fromNow();
    }
  }
};
</script>
