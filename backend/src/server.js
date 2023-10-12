const express = require('express');
const cors = require('cors');

const queries = require('./operations/queries/steam');
const { getFromCache, setInCache } = require('./utils/cache');

const CORS_OPTIONS = {
  origin: [
    'http://localhost:5173',
  ],
  optionsSuccessStatus: 200
};



/**
 * Sets up and returns the Express server.
 * @returns {import('express').Express} The configured Express application.
 */
const server = () => {
  const app = express();
  app.use(cors());

  app.get('/', (req, res) => {
    res.json('hello world');
  });

  // Get owned games by the users steamid.
  app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    let games = getFromCache(`games:${id}`);

    if (!games) {
      games = await queries.getOwnedGames(id);
      setInCache(`games:${id}`, games);
    }

    res.json(games);
  });

  // Get the users top ten games.
  app.get('/user/topgames/:id', async (req, res) => {
    const { id } = req.params;
    let games = getFromCache(`games:${id}`);

    if (!games) {
      games = await queries.getOwnedGames(id);
      setInCache(`games:${id}`, games);
    }

    const topGames = games.slice(0, 10);

    const detailedTopGames = await Promise.all(topGames.map(async (game) => {
      let details = getFromCache(`gameDetails:${game.appid}`);

      if (!details) {
        details = await queries.getGameDetails(game.appid);
        setInCache(`gameDetails:${game.appid}`, details);
      }

      return {
        ...game,
        details,
      };
    }));

    res.json(detailedTopGames);
  });

  // get the information about that game.
  app.get('/gamedetails/:id', async (req, res) => {
    const { id } = req.params;
    let gameDetails = getFromCache(`gameDetails:${id}`);

    if (!gameDetails) {
      gameDetails = await queries.getGameDetails(id);
      setInCache(`gameDetails:${id}`, gameDetails);
    }

    res.json(gameDetails);
  });

  // should probably make this id name better, but its the steamid in this context and the appid in others, boo hoo ha ha think about it later.
  app.get('/user/total/:id', async (req, res) => {

    // This function is too big, i don't like it

    const { id } = req.params;
    const userGames = await queries.getOwnedGames(id);

    if (!userGames || userGames.length === 0) {
      return res.status(404).json({ error: 'No games found for the user.' });
    }

    const totalGames = userGames.length;
    const totalPlaytime = userGames.reduce((acc, game) => acc + game.playtime_forever, 0);

    const mostPlayedGame = userGames.sort((a, b) => b.playtime_forever - a.playtime_forever)[0];
    const gameDetails = await queries.getGameDetails(mostPlayedGame.appid);
    // Booped-ed boop, this is to much stuff here.
    const mostPlayedGameWithDetails = {
        ...mostPlayedGame,
        details: gameDetails
    };

    
    res.json({
      totalGames,
      totalPlaytime: totalPlaytime / 60,
      mostPlayedGame: {
            name: mostPlayedGameWithDetails.name,
            details: mostPlayedGameWithDetails.details
        }
    });
  });


  return app;
};

module.exports = server;
