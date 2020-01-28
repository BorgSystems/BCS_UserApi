import 'mocha';
import {expect} from 'chai';

import UserSqlBdDataProvider from '../../../src/Data/Providers/UserProviders/UserSqlBdDataProvider';
import UserValuesBuilder from '../../../src/Data/Builders/ValuesBuilder/UserValuesBuilder';
import { User } from '../../../src/Models/Users/User';
import { fail } from 'assert';
import { SqlQueryConditionBuilder, SqlCondition } from '../../../src//Data/Sql/QueryContainers';
import UserValues from '../../../src/Models/Users/UserValues';
import { before } from 'mocha';

//THIS TESTS WORK ONLY WITH CLEARLY DATABASE!
//CRUDL tests: Create, Read, Update, Delete, List
describe('User data provider from dataBase CRUDL', () => {

    const userProvider = new UserSqlBdDataProvider();
    const conditionBuilder = new SqlQueryConditionBuilder();
    const userValuesBuilder = new UserValuesBuilder();
    before(async () => {
        //fill database
        const values: Array<UserValues> = [
            userValuesBuilder
            .setFirstName('MichaelIvanco')
            .setPhoneNumber('1314-9999')
            .setRole(0)
            .setBonuses(12)
            .build() ,

            userValuesBuilder
            .setFirstName('B0riz')
            .setPhoneNumber('1488-1488')
            .setRole(2)
            .setBonuses(300)
            .build() 
        ]
        for(const val of values) {
            await userProvider.create(new User(val));
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }); 
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
        expect(createdUser.getValues().phone_number).is.not.undefined;
    });

    it('Should *Read* user by name', async () => {
        const conditionBuilder = new SqlQueryConditionBuilder();
        const conditions = conditionBuilder
            .addField('first_name','B0riz')
            .addCondition(SqlCondition.AND)
            .addField('phone_number', '1488-1488')
            .build();
        
        const readedUsers = await userProvider.read(conditions);
        const readedValues = readedUsers[0].getValues();
        expect(readedValues).is.not.null;
        expect(readedValues).is.not.undefined;
        expect(readedValues.first_name).is.equal('B0riz'); 
        expect(readedValues.phone_number).is.equal('1488-1488'); 
    });

    it('Should *Read* sever users by name', async () => {
        const conditions = conditionBuilder
            .addField('first_name','B0riz')
            .addCondition(SqlCondition.OR)
            .addField('first_name','MichaelIvanco')
            .build();
        
        const readedUsers = await userProvider.read(conditions);
        expect(readedUsers.length > 0).is.equal(true);
        const boriz = readedUsers.find(u => u.getValues().first_name === 'B0riz');
        const micha = readedUsers.find(u => u.getValues().first_name === 'MichaelIvanco');

        expect(boriz).is.not.null; 
        expect(boriz).is.not.undefined; 
        expect(micha).is.not.null; 
        expect(micha).is.not.undefined; 
    });

    it('Should *Update* user', async () => {
        const userValues = userValuesBuilder
            .setFirstName('pizdanutiy')
            .setPhoneNumber('20-25-50')
            .build();
        const conditions = conditionBuilder
            .addField('first_name', 'B0riz')
            .build();
        const isUpdated = await userProvider.update(userValues, conditions);
        expect(isUpdated).is.equal(true);
    });

    it('Should *Delete* user', async () => {
        const conditions = conditionBuilder
            .addField('first_name', 'pizdanutiy')
            .build();
        const isDeleted = await userProvider.delete(conditions);
        expect(isDeleted).is.true;
    });

    it('Should *List* users', async () => {
        const allUsers = await userProvider.list();
        expect(allUsers.length > 1).is.true;
    });
});