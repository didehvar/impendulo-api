module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity{.ts,.js}'],
  logging: process.env.NODE_ENV === 'development',
  migrations: ['migrations/**/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
