<script lang="ts">
  import { isPlaying } from '$lib/store';

  export let isMuted: boolean;
  export let toggleMute: () => void;
  export let play: () => void;
</script>

<div class="settings">
  <button on:click={toggleMute} data-state={isMuted ? 'on' : 'off'}>mute</button>
  <button
    on:click={play}
    data-state={$isPlaying && 'playing'}
    class="play-button | color-neon-green">▶</button
  >
</div>

<style>
  .settings {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
  }

  .play-button[data-state='playing'] {
    animation: pulse 0.3s infinite;
  }

  @keyframes pulse {
    0% {
      color: var(--almost-black);
    }
    50% {
      color: var(--neon-green);
    }
    100% {
      color: var(--almost-black);
    }
  }

  @media (max-width: 700px) {
    .settings {
      flex-direction: row;
    }
  }
</style>
