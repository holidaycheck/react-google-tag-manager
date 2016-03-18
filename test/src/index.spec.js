import { expect } from 'chai';
import gtmParts from '../../src/index.jsx';

const gtmId = 'foobar-123';
const parts = gtmParts({ id: gtmId });

describe('The function GTMParts', () => {
    it('should return a noscript component', () => {
        const noscript = parts.noScriptAsReact();

        expect(noscript).to.have.deep.property('type', 'noscript');
        expect(noscript).to.have.deep.property('props.dangerouslySetInnerHTML.__html')
            .that.contains(gtmId);
    });

    it('should return a noscript string', () => {
        const noscript = parts.noScriptAsHTML();

        expect(noscript).to.startWith('<noscript>');
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

        expect(script).to.startWith('<script>');
        expect(script).to.endWith('</script>');
    });
});
