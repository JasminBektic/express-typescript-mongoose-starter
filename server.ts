import app from "./app/app";
import Log from "./app/log/Log";


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    Log.save(Log.INFO, 'Missile launched.');
    console.log(`Listening on port ${PORT} ...`);
});