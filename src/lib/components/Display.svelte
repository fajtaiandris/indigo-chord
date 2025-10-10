<script lang="ts">
  export let name: string | undefined;
  export let type: string | undefined;
</script>

<div class="display font-pixel">
  <div class="display__name">
    {name || 'Select keys'}
  </div>
  <ul class="display__legend">
    <li data-state={type === 'note' && 'on'}>note</li>
    <li data-state={type === 'interval' && 'on'}>interval</li>
    <li data-state={type === 'triad' && 'on'}>triad</li>
    <li data-state={type === 'complex' && 'on'}>complex</li>
  </ul>
</div>

<style>
  .display {
    color: lightblue;
    background-color: var(--primary);
    width: 100%;
    max-width: 300px;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;
    border: 4px inset black;
  }

  .display__name {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
  }

  .display__legend {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.7rem;
    list-style: none;
    padding: 0.2rem 0.5rem;
    margin: 0;
    color: var(--primary-highlight);
  }

  .display__legend li[data-state='on'] {
    color: lightblue;
  }
</style>
