module.exports = {
  type: 'postgres',
  url: process.env.PG_URL,
  entities: [__dirname + '/**/*.entity.ts'],
  synchronize: process.env.NODE_ENV !== 'production',
  migrations: ['/migration/**/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
};
