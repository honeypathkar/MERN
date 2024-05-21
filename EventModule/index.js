const EventEmitter = require("events");

const event = new EventEmitter();

event.on("sayMyName", () => {
  console.log("Honey");
});
event.on("sayMyName", () => {
    console.log("PathKar");
  });
  event.on("sayMyName", () => {
    console.log("Honey Pathkar");
  });
event.emit("sayMyName");
