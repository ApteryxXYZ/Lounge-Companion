// BOT REQUIRE -------------------------------- \\
const Discord = require("discord.js");
const client = new Discord.Client();

// DEFINE SETTINGS -----------------------------\\
const settings = require("../settings/config.json");
const colour = require("../settings/colours.json");

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

// ON MESSAGE ---------------------------------\\
module.exports = (reaction, user) => {
  let message = reaction.message;
  let emoji = reaction.emoji;
  let client = message.client;

  if (message.partial) message.fetch();

  if (message.channel.id === settings.reaction.channel) {
    let embed = new Discord.MessageEmbed()
      .setTitle(user.tag)
      .setImage(user.avatarURL())
      .setFooter("Werewolf Companion")
      .setTimestamp()
      .setColor(colour.lime);
    if (emoji.id === settings.reaction.emoji) {
      try {
        let channel = client.channels.cache.get(settings.avatar.channel);
        channel.send(embed);
      } catch (error) {
        log(error);
      }
    }
  }
};
