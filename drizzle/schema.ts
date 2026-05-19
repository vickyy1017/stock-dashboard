import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// 股票申请留言板
export const stockRequests = mysqlTable("stock_requests", {
  id: int("id").autoincrement().primaryKey(),
  ticker: varchar("ticker", { length: 20 }).notNull(),
  companyName: varchar("companyName", { length: 200 }),
  reason: text("reason"),
  authorName: varchar("authorName", { length: 100 }).notNull(),
  likes: int("likes").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StockRequest = typeof stockRequests.$inferSelect;
export type InsertStockRequest = typeof stockRequests.$inferInsert;

// 留言点赞记录（防重复点赞，用 IP+id 简单控制）
export const stockRequestLikes = mysqlTable("stock_request_likes", {
  id: int("id").autoincrement().primaryKey(),
  requestId: int("requestId").notNull(),
  fingerprint: varchar("fingerprint", { length: 128 }).notNull(), // IP or browser fingerprint
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
