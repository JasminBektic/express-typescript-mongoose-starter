import app from "./app/app";


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
});