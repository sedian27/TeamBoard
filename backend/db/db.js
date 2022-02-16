import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    // conexion con la base de datos de mongodb, si no existe la base de datos la crea.
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true, // Para que no salga la url de conexion en consola
      useUnifiedTopology: true, // Tipo de escritura más entendible en consola
    });
    console.log("Connection with MongoDB: OK.");
  } catch (e) {
    console.log("Error connecting to MongoDB: \n", e);
  }
};

export default { dbConnection };
