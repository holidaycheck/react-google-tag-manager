import { expect } from 'chai';
import gtmParts from '../../src/index.jsx';

const gtmId = 'foobar-123';
const parts = gtmParts({ id: gtmId });
const nonce = '2345wertasf';

describe('The function GTMParts', () => {
    it('should return a noscript component', () => {
        const noscript = parts.noScriptAsReact();

        expect(noscript).to.have.deep.property('type', 'noscript');
        expect(noscript).to.have.deep.property('props.dangerouslySetInnerHTML.__html')
            .that.contains(gtmId);
    });

    it('should return a noscript string', () => {
        const noscript = parts.noScriptAsHTML();

        expect(noscript).to.startWith('<noscript');
        expect(noscript).to.endWith('</noscript>');
    });

    it('should return a script component', () => {
        const script = parts.scriptAsReact();

        expect(script).to.have.deep.property('type', 'script');
        expect(script).to.have.deep.property('props.dangerouslySetInnerHTML.__html')
            .that.contains(gtmId);
    });

    it('should return a script string', () => {
        const script = parts.scriptAsHTML();

        expect(script).to.startWith('<script');
        expect(script).to.endWith('</script>');
    });

    it('should add attributes if passed', () => {
        const noscriptWithAttributes = parts.noScriptAsReact({ attributes: { nonce } });
        expect(noscriptWithAttributes).to.have.deep.property('props.nonce', nonce);

        const noscriptStringWithAttributes = parts.noScriptAsHTML({ attributes: { nonce } });
        expect(noscriptStringWithAttributes).to.contain(`nonce="${nonce}"`);

        const scriptWithAttributes = parts.scriptAsReact({ attributes: { nonce } });
        expect(scriptWithAttributes).to.have.deep.property('props.nonce', nonce);

        const scriptStringWithAttributes = parts.scriptAsHTML({ attributes: { nonce } });
        expect(scriptStringWithAttributes).to.contain(`nonce="${nonce}"`);
    });
});
