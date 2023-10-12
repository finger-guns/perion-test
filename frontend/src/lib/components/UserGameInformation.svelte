<script lang="ts">
    import type { GameStats } from '$lib/types/game';
  
    export let userStats: GameStats | null = null;
</script>
  
<div class="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-4 text-center">
    {#if userStats}
      <p class="mb-2"><strong>Total Games:</strong> {userStats.totalGames}</p>
      <p class="mb-2"><strong>Total Playtime:</strong> {userStats.totalPlaytime} hours</p>
      <p class="mb-2"><strong>Most Played Game:</strong> {userStats.mostPlayedGame.details.name}</p>
    {/if}
</div>