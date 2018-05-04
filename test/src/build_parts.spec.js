import { expect, Assertion } from 'chai';
import { parse } from 'acorn';
import buildParts from '../../src/build_parts';

Assertion.addMethod('javascript', function () {
    let isValidJS = false;
    try {
        parse(this._obj, { ecmaVersion: 5 });
        isValidJS = true;
    } catch (e) {
        isValidJS = false;
    }

    this.assert(
    isValidJS,
    'expected #{this} to be valid JavaScript',
    'expected #{this} to not be valid JavaScript'
  );
});

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

    it('should build valid javascript', () => {
        expect(parts.script).to.be.javascript();
    });

    it('should through an exception when no id is provided', () => {
        expect(() => buildParts()).to.throw(Error);
    });

    it('should consume a `dataLayerName`', () => {
        const dataLayerArgs = Object.assign(onlyIdArgs, { dataLayerName: 'MyFooBarLayer' });
        const script = buildParts(dataLayerArgs).script;

        expect(script).to.be.javascript();
        expect(script).to.have.entriesCount('MyFooBarLayer', 1);
    });

    it('should consume a `previewVariables` and use it for the script', () => {
        const dataLayerArgs = Object.assign(onlyIdArgs,
          { previewVariables: '&gtm_auth=EXAMPLE&gtm_preview=env-14&gtm_cookies_win=x' });
        const script = buildParts(dataLayerArgs).script;

        expect(script).to.be.javascript();
        expect(script).to.have
            .entriesCount('+"&gtm_auth=EXAMPLE&gtm_preview=env-14&gtm_cookies_win=x"', 1);
    });

    it('should consume a `previewVariables` and use it for the iframe', () => {
        const dataLayerArgs = Object.assign(onlyIdArgs,
        { previewVariables: '&gtm_auth=EXAMPLE&gtm_preview=env-14&gtm_cookies_win=x' });
        const iframe = buildParts(dataLayerArgs).iframe;
        expect(iframe).to.have.entriesCount('&gtm_auth=EXAMPLE&gtm_preview=env-14&gtm_cookies_win=x', 1);
    });

    it('should have a `dataLayerName` default', () => {
        expect(buildParts(onlyIdArgs).script).to.have.entriesCount('dataLayer', 2);
    });

    it('should use a provided `scheme` option', () => {
        const schemaWithIdArgs = Object.assign(onlyIdArgs, { scheme: 'https:' });
        const script = buildParts(schemaWithIdArgs).script;

        expect(script).to.be.javascript();
        expect(script).to.have.entriesCount('https:', 1);
        expect(buildParts(schemaWithIdArgs).iframe).to.have.entriesCount('https:', 1);
    });

    it('should not define `scheme` if it was not specified', () => {
        expect(buildParts(onlyIdArgs).script).to.have.entriesCount('.src=\'//', 1);
        expect(buildParts(onlyIdArgs).iframe).to.have.entriesCount(' src="//', 1);
    });

    it('should consume additional events as object', () => {
        const additionalEvents = {
            platform: 'react-stack',
            forceMobile: false,
            clientTimestamp: 1465848238816
        };
        const addtionalEventsArgs = Object.assign(onlyIdArgs, { additionalEvents });
        const script = buildParts(addtionalEventsArgs).script;

        expect(script).to.be.javascript();
        expect(script).to.have.entriesCount('"platform":"react-stack"', 1);
        expect(script).to.have.entriesCount('"forceMobile":false', 1);
        expect(script).to.have.entriesCount('"clientTimestamp":1465848238816', 1);
    });

    it('should return an object with a property `iframe`', () => {
        expect(parts).to.have.property('iframe');
    });

    it('should return an object with a property `script`', () => {
        expect(parts).to.have.property('script');
    });
});
