import moment from "moment";

export default {
  filters: {
    postAge(date) {
      return moment.unix(date).fromNow();
    }
  }
};
