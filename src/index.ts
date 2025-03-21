import express, { Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorHandler } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app = express();

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  query: {
    user: {
      create({ args, query }) {
        args.data = SignUpSchema.parse(args.data);
        return query(args);
      },
    },
  },
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
