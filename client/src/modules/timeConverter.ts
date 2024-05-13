function formatUptime(timestamp: number): string {
  const now = Date.now() / 1000;
  const secondsAgo = Math.floor((now - timestamp));
  const intervals = {
    year: Math.floor(secondsAgo / (60 * 60 * 24 * 365)),
    month: Math.floor(secondsAgo / (60 * 60 * 24 * 30)),
    day: Math.floor(secondsAgo / (60 * 60 * 24)),
    hour: Math.floor(secondsAgo / (60 * 60)),
    minute: Math.floor(secondsAgo / 60),
    second: secondsAgo
  };

  for (const [unit, value] of Object.entries(intervals)) {
    if (value > 0) {
      if (unit === "hour") {
        return `${value}h ${intervals.minute % 60}min ago`;
      } else if (unit === "minute") {
        return `${value}min ago`;
      } else {
        return `${value} ${unit}${value !== 1 ? "s" : ""} ago`;
      }
    }
  }

  return "Just now";
}

function getDayAndDate(timestamp: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const date = new Date(timestamp * 1000);
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${day}, ${month} ${dayOfMonth}`;
}

export { formatUptime, getDayAndDate };

