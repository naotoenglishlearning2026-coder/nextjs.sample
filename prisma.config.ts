import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  adapter: {
    provider: "sqlite",
    url: "file:./prisma/dev.db",
  },
});
