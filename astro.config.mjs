// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import gruvbox from "starlight-theme-gruvbox";
export default defineConfig({
	integrations: [
		starlight({
			title: '吾有一术',
			customCss: ['./src/styles/landing.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/gyxx-xc/WenyanNature' },
			],
			sidebar: [
				{ label: '首页', slug: 'index' },
				{
					label: '演示广场',
					items: [
						'demos',
						'demos/01_光影音律',
					],
				},
				{
					label: '快速入门',
					items: [
						{ label: '快速入门', slug: 'tutorial' },
						{ label: '认识符咒', slug: 'tutorial/01_concepts' },
						{ label: '运行第一个符咒', slug: 'tutorial/02_first_fuzhou' },
						{ label: '更进一步', slug: 'tutorial/03_variables_loops' },
						{ label: '拓展你的装备', slug: 'tutorial/04_advancement_path' },
						{ label: '常见问题', slug: 'tutorial/05_troubleshooting' },
					],
				},
				{
					label: '文言语法',
					items: [
						'usage',
						'usage/quick_start',
						'usage/varible',
						'usage/calculation',
						'usage/control',
						'usage/function',
						'usage/object',
						'usage/import',
						'usage/advanced',
						'usage/misc',
						'usage/syntax_cheatsheet',
						'usage/quick_reference',
					],
				},
				{
					label: '吾有一术',
					items: [
						{ label: '功能方块', items: [{ autogenerate: { directory: 'in_game' } }] },
						{ label: '功能符', items: [{ autogenerate: { directory: 'modules' } }] },
					],
				},
				{
					label: '吾有一术：新秩序',
					items: [
						{ label: '功能方块', items: [{ autogenerate: { directory: 'addon_blocks' } }] },
						{ label: '功能符', items: [{ autogenerate: { directory: 'addon_modules' } }] },
					],
				},
				{ label: '进阶内容', items: [{ autogenerate: { directory: 'development' } }] },
			],
			plugins: [gruvbox()],
		}),
	],
});
