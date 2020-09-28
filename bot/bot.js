// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const { Client, Util } = require("discord.js");
const fs = require("fs");

const config = require("./settings/config.json");
require("./util/eventLoader.js")(client);

// DEFINE SETTINGS -----------------------------\\
client.prefix = config.prefix;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

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

// START BOT ----------------------------------\\

let cmdModules = ["apteryx", "staff"];

cmdModules.forEach(module => {
  let files = fs
    .readdirSync(`/home/Apteryx/Projects/lounge/bot/commands/${module}/`)
    .filter(file => file.endsWith(".js"));
  files.forEach(file => {
    let command = require(`./commands/${module}/${file}`);
    client.commands.set(command.help.name, command);
    command.config.aliases.forEach(alias => {
      client.aliases.set(alias, command.help.name);
    });
  });
});

client.login(process.env.LC_DISCORD_TOKEN);
