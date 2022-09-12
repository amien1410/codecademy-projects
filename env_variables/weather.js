import { getWeather } from "./weather-api.js";

// Import the dotenv package
import dotenv from "dotenv";

// Inject environment variables
dotenv.config()

// Get premium weather data from the API using a zip code and our API key
const weather_data = getWeather(process.env.ZIP_CODE, process.env.WEATHER_API_KEY);

// Output Data if no error has occurred
if (weather_data !== 0 && weather_data !== -1) {
    console.log(`Running the upgraded ${process.env.PROGRAM_NAME} using zip code: ${process.env.ZIP_CODE}...`);
    console.log(`The weather for ${weather_data.location} is:`);
    console.log(`\t Temperature: ${weather_data.temperature}.`);
    console.log(`\t Dew Point: ${weather_data.dewpoint}.`);
    console.log(`\t Humidity: ${weather_data.humidity}.`);
    console.log(`\t Wind: ${weather_data.wind}.`);
}
