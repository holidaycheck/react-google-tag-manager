import { expect } from 'chai';
const buildGTMParts = require('../../src/build-gtm-parts');
let onlyIdArgs;
let gtmParts;

describe('The function gtmParts', () => {
    beforeEach(() => {
        onlyIdArgs = { id: 'GTM-asd123' };
        gtmParts = buildGTMParts(onlyIdArgs);
    });

    it('should consume an `id` and use it for the iframe', () => {
        expect(gtmParts.iframe).to.have.entriesCount('id=GTM-asd123', 1);
    });

    it('should consume an `id` and use it for the script', () => {
        expect(gtmParts.script).to.have.entriesCount('GTM-asd123', 1);
    });

    it('should through an exception when no id is provided', () => {
        expect(() => buildGTMParts()).to.throw(Error);
    });

    it('should consume a `dataLayerName`', () => {
        const dataLayerArgs = Object.assign(onlyIdArgs, { dataLayerName: 'MyFooBarLayer' });

        expect(buildGTMParts(dataLayerArgs).script).to.have.entriesCount('MyFooBarLayer', 1);
    });

    it('should have a `dataLayerName` default', () => {
        expect(buildGTMParts(onlyIdArgs).script).to.have.entriesCount('dataLayer', 2);
    });

    it('should consume additional events as object', () => {
        const additionalEvents = {
            myCustomEvent: 'asd',
            anotherCustomEvent: false,
            oneMoreWithNumber: 123
        };
        const addtionalEventsArgs = Object.assign(onlyIdArgs, { additionalEvents });

        expect(buildGTMParts(addtionalEventsArgs).script).to.have.entriesCount('myCustomEvent":"asd"', 1);
        expect(buildGTMParts(addtionalEventsArgs).script).to.have.entriesCount('"anotherCustomEvent":false', 1);
        expect(buildGTMParts(addtionalEventsArgs).script).to.have.entriesCount('"oneMoreWithNumber":123', 1);
    });

    it('should return an object with a property `iframe`', () => {
        expect(gtmParts).to.have.property('iframe');
    });

    it('should return an object with a property `script`', () => {
        expect(gtmParts).to.have.property('script');
    });
});
