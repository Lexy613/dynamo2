const Discord = require("discord.js");
const Distube = require("distube");
const fs = require("fs");
const config = require("./config.json");
const { MessageEmbed } = require("discord.js");

const client = new Discord.Client({
  restTimeOffset: 0,
  presence: {
    status: "online",
    activity: {
      name: "MadKing | Bot & Server List",
      type: "STREAMING",
      url: "https://madking.us"
    } 
  }
});

const distube = new Distube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: true,
  youtubeCookie:  "VISITOR_INFO1_LIVE=PfpEOEytBjY; CONSENT=YES+MX.en+201910; _ga=GA1.2.73640814.1571117990; __Secure-3PAPISID=ma7eUp7fszJ78TPq/A0qPcXc38clOWJn2V; PREF=volume=100&f6=480&hl=en&tz=America.Phoenix&library_tab_browse_id=FEmusic_liked_videos&f1=50000000&al=en&f4=4000000&f5=20030; __Secure-3PSID=7AfGlnK-4vRk_wTfyOjHTFkIgpLTnF_kozoS_Y2D8Pe6GLlXWKsAAqxWSs8_k3sEpvfgyg.; YSC=i1Q2OjZvyBo; LOGIN_INFO=AFmmF2swRQIgB16ZwjatuTtxiY009ZdYnJ2vyPvFApSJurQz-1MjFF4CIQDFuL9KssPeNLB_D1Kz9WZtpLSXSnmqbzTT1rawXWl4hw:QUQ3MjNmdzZhN1ctQkR2a2JZakEwa25YWUpfUzREX1NHZ01TRjQ3MXoxY2piQ29vWXpLR3A3ZjNpbk1vMmFZMkhGOHlVd0puTlpvZzVGR0s5bzlXblNmdzVXTWk0cE9ITjh1YXZXbDRyTFBDY0RrWXR3SzNuemxHdkM4YThTOE8zVXZNTzM5aVdXeUtBRWo0cmplVUtpU0ZKNFcxM0ROeWVxMDFncDhrYVdPTWREYWVHOFppU0drVlM3QzcwRmtTZDd6Yld6ZE1QMkl6WXlJakx1N2MwbzFNcVM0cHFGLUMxMmpHZHlxdnlTUXYxUWtYNzh4U0JNZnhOMWh6ck56aUxEdUdWbVBLaVRIcQ==; __Secure-3PSIDCC=AJi4QfHiGu5irnbQ_tBtwPb6Gc_xPa0mvOz9WSoJGEefiLDlX7HXCWrZoxj7sDk2_sKcNlZMI2M",
  youtubeDL: true,
  updateYouTubeDL: true,
  customFilters: {
      "clear": "dynaudnorm=f=200",
      "lowbass": "bass=g=6,dynaudnorm=f=200",
      "bassboost": "bass=g=20,dynaudnorm=f=200",
      "purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
      "8D": "apulsator=hz=0.08",
      "vaporwave": "aresample=48000,asetrate=48000*0.8",
      "nightcore": "aresample=48000,asetrate=48000*1.25",
      "phaser": "aphaser=in_gain=0.4",
      "tremolo": "tremolo",
      "vibrato": "vibrato=f=6.5",
      "reverse": "areverse",
      "treble": "treble=g=5",
      "normalizer": "dynaudnorm=f=200",
      "surrounding": "surround",
      "pulsator": "apulsator=hz=1",
      "subboost": "asubboost",
      "karaoke": "stereotools=mlev=0.03",
      "flanger": "flanger",
      "gate": "agate",
      "haas": "haas",
      "mcompand": "mcompand"
    }
});

client.distube = new Distube(client, (client, { emitNewSongOnly: true, leaveOnEmpty: false, leaveOnFinish: false, leaveOnStop: false, youtubeCookie: process.env.COOKIE, youtubeDL: true, updateYouTubeDL: true }));
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;
client.config = require("./config.json");

const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commands) {
    console.log(`Loading command ${file}`);
    const command = require(`./commands/${file}`);
    client.commands.set(command.name.toLowerCase(), command);};

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

const status = queue => `Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filter || "Off"}\` | Repetir: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Queue" : "Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
  
client.distube
    .on("playSong", (message, queue, song) => 
        message.channel.send(new MessageEmbed()
          .setColor("BLUE")
          .setTitle("Reproduciendo")
          .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
          .addField("Status", status(queue))
          .setThumbnail(song.thumbnail)
          .setFooter(`Pedida por: ${song.user.tag}`)
          .setTimestamp(new Date)
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${client.emotes.success} | Added \`${playlist.title}\` playlist (${playlist.total_items} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
    .on("initQueue", queue => {
          queue.autoplay = true;
          queue.volume = 100;
          queue.filter = "lowbass";
});

client.login(process.env.TOKEN);