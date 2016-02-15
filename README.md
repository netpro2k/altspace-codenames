# AltspaceVR Codenames
This is an experiment in using react-three-renderer within Altspace. It is a simple version of the [Codwords tabletop game ](https://boardgamegeek.com/boardgame/178900/codenames). You can read the rules [here](http://czechgames.com/files/rules/codenames-rules-en.pdf). Note that the word list is very limited as this is mostly intended as a technical experiment.

Bring up http://netpro2k.com/codenames/ in your private Altspace browser. Click 'new game' and then beam the page to a public space (currently specifically scaled for the outdoor space). Note that the url is unique per game, and determines the word selection as well as color distribution. The game is now started and synchronized for all players.

The spymasters for each team should click the colored orb on the side of the table to toggle the spymaster view. **Other players should never click the spymaster toggles as this would be cheating**. To "flip" a card simply click it. The card's text will be hidden and the corresponding color will be shown.

####Development#####
The code is bundled up using Webpack and a dev server is provided for previewing the app. Run the following to spin it up:

```
	> npm install
	> npm start
```
