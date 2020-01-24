import express from 'express';
import bodyParser from 'body-parser';
import ApiRouter from './Routes/ApiRouter';
import UserRouterHandler from './Routes/Handlers/UserRouterHandler';
import AuthorizationRouter from './Routes/Authorization/AuthorizationRouter';
import { EventTypes } from './Data/Events/EventType';
import { EventNames } from './Data/Events/EventName';

import Config from './Config/Config';
import { FakeUserDataCreator } from './Data/Factory/Users/FakeUserDataCreator';

const PORT = process.env.PORT || 6011;
const app = express();

const RoutesPath = {
    USERS: '/users',
    LOGIN: '/auth'
}


const DataCreators = {
    USERS: new FakeUserDataCreator()
}

const ApiRouters = {
    USERS: new ApiRouter(
        new UserRouterHandler(DataCreators.USERS)
        )
    
}

const Routers = {
    LOGIN: new AuthorizationRouter()
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(RoutesPath.USERS, ApiRouters.USERS.getRouter());
app.use(RoutesPath.LOGIN, Routers.LOGIN.getRouter());

app.get('/', (req, res) => {
    const body = req.body;
    if(body.name) {   
        res.send(`Hi man ${body.name} !`);
        return;
    }
    res.send('Hey baby');
});

app.listen(PORT, () => {
    console.log(`Applicatuin running at port: ${PORT}`);
});


