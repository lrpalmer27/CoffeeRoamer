// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import {BASE} from './src/consts.ts';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
    site: 'https://lrpalmer27.github.io',
    base: BASE,
    integrations: [mdx(), sitemap(), db()],
});