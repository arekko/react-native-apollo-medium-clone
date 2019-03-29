import moment from "moment";

export const formatDate = (date: any): string => {
  return moment(date).format("MMM D/YY");
};
