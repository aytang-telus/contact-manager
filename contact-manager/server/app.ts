import * as express from 'express';
import * as path from 'path';  // < -- add this
import { Express, Request, Response } from 'express';

export default function createApp(): Express {
    const app = express();
    const port = 3000;
    const clientDir = path.join(__dirname, '../public');  // <-- add this 
    app.use(express.static(clientDir));                   // <-- and add this
    app.listen(port, () => {
        console.log("Application is running on port ${port}.");
    });
    return app;
}