/**
 * 将日期转换为字符串
 * @param  {date} date 日期
 * @return {string}      字符串
 */
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


/**
 * 判断一个日期是否是今天
 * @param  {date}  date 需要判断的日期
 * @return {Boolean}      是否是今天
 */
function isToday(date) {
  return date.toDateString() === new Date().toDateString();
}

export default {
  datetimeToString,
  isToday,
};
