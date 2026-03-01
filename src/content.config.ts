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
			// Numeric rankings (1-5 scale)
			PastriesRanking: z.number().optional(),
			ParkingRanking: z.number().optional(),
			CoffeeRanking: z.number().optional(),
			OverallRanking: z.number().optional(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

export const collections = { blog };
