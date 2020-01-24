import 'mocha';
import {expect} from 'chai';

import UserBdDataProvider from '../../../src/Data/Providers/UserProviders/UserBdDataProvider';
import UserValuesBuilder from '../../../src/Data/Builders/ValuesBuilder/UserValuesBuilder';
import { User } from '../../../src/Models/Users/User';

//CRUDL tests: Create, Read, Update, Delete, List
describe('User data provider from dataBase CRUDL', () => {

    const userProvider = new UserBdDataProvider();
    const userValuesBuilder = new UserValuesBuilder();
    it('Should *Create* user', async () => {
        const values = userValuesBuilder
            .setFirstName('Vova')
            .setPhoneNumber('+7 1488 1488')
            .build();
        const createdUser = await userProvider.create(new User(values));
        expect(createdUser).is.not.null;
        expect(createdUser).is.not.undefined;
    });

    it('Should *Read* user', async () => {
        
    });

    it('Should *Update* user', async () => {

    });

    it('Should *Delete* user', async () => {

    });

    it('Should *List* users', async () => {

    });

});