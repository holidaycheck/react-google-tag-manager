import buildParts from './build_parts'
import React from 'react'

function GTMParts (args) {

    const  parts = buildParts(args);

    function noScriptAsReact() {
        return <noscript dangerouslySetInnerHTML = {{ __html: parts.iframe }} ></noscript>
    }

    function noScriptAsHTML() {
        return `<noscript>${parts.iframe}</noscript>`;
    }

    function scriptAsReact() {
        return <script dangerouslySetInnerHTML = {{ __html: parts.script }} ></script>
    }

    function scriptAsHTML() {
        return `<script>${parts.script}</script>`;
    }

    return {
        noScriptAsReact,
        noScriptAsHTML,
        scriptAsReact,
        scriptAsHTML
    };
}

export default GTMParts;
