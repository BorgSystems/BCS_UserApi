import express from 'express';
import bodyParser from 'body-parser';
import ApiRouter from './Routes/ApiRouter';
import UserRouterHandler from './Routes/Handlers/UserRouterHandler';
import AuthorizationRouter from './Routes/Authorization/AuthorizationRouter';
import { FakeUserDataCreator } from './Data/Factory/Users/FakeUserDataCreator';
import UserBdDataCreator from './Data/Factory/Users/UserBdDataCreator';

const PORT = process.env.PORT || 6011;
const app = express();

const RoutesPath = {
    USERS: '/users',
    LOGIN: '/auth'
}


const DataCreators = {
    USERS_FAKE: new FakeUserDataCreator(),
    USERS_BD: new UserBdDataCreator()
}

const ApiRouters = {
    USERS: new ApiRouter(
        new UserRouterHandler(DataCreators.USERS_FAKE)
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
    console.log(`Application running at port: ${PORT}`);
});


