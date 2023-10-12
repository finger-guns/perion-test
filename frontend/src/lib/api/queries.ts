import type { Game, GameDetail, GameStats } from '$lib/types/game';
import { PUBLIC_BASE_API_URL } from '$env/static/public';

const userOwnedGames = async (userId: string): Promise<Game[]> => {
  const response = await fetch(`${PUBLIC_BASE_API_URL}/user/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch games for user ${userId}. Status: ${response.status}`);
  }
  return await response.json();
};

const userTopGames = async (userId: string): Promise<Game[]> => {
  const response = await fetch(`${PUBLIC_BASE_API_URL}/user/topgames/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch top games for user ${userId}. Status: ${response.status}`);
  }
  return await response.json();
}

const userGameStats = async (userId: string): Promise<GameStats> => {
  const response = await fetch(`${PUBLIC_BASE_API_URL}/user/total/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch game stats for user ${userId}. Status: ${response.status}`);
  }
  return await response.json();
};

const gameStats = async (gameAppId: string): Promise<GameDetail> => {
  const response = await fetch(`${PUBLIC_BASE_API_URL}/gamedetails/${gameAppId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for game ${gameAppId}. Status: ${response.status}`);
  }
  return await response.json();
};

export { userOwnedGames, userTopGames, userGameStats, gameStats };
