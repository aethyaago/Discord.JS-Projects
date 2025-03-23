const { Events, ActivityType } = require('discord.js');
const colors = require('colors');
const connectDB = require("../database/database")

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		    connectDB();
		    console.log("O Bot foi ligado.".magenta)

    client.user.setPresence({
        activities: [{ name: `twitch.tv/luapizz`, type: ActivityType.Watching}],
        status: "idle",
      });
	},
};
