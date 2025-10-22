import { pgTable, serial, varchar, timestamp, pgEnum ,integer,numeric,date,text,uniqueIndex} from "drizzle-orm/pg-core";


export const userRoleEnum = pgEnum("user_role", ["admin", "user"])

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})



export const showtimes = pgTable("showtimes", {
  id: serial("id").primaryKey(),

  movieId: integer("movie_id")
    .notNull()
    .references(() => movies.id, { onDelete: "cascade" }),

  hallId: integer("hall_id")
    .notNull()
    .references(() => halls.id, { onDelete: "cascade" }),

  startTime: timestamp("start_time").notNull(), 
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  duration: integer("duration").notNull(),
  releaseDate: date("release_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const halls = pgTable("halls", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  totalRows: integer("total_rows").notNull(),       
  totalColumns: integer("total_columns").notNull(), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
})



export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  showtimeId: integer("showtime_id")
    .notNull()
    .references(() => showtimes.id, { onDelete: "cascade" }),

  bookedAt: timestamp("booked_at").defaultNow().notNull(),
});


export const bookingSeats = pgTable(
  "booking_seats",
  {
    id: serial("id").primaryKey(),

    bookingId: integer("booking_id")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),

    seatRow: integer("seat_row").notNull(),
    seatColumn: integer("seat_column").notNull(),
  },
  (table) => [

    uniqueIndex("unique_seat_per_showtime").on(
      table.seatRow,
      table.seatColumn,
      table.bookingId
    ),
  ]
);