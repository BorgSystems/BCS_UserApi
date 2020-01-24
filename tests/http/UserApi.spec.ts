import 'mocha';
import {expect} from 'chai';
import axios from 'axios';
import UserValuesBuilder from '../../src/Data/Builders/ValuesBuilder/UserValuesBuilder';

const urlPath = 'http://localhost:6011/users/';

//TODO: unSkip HTTP tests
describe.skip('Users api tests', () => {
    console.warn(`* * * * * * * * * * * * * * * * * * * * * * * * * * * *`);
    console.warn(`* * * DONT FORGET RUN SERVER APP BEFORE API TESTS * * *`);
    console.warn(`* * * * * * * * * * * * * * * * * * * * * * * * * * * *`);

    it('Should crete user *POST*', async () => {
        const valuesBuilder = new UserValuesBuilder();
        const values = valuesBuilder
            .setFirstName('Obezyanka-petrushka')
            .setPhoneNumber(`1488-1488-1488`)
            .build();

        Reflect.set(values, 'role', 'ADMIN'); //set role for safe request
        
        const response = await axios.post(urlPath, values);
        const responsedValues = response.data.Data._userValues;
        expect(responsedValues.firstName).is.equals(values.firstName);
        expect(responsedValues.phoneNumber).is.equals(values.phoneNumber);
    });

    it('Should change user *PUT*', async () => {
        const valuesBuilder = new UserValuesBuilder();
        const values = valuesBuilder
            .setFirstName('Krimnashist')
            .setPhoneNumber(`8841-8841-1488`)
            .build();
        const response = await axios.put(urlPath + '0', values);
        const responsedValues = response.data.Data._userValues;
        expect(responsedValues.firstName).is.equals(values.firstName);
        expect(responsedValues.phoneNumber).is.equals(values.phoneNumber);
    });

    it('Should delete user *DELETE*', async () => {
        const response = await axios.delete(urlPath + '0');
        const responsedStatus = response.data.Status;
        expect(responsedStatus).is.equals('SUCCESS');
    });

    it('Should get user by id *GET*', async () => {
        const response = await axios.get(urlPath + '1');
        const responsedValues = response.data.Status;
        expect(responsedValues).is.equals('SUCCESS');
    });

    it('Should get users list', async () => {
        const response = await axios.get(urlPath);
        const responsedValues = response.data.Status;
        expect(responsedValues).is.equals('SUCCESS');
    });
});