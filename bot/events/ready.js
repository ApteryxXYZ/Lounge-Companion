// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const client = new Discord.Client();

// DEFINE SETTINGS -----------------------------\\
const { prefix, statuses } = require("../settings/config.json");

// DEFINE FUNCTIONS ----------------------------\\
function log(message) {
  if (message instanceof Error) {
    message = message.stack;
  }
  let time = new Date().toLocaleTimeString("en-US", {
    timeZone: "Pacific/Auckland"
  });
  console.log(`[${time}] ${message}`);
}

// ON READY -----------------------------------\\
// client.user.setStatus("idle");
module.exports = client => {
  log(client.user.tag + " is now online!");
  setInterval(function() {
    let randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber < 80) {
      let status =
        statuses.watching[Math.floor(Math.random() * statuses.watching.length)];
      client.user.setActivity(status, {
        type: "WATCHING"
      });
    } else {
      let status =
        statuses.playing[Math.floor(Math.random() * statuses.playing.length)];
      client.user.setActivity(status, {
        type: "PLAYING"
      });
    }
  }, 4000);
};
