const  server = require('./app');

app = server.App();

const PORT = process.env.port || 3000;
app.listen(PORT, ()=>{
    console.log("App listening at port "+PORT);
});

