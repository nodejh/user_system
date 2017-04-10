function datetimeToString(date) {
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = `0${date.getMinutes()}`;
  // Seconds part from the timestamp
  const seconds = `0${date.getSeconds()}`;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // Will display time in 10:30:23 format
  const formattedTime = `${year}/${month}/${day} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  return formattedTime;
}


export default {
  datetimeToString,
};
