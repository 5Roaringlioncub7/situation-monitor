<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import { isLoading } from 'svelte-i18n';

	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-screen bg-bg text-text-primary">
	{#if $isLoading}
		<div class="flex items-center justify-center min-h-screen">
			<div class="text-sm text-text-muted">Loading...</div>
		</div>
	{:else}
		{@render children()}
	{/if}
</div>
