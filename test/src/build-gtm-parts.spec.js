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
});
