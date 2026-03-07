import { defineDb, defineTable, column } from 'astro:db';

const CoffeeReviewPosts = defineTable({
  columns: {
    Name: column.text(),
    Date: column.date(),
    Address: column.text(),
    ParkingRanking: column.number(),
    PastriesRanking: column.number(),
    CoffeeRanking: column.number(),
    OverallRanking: column.number(),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { CoffeeReviewPosts }
});
