import * as express from 'express';
import * as path from 'path';  // < -- add this
import { Express, Request, Response } from 'express';
import * as livereload from 'livereload';
import * as connectLivereload from 'connect-livereload';
import { ConnectOptions } from 'mongoose';
import * as mongoose from 'mongoose';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';


// This creates an express application object which is named app by convention
// sets up the application with various settings and middleware
// exports the app from the module

export default function createApp(): Express {
    const app = express();
    const port = 3000;

    const route = require('./routes/route');
    const clientDir = path.join(__dirname, '../public');  

    //mongoose.connect('mongodb://localhost:27017/contactlist', {useNewUrlParser: true });
    mongoose.connect('mongodb://localhost:27017/contactlist', {useNewUrlParser: true } as ConnectOptions);
    
    mongoose.connection.on('connected', ()=>{
        console.log('Connected to database mongodb port 27017');
    });

    mongoose.connection.on('error', (err)=>{
        if(err) {
            console.log('Error in Database connection ' + err);
        }
    });    

    let livereloadServer: any;
    if (process.env.NODE_ENV !== 'production') {
        livereloadServer = livereload.createServer();
        livereloadServer.watch(clientDir);
        app.use(connectLivereload());
        
        livereloadServer.once('connection', () => {
          setTimeout(() => livereloadServer.refresh('/'), 100);
        });
    }

    app.use(express.static(clientDir));    
    app.use(cors());
    app.use(bodyparser.json());
    app.use('/api', route);

    app.get('/test',(req, res)=>{
        res.send('Yes this message is from server!');
    })
    
    app.listen(port, () => {
        console.log('Server started at port:' + port);
    });

    return app;
}