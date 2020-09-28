// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const client = new Discord.Client();

// DEFINE SETTINGS -----------------------------\\
const { prefix } = require("../settings/config.json");

// ON MESSAGE ---------------------------------\\
module.exports = message => {
  let client = message.client;

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  let command = message.content
    .split(" ")[0]
    .slice(prefix.length)
    .toLowerCase();
  let args = message.content.split(" ").slice(1);
  let author = message.author;

  var cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (!cmd) return;

  if (cmd.config.guildOnly && message.channel.type !== "text") {
    return message.reply("I can't execute that command inside DMs!");
  }

  if (cmd.config.enabled == false) {
    return message.channel.send("That command is currently disabled!");
  }

  if (cmd.config.args && !args.length) {
    let reply = `You didn't provide any arguments!`;
    if (cmd.help.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${cmd.help.name} ${cmd.help.usage}\``;
    }
    return message.channel.send(reply);
  }

  if (cmd) {
    cmd.run(client, message, args, author, prefix);
  }
};
