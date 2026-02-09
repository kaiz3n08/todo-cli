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
};

if (input[0] === "add") {
  const task: string = input[1] as string;
  const date = new Date();
  const id = uid(12);

  const tskobj: obj = {
    id: id,
    task: task,
    done: false,
    createdAt: date.toLocaleString(),
  };

  let [filedata] = JSON.parse(fs.readFileSync("./tasks.json").toString());
  const nestedTask = filedata.task;
  await nestedTask.push(tskobj);
  fs.writeFileSync("./tasks.json", JSON.stringify(filedata, null, 2));
  console.log("Task Added!");
}


