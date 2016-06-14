import { expect } from 'chai';
import buildParts from '../../src/build_parts';

let onlyIdArgs;
let parts;

describe('The function buildParts', () => {
    beforeEach(() => {
        onlyIdArgs = { id: 'GTM-asd123' };
        parts = buildParts(onlyIdArgs);
    });

    it('should consume an `id` and use it for the iframe', () => {
        expect(parts.iframe).to.have.entriesCount('id=GTM-asd123', 1);
    });

    it('should consume an `id` and use it for the script', () => {
        expect(parts.script).to.have.entriesCount('GTM-asd123', 1);
    });

    it('should through an exception when no id is provided', () => {
        expect(() => buildParts()).to.throw(Error);
    });

    it('should consume a `dataLayerName`', () => {
        const dataLayerArgs = Object.assign(onlyIdArgs, { dataLayerName: 'MyFooBarLayer' });

        expect(buildParts(dataLayerArgs).script).to.have.entriesCount('MyFooBarLayer', 1);
    });

    it('should have a `dataLayerName` default', () => {
        expect(buildParts(onlyIdArgs).script).to.have.entriesCount('dataLayer', 2);
    });

    it('should consume additional events as object', () => {
        const additionalEvents = {
            platform: 'react-stack',
            forceMobile: false,
            clientTimestamp: 1465848238816
        };
        const addtionalEventsArgs = Object.assign(onlyIdArgs, { additionalEvents });

        expect(buildParts(addtionalEventsArgs).script).to.have.entriesCount('"platform":"react-stack"', 1);
        expect(buildParts(addtionalEventsArgs).script).to.have.entriesCount('"forceMobile":false', 1);
        expect(buildParts(addtionalEventsArgs).script).to.have.entriesCount('"clientTimestamp":1465848238816', 1);
    });

    it('should return an object with a property `iframe`', () => {
        expect(parts).to.have.property('iframe');
    });

    it('should return an object with a property `script`', () => {
        expect(parts).to.have.property('script');
    });
});
