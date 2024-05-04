function convertToJST(utcDate: string): string {
  const date = new Date(utcDate);
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstDate = new Date(date.getTime() + jstOffset);
  const nowUTC = new Date();
  const now = new Date(nowUTC.getTime() + jstOffset);
  const diff = now.getTime() - jstDate.getTime();

  if (diff < 1000 * 60) {
    return "1分前";
  } else if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}分前`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}時間前`;
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days}日前`;
  }
}

export { convertToJST };
