module.exports = {
  type: 'postgres',
  url: process.env.PG_URL,
  entities: ['src/**/*.entity{.ts,.js}'],
  logging: process.env.NODE_ENV === 'development',
  // synchronize: process.env.NODE_ENV !== 'production',
  migrations: ['migrations/**/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
