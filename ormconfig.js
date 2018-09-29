module.exports = {
  type: 'postgres',
  url: process.env.PG_URL,
  entities: ['src/**/*.entity{.ts,.js}'],
  // synchronize: process.env.NODE_ENV !== 'production',
  migrations: ['migrations/**/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
