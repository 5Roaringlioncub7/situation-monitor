<script lang="ts">
	import Modal from './Modal.svelte';
	import { settings } from '$lib/stores';
	import { PANELS, type PanelId } from '$lib/config';
	import { t, locale, locales } from 'svelte-i18n';

	interface Props {
		open: boolean;
		onClose: () => void;
		onReconfigure?: () => void;
	}

	let { open = false, onClose, onReconfigure }: Props = $props();

	function handleTogglePanel(panelId: PanelId) {
		settings.togglePanel(panelId);
	}

	function handleResetPanels() {
		settings.reset();
	}

	function handleLocaleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		$locale = target.value;
	}
</script>

<Modal {open} title={$t('settings.title')} {onClose}>
	<div class="settings-sections">
		<section class="settings-section">
			<h3 class="section-title">{$t('settings.language')}</h3>
			<select class="locale-select" value={$locale} onchange={handleLocaleChange}>
				{#each $locales as l}
					<option value={l}>{l === 'zh' ? '简体中文' : 'English'}</option>
				{/each}
			</select>
		</section>

		<section class="settings-section">
			<h3 class="section-title">{$t('settings.enabled_panels')}</h3>
			<p class="section-desc">{$t('settings.enabled_panels_desc')}</p>

			<div class="panels-grid">
				{#each Object.entries(PANELS) as [id, config]}
					{@const panelId = id as PanelId}
					{@const isEnabled = $settings.enabled[panelId]}
					<label class="panel-toggle" class:enabled={isEnabled}>
						<input
							type="checkbox"
							checked={isEnabled}
							onchange={() => handleTogglePanel(panelId)}
						/>
						<span class="panel-name">{$t(`panels.${panelId}`)}</span>
						<span class="panel-priority">P{config.priority}</span>
					</label>
				{/each}
			</div>
		</section>

		<section class="settings-section">
			<h3 class="section-title">{$t('settings.dashboard')}</h3>
			{#if onReconfigure}
				<button class="reconfigure-btn" onclick={onReconfigure}>
					{$t('settings.reconfigure')}
				</button>
				<p class="btn-hint">{$t('settings.reconfigure_desc')}</p>
			{/if}
			<button class="reset-btn" onclick={handleResetPanels}>
				{$t('settings.reset')}
			</button>
		</section>
	</div>
</Modal>

<style>
	.settings-sections {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.settings-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.section-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
		margin: 0;
	}

	.section-desc {
		font-size: 0.65rem;
		color: var(--text-muted);
		margin: 0;
	}

	.locale-select {
		padding: 0.4rem;
		background: var(--surface);
		border: 1px solid var(--border);
		color: var(--text-primary);
		font-size: 0.8rem;
		border-radius: 4px;
	}

	.panels-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	.panel-toggle {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.4rem 0.6rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border);
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.panel-toggle:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: var(--text-muted);
	}

	.panel-toggle.enabled {
		border-color: var(--accent);
		background: rgba(var(--accent-rgb), 0.1);
	}

	.panel-name {
		font-size: 0.7rem;
		flex: 1;
	}

	.panel-priority {
		font-size: 0.6rem;
		color: var(--text-muted);
		opacity: 0.7;
	}

	.reconfigure-btn,
	.reset-btn {
		padding: 0.5rem;
		font-size: 0.7rem;
		font-weight: 600;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.15s ease;
		text-align: center;
	}

	.reconfigure-btn {
		background: var(--accent);
		color: white;
		border: none;
	}

	.reconfigure-btn:hover {
		opacity: 0.9;
	}

	.reset-btn {
		background: transparent;
		color: var(--error);
		border: 1px solid var(--error);
	}

	.reset-btn:hover {
		background: var(--error);
		color: white;
	}

	.btn-hint {
		font-size: 0.6rem;
		color: var(--text-muted);
		margin-top: -0.3rem;
	}
</style>
