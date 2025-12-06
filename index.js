import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./heart2025.json";

// Parametric heart curve (scaled for GitHub grid)
function generateHeartPoints(scale = 0.25, points = 100) {
  const coords = [];

  for (let i = 0; i < points; i++) {
    let t = Math.PI - (2 * Math.PI * i) / points;
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    coords.push({
      weekOffset: Math.round(x * scale),
      dayOffset: Math.round(-y * scale),
    });
  }
  return coords;
}

function getHeartDates(year, start, end) {
  const dates = [];
  const startDate = moment(start);
  const endDate = moment(end);

  const baseWeek = startDate.week();
  const heartPoints = generateHeartPoints();

  for (const p of heartPoints) {
    let week = baseWeek + p.weekOffset;
    let day = p.dayOffset;

    if (day < 0 || day > 6) continue;

    const date = moment().year(year).week(week).day(day);

    if (date.isBetween(startDate, endDate, "day", "[]")) {
      dates.push(date.format());
    }
  }

  return dates;
}

async function commitOnDate(date) {
  const commitCount = random.int(2, 5); // stronger green for heart shape
  const message = `Heart Commit (${date})`;

  jsonfile.writeFileSync(path, { date });

  process.env.GIT_AUTHOR_DATE = date;
  process.env.GIT_COMMITTER_DATE = date;

  await git.add(path);
  await git.commit(message, { "--date": date });
}

async function run() {
  console.log("Generating HEART SHAPE for March–May 2025...");

  const dates = getHeartDates(
    2025,
    "2025-03-01",
    "2025-05-31"
  );

  for (const d of dates) {
    await commitOnDate(d);
    console.log("Committed:", d);
  }

  await git.push();
  console.log("Heart pattern pushed successfully!");
}

run();
