const URL = require('../../config.js');


/**
 * @typedef Game
 * @type {object}
 * @property {string} appid - an ID.
 * @property {string} name - the app name.
 * @property {number} playtime_forever - how much time has been WASTED.
 */

/**
 * @typedef GameDetails
 * @type {object}
 * @property {string} type - The type of the item (e.g., "game").
 * @property {string} name - The name of the game.
 * @property {boolean} is_free - Whether the game is free to play.
 * @property {string} detailed_description - Detailed description of the game.
 * @property {string} about_the_game - Short description about the game.
 * @property {string} short_description - Even shorter description.
 * @property {Object} release_date - Release date information.
 * @property {boolean} release_date.coming_soon - Whether the game is coming soon.
 * @property {string} release_date.date - The release date in string format.
 */


/**
 * @param {string} steamId - The Steam ID of the user.
 * @returns {Promise<Game[]> | []} - The list of games owned by the user or [].
 */
const getOwnedGames = async (steamId) => {
  console.info(`Trying to get owned games for user ${steamId}`)
  const url = URL.I_PLAYER_SERVICE.replace('{STEAM_ID}', steamId);

  try {
    console.info('Making request -- ')
    const response = await fetch(url);

    console.info('Made request -- ')
    const { response: { games } } = await response.json();

    console.info('Checking Games Length -- ')
    if (games == null || games.length === 0) return [];
    console.info('--IM OUTTA HERE BOIS--')
    return games;

  } catch (error) {
    console.error('SOMETHING WENT HORRIBLY WRONg!?!?!?!', error);
    return [];
  }
};


/**
 * Fetches game details for a given AppID.
 * 
 * @param {string} appId - The AppID of the game.
 * @returns {Promise<GameDetails|null>} The game details or null if not found.
 */
const getGameDetails = async (appId) => {
  console.info('Endponints gonna be formatted')

  const url = URL.APP_SERVICE.replace('{appId}', appId);
  
  try {
    console.info('Making request -- ')
    const response = await fetch(url);
    console.info("Im back baby");

    const { [appId]: gameData } = await response.json();
    
    if (!gameData || !gameData.success) {
      throw new Error('Failed to fetch game details or game not found.');
    }
    return gameData.data;
  } catch (error) {
    console.error("Something went horribly wrong!?", error);
    return null;
  }
};


module.exports = {
  getOwnedGames,
  getGameDetails,
};

