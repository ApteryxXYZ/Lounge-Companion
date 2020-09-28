// REQUIRE PACKAGES --------------------------- \\
const Discord = require("discord.js");

// DEFINE SETTINGS ---------------------------- \\
const settings = require("../../settings/config.json");
const colour = require("../../settings/colours.json");

// RUN COMMAND -------------------------------- \\
exports.run = (client, message, args, author, prefix) => {
  var user;
  if (!args[0]) user = message.author;
  if (message.mentions.users.first()) user = message.mentions.users.first();
  if (!isNaN(args[0])) user = client.users.cache.get(args[0]);
  if (client.users.cache.find(user => user.username === args.join(" ")))
    user = client.users.cache.find(user => user.username === args.join(" "));

  if (!user)
    return message.channel.send(
      "No user found for what was inputted. If input is a users' name, ensure capitalize is correct.\nValid inputs include mention, user ID and username"
    );

  let embed = new Discord.MessageEmbed()
    .setTitle("User Information")
    .addField("Username", user.username, true)
    .addField("ID", user.id, true)
    .setImage(user.avatarURL())
    .setFooter("Werewolf Companion")
    .setTimestamp()
    .setColor(colour.lime);

  message.channel.send(embed);
};

// COMMAND INFORMATION ------------------------ \\
exports.help = {
  name: "user",
  description: "Apteryxs command!",
  usage: "<channel id> <message id>",
  example: "input"
};

exports.config = {
  enabled: true,
  guildOnly: true,
  perms: ["EMBED_LINKS"],
  aliases: ["user"],
  args: false
};
