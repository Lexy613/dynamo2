const distube = require("distube");
const { getTracks, getPreview, getData } = require("spotify-url-info")

module.exports = {
  name: "play",
  aliases: "p",
  usage: "play <URL o Nombre>",
  description: "Reproduce una cancion por su nombre o URL.",
  
  execute: async (client, message, args) => {
    
    if (!message.member.voice.channel) return message.channel.send(":x: No estas en un canal de voz!");
    
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
      return message.channel.send(":x: No estas en mi mismo canal de voz!");    
    
    if (!args[0]) return message.channel.send(":x: Por favor ingresa una URL o nombre validos.");
    
    
    if(args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("track")){
    getPreview(args.join(" ")).then(result => {
       let texto = args.join(" ")
        message.channel.send(`<:spoti:818878466783051868> buscando 🔎 \`${texto}\``);
        client.distube.play(message, result.track);
      })
    }
    else {
      let texto = args.join(" ")
      message.channel.send(`<:yvtube:818879778714550312> buscando 🔎 \`${texto}\``);
      client.distube.play(message, args.join(" "));
    }
  }
}