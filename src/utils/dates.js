export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

export const isDateInPast = (date) => {
  var currentDate = new Date();
  return date < currentDate;
}