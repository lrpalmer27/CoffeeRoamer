import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Optional location/frontmatter for mapping posts
			location: z.string().optional(),
			coords: z.tuple([z.number(), z.number()]),
			// Numeric rankings (1-5 scale)
			PastriesRanking: z.number().optional().transform(val => val ? (val / 5) * 100 : 0),
			ParkingRanking: z.number().optional().transform(val => val ? (val / 5) * 100 : 0),
			CoffeeRanking: z.number().optional().transform(val => val ? (val / 5) * 100 : 0),
			OverallRanking: z.number().optional().transform(val => val ? (val / 5) * 100 : 0),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

export const collections = { blog };
