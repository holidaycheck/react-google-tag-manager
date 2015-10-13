import { expect } from 'chai';

const gtmParts = require('../../src/index');

describe('foo', function () {
    it('dummyTestForSetup', function () {
       expect(true).to.equal(true);
    });
    it('dummyTest for babel test setup', function () {
        expect(gtmParts).to.have.property("iframe");
    })
});
