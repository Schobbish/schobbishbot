# SchobbishBot
My very own Discord bot!

To add my bot to your server for whatever reason, [click here](https://discordapp.com/oauth2/authorize?client_id=456973535689048064&scope=bot).

As of this moment I am only running this bot when I need to. If you want to use this bot for your own server I suggest setting up your own bot. I will not tell you how to do that; [here's a guide](https://discordjs.guide/#/). After you have made a bot user, you need to put its token somewhere. Make a file named `bot-token.json` and put this code in it, replacing `YOUR TOKEN GOES HERE` with your token of course:
```json
{
  "Token": "YOUR TOKEN GOES HERE"
}
```
Then run `node index.js` and you should be fine.

Be sure to edit `.git/info/exclude` so that it will ignore the bot-token.json file. You don't want your token going on GitHub.
