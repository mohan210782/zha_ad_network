export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.POSTGRES_HOST || "localhost",
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      //uri: process.env.POSTGRES_HOST || "mongodb://localhost/bluetrade"
    },
    email: {
        smtp_host: process.env.SMTP_HOST,
        smtp_port: parseInt(process.env.SMTP_PORT, 10),
        reset_password_url: process.env.RESET_PASSWORD_URL || "http://localhost:3000/resetpassword"
      }
  });