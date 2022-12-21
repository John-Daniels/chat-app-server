function timeConversion(s) {
  // Write your code here
  const ops = ["AM", "PM"];

  if (s.endsWith(ops[0])) {
    const time = s.split("AM")[0];
    let hour = Number(time.split(":")[0]);
    let mins = time.split(":")[1];
    let secs = time.split(":")[2];

    if (hour < 12) {
      return `${format(hour)}:${mins}:${secs}`;
    }

    hour = Math.abs(hour - 12);

    return `${format(hour)}:${mins}:${secs}`;
  } else if (s.endsWith(ops[1])) {
    const time = s.split("PM")[0];
    let hour = Number(time.split(":")[0]);
    let mins = time.split(":")[1];
    let secs = time.split(":")[2];
    if (hour < 12) {
      hour += 12;
      return `${format(hour)}:${mins}:${secs}`;
    }

    return `${format(hour)}:${mins}:${secs}`;
  }

  return s;
}

const format = (t) => t.toString().padStart(2, "0");
console.log(timeConversion("12:40:22AM"));
