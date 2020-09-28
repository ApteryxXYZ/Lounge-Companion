// REQUIRE PACKAGES --------------------------- \\
const Discord = require("discord.js");

// DEFINE SETTINGS ---------------------------- \\
const config = require("../../settings/config.json");
const colour = require("../../settings/colours.json");

// DEFINE FUNCTIONS --------------------------- \\
function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

// RUN COMMAND -------------------------------- \\
exports.run = (client, message, args, author, prefix) => {
  var deleteMessage = false;
  if (args[0] === "deletethis") deleteMessage = true;

  if (author.id !== config.apteryx) return;

  let embed = new Discord.MessageEmbed();
  embed.setFooter("Werewolf Companion");
  embed.setTimestamp();
  embed.setColor(colour.lime);

  const code = args.join(" ").replace("deletethis", "");

  try {
    var output = eval(code);
    if (typeof output !== "string") output = require("util").inspect(output);

    embed.setTitle("Eval");
    embed.addField("Input", "```" + code + "```");
    embed.addField(
      "Output",
      "```" + clean(output).replace("Enmap [Map] ", "") + "```"
    );

    if (!deleteMessage) {
      message.channel.send(embed);
    }
  } catch (error) {
    var output = error;
    embed.setTitle("Eval");
    embed.addField("Input", "```" + code + "```");
    embed.addField("Output", "```" + clean(output) + "```");
    message.channel.send(embed);
  }

  message.delete();
};

// COMMAND INFORMATION ------------------------ \\
exports.help = {
  name: "eval",
  description: "Apteryxs command!",
  usage: "<input>",
  example: "input"
};

exports.config = {
  enabled: true,
  guildOnly: true,
  perms: ["EMBED_LINKS"],
  aliases: ["eval"],
  args: true
};
