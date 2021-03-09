const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  aliases: "q",
  usage: "queue",
  description: "Muestra la lista de reproduccion actual.",
  
  execute: async (client, message, args) => {
    const channel = message.member.voice;
    if(!channel) return message.channel.send(":x: No estas en un canal de voz!");
    
    if(!client.distube.getQueue(message))
      return message.channel.send(":x: La cola de reproduccion esta vacia.");
    
    let playing = client.distube.getQueue(message);
      if(!playing) return message.channel.send(":x: La cola de reproduccion esta vacia.");
    
    let queue = client.distube.getQueue(message);
    let track = queue.songs[0];
    let counter = 0;
      for(let i = 0; i < queue.songs.length; i+=20){
        if(counter >= 10) break;
          let k = queue.songs;
          let songs = k.slice(i, i + 5);
    const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`${message.guild.name} - Lista de Reproduccion`)
    .addField("__Reproduciendo Ahora__",`[${track.name}](${track.url})`, true)
    .addField("__Lista de Canciones__", songs.map((song, index) => `**${index + 1 + counter * 5}.-** [${song.name}](${song.url}) - ${song.formattedDuration}`), false)
    .setFooter(`${queue.songs.length > 5 ? `y ${queue.songs.length - 5} cancion(es) mas.` : `quedan ${queue.songs.length} cancion(es) mas.`}`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setTimestamp(new Date)
    
    message.channel.send(embed)
    counter++;
    } 
  }
}