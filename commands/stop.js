module.exports = {
  name: "stop",
  aliases: "dc",
  usage: "stop",
  description: "Para la lista de reproduccion actual.",
  
  execute: async (client, message, args) => {
    const channel = message.member.voice.channel;
    if(!channel) return message.channel.send(":x: No estas en un canal de voz!")
    
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) 
      return message.channel.send(":x: No estas en mi mismo canal de voz!")
    
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(":x: No estoy reproduciendo nada.")
    try {
      client.distube.stop(message)
      message.react("⏹️")
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}