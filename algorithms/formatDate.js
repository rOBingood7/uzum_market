export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const month = monthNames[date.getMonth()];
  return `${day} ${month}`;
}
