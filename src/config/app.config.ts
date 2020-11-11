export default () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    hostname: process.env.HOST_NAME ?? '0.0.0.0',
    port: parseInt(process.env.PORT ?? '3000', 10),
    cronPort: parseInt(process.env.CRON_PORT ?? '3001', 10),
    mongodb: {
      host: process.env.DATABASE_HOST ?? 'mongodb://localhost/',
      databaseName: process.env.DATABASE_NAME ?? 'nestjs-template',
    },
    rateLimit: {
      windowTimeMs: 15 * 60 * 1000, // 15 minutes
      maxRequest: 100, // limit each IP to 100 requests per windowMs
    },
  };
};
