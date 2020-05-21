import moment from "moment";

export default {
  filters: {
    dateFormat(date) {
      return moment.unix(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
};
