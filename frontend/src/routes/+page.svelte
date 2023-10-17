<script lang="ts">
  import { userTopGames, userGameStats } from '$lib/api/queries';
  import GameInfoBox from '$lib/components/GameInfoBox.svelte';
  import UserGameInformation from '$lib/components/UserGameInformation.svelte';
  import type { Game, GameStats} from '$lib/types/game';

  let steamId = "";
  let topGames: Game[] | null = null;
  let userStats: GameStats | null = null;

  const fetchTopGames = async () => {
    try {
      topGames = await userTopGames(steamId);
    } catch (error) {
      console.error("Error fetching top games:", error);
      topGames = null;
    }
  };

  const fetchUserPlaytimeStats = async () => {
    try {
      userStats = await userGameStats(steamId);
    } catch (error) {
      console.error("Error fetching user playtime stats:", error);
      userStats = null;
    }
  }

  const fetchGameData = async () => {
    await fetchTopGames();
    await fetchUserPlaytimeStats();
  }

</script>

<div class="flex justify-center mt-8">
  <div class="bg-white p-6 rounded shadow-md">
    <input 
      bind:value={steamId} 
      class="border p-2 rounded w-64" 
      placeholder="Users Steam Id"
    />
    <button 
      class="ml-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      on:click={fetchGameData}
    >
      Get Some GAMES
    </button>
  </div>
</div>


<div class="space-y-2 mt-8">
  {#if userStats}
    <UserGameInformation userStats={userStats} />
  {/if}

  {#if topGames && topGames.length > 0}
    <GameInfoBox games={topGames} />
  {/if}
</div>
