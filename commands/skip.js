module.exports = {
  name: "skip",
  aliases: "sk",
  usage: "skip",
  description: "Salta la cancion actual.",
  
  execute: async (client, message, args) => {
    const channel = message.member.voice.channel;
    if(!channel) return message.channel.send(":x: No estas en un canal de voz!")
    
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
      return message.channel.send(":x: No estas en mi mismo canal de voz!")
    const queue = client.distube.getQueue(message)
    
        if (!queue) return message.channel.send(":x: No estoy reproduciendo nada.")
        try {
            client.distube.skip(message)
            message.react("⏭️")
        } catch (e) {
            console.log(e);
        }
    }
  }
