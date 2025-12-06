import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";


const randomMonth = random.int(1, 12);


const daysInMonth = moment(`2025-${randomMonth}`, "YYYY-MM").daysInMonth();
const randomDay = random.int(1, daysInMonth);


const randomHour = random.int(0, 23);
const randomMinute = random.int(0, 59);
const randomSecond = random.int(0, 59);


const date = moment({
  year: 2025,
  month: randomMonth - 1,
  day: randomDay,
  hour: randomHour,
  minute: randomMinute,
  second: randomSecond,
}).format();

// random commit message
const commitMessage = `Random 2025 Commit #${random.int(1000, 9999)}`;

const data = { date };

jsonfile.writeFile(path, data, () => {
  simpleGit()
    .add([path])
    .commit(commitMessage, { "--date": date })
    .push()
    .then(() => console.log("Random 2025 commit pushed"))
    .catch((err) => console.error("Git error:", err));
});
