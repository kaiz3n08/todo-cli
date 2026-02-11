import fs from "fs";
const input = process.argv.splice(2);
import { uid } from "./Uid.js";

if (input[0] === "-h") {
  console.log(`Usage : pnpm run dev [command] [arugments]`);
  console.log(`Options:`);
  console.log(`     add               for adding tasks`);
  console.log(`     update            for updating tasks`);
  console.log(`     delete            for deleting tasks`);
  console.log(
    `     done              to marks complete the task (default value is false)`,
  );
  console.log(`     -nd               to list all task that are not done yet `);
  console.log(`     -d                to list all task that are done`);
  console.log(`     -a                to list all tasks`);
}

type obj = {
  id: string;
  task: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

let filedata = JSON.parse(fs.readFileSync("./tasks.json").toString());
const nestedTask = filedata.task;
const findinTask: obj = nestedTask.find(
  (e: obj) => e.task === (input[1] as string),
);
const IndexOfUserTask = nestedTask.indexOf(findinTask);
const date = new Date();

if (input[0] === "add") {
  const task: string = input[1] as string;
  const id = uid(12);

  const tskobj: obj = {
    id: id,
    task: task,
    done: false,
    createdAt: date.toLocaleString("en-Us", { timeZone: "Asia/Calcutta" }),
    updatedAt: "Not Updated yet!",
  };

  await nestedTask.push(tskobj);
  fs.writeFileSync("./tasks.json", JSON.stringify(filedata, null, 2));
  console.log("Task Added!");
}

if (input[0] === "remove") {
  if (!findinTask) {
    console.error("Task Don't exist!");
  }
  if (!input[1]) {
    console.error("Please Provide task name");
  }

  if (findinTask || IndexOfUserTask > 0) {
    await nestedTask.splice(IndexOfUserTask, 1);
    fs.writeFileSync("./tasks.json", JSON.stringify(filedata, null, 2));
    console.log("Task removed!");
  }
}

if (input[0] === "update") {
  if (input[1] && !input[2]) {
    console.error(
      "PLease provide second arugement! \n For help type update -h",
    );
  }

  if (input[1] && input[2] && findinTask) {
    const UpdatedObj: obj = {
      id: findinTask.id,
      task: input[2] as string,
      done: findinTask.done,
      createdAt: findinTask.createdAt,
      updatedAt: date.toLocaleString("en-Us", { timeZone: "Asia/Calcutta" }),
    };
    await nestedTask.splice(IndexOfUserTask, 1, UpdatedObj);

    fs.writeFileSync("./tasks.json", JSON.stringify(filedata, null, 2));
    console.log("Task Updated!");
  }
}

if (input[0] === "done") {
  if (findinTask?.task != input[1]) {
    console.error("Task is either wrong or don't exist!");
  } else {
    const doneObj: obj = {
      id: findinTask.id,
      task: findinTask.task,
      done: input[2] as unknown as boolean,
      createdAt: findinTask.createdAt,
      updatedAt: findinTask.updatedAt,
    };
    await nestedTask.splice(IndexOfUserTask, 1, doneObj);
    fs.writeFileSync("./tasks.json", JSON.stringify(filedata, null, 2));
    console.log("Task Done!");
  }
}
