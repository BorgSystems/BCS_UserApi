import 'mocha';
import {expect} from 'chai';

import UserBdDataProvider from '../../../src/Data/Providers/UserProviders/UserBdDataProvider';
import UserValuesBuilder from '../../../src/Data/Builders/ValuesBuilder/UserValuesBuilder';
import { User } from '../../../src/Models/Users/User';
import { fail } from 'assert';

//CRUDL tests: Create, Read, Update, Delete, List
describe('User data provider from dataBase CRUDL', () => {

    const userProvider = new UserBdDataProvider();
    const userValuesBuilder = new UserValuesBuilder();
    it('Should *Create* user', async () => {
        const values = userValuesBuilder
            .setFirstName('Vova')
            .setPhoneNumber('+7 1488 1488')
            .setRole(3)
            .setBonuses(500)
            .build();
        const createdUser = await userProvider.create(new User(values));
        expect(createdUser).is.not.null;
        expect(createdUser).is.not.undefined;
        expect(createdUser.getValues().phoneNumber).is.not.undefined;
    });

    it.skip('Should *Read* user', async () => {
        fail();
    });

    it.skip('Should *Update* user', async () => {
        fail();
    });

    it.skip('Should *Delete* user', async () => {
        fail();
    }).skip;

    it.skip('Should *List* users', async () => {
        fail();
    });
});