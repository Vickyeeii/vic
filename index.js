import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";
const TOTAL = 300;

// some stylish commit messages
const messages = [
  "Shifting the timeline",
  "Refining the ripple of 2025",
  "Temporal dust cleanup",
  "Shaping the year one commit at a time",
  "Adjusting the continuum",
  "Forging another echo of 2025",
  "Minor distortion in the space-time log",
];

function randomDate2025() {
  const randomMonth = random.int(1, 12);
  const daysInMonth = moment(`2025-${randomMonth}`, "YYYY-MM").daysInMonth();
  const randomDay = random.int(1, daysInMonth);

  const randomHour = random.int(0, 23);
  const randomMinute = random.int(0, 59);
  const randomSecond = random.int(0, 59);

  return moment({
    year: 2025,
    month: randomMonth - 1,
    day: randomDay,
    hour: randomHour,
    minute: randomMinute,
    second: randomSecond,
  }).format();
}

async function createCommit() {
  const date = randomDate2025();
  const commitMessage =
    messages[random.int(0, messages.length - 1)] +
    ` (${random.int(1000, 9999)})`;

  // write file so git detects change
  jsonfile.writeFileSync(path, { date });

  // Force timestamps for git
  process.env.GIT_AUTHOR_DATE = date;
  process.env.GIT_COMMITTER_DATE = date;

  await git.add(path);
  await git.commit(commitMessage, { "--date": date });
}

async function run() {
  console.log(`Creating ${TOTAL} random commits in 2025...`);

  for (let i = 0; i < TOTAL; i++) {
    await createCommit();
    console.log(`Commit ${i + 1}/${TOTAL} done`);
  }

  await git.push();
  console.log("All commits pushed!");
}

run();
