export default {
    DATABASE_HOST:            process.env.DATABASE_HOST || "mongodb://localhost/project_tcc",
    JWT_SECRET:                  process.env.JWT_SECRET || "somethingsecret",
}
