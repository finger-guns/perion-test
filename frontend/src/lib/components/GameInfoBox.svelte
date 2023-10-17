<script lang="ts">
  import type { Game } from '$lib/types/game'

  export let games: Game[] = [];
</script>

{#each games as game}
<div class="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-4 border border-gray-300">
  <img src={game.details.header_image} alt={game.details.name} class="rounded mb-4 w-full h-48 object-cover"/>
  <h2 class="text-2xl font-bold mb-2">{game.details.name}</h2>
  <p class="text-sm text-gray-600 mb-4">{game.details.type}</p>
  <p class="text-gray-800 mb-4">{game.details.detailed_description}</p>
  <p class="text-gray-500">
    {game.details.release_date.coming_soon ? 'Coming Soon' : `Released: ${game.details.release_date.date}`}
  </p>
</div>
{/each}
