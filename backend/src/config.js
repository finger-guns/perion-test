const I_PLAYER_SERVICE = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid={STEAM_ID}&format=json`;
const APP_SERVICE = 'https://store.steampowered.com/api/appdetails?appids={appId}';

module.exports = {
  I_PLAYER_SERVICE,
  APP_SERVICE,
};
