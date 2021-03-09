module.exports = {
  name: "ping",
  
  execute(client, message, args) {
    message.delete();
    message.channel.send(`Pong! - \`${client.ws.ping}ms\``);
  }
}