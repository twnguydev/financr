module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: ['dist/**/*.entity*{.js,.ts}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
  seeds: ["src/seeders/**/*.ts"],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logging: true,
  ssl: process.env.FINANCR_ENV === 'production' ? { rejectUnauthorized: false } : false,
};
