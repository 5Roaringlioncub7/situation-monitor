import { init, register, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('./en.json'));
register('zh', () => import('./zh.json'));

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()?.startsWith('zh') ? 'zh' : 'en'
});
