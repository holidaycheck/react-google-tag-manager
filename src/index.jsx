import buildParts from './build_parts';
import React from 'react';

function createAttributesString(attributes = {}) {
    return Object.keys(attributes).reduce((acc, key) => `${acc} ${key}="${attributes[key]}"`, '');
}

function GTMParts(args) {
    const parts = buildParts(args);

    function noScriptAsReact({ attributes } = {}) {
        return <noscript {...attributes || {}} dangerouslySetInnerHTML={{ __html: parts.iframe }}></noscript>;
    }

    function noScriptAsHTML({ attributes } = {}) {
        return `<noscript ${createAttributesString(attributes)}>${parts.iframe}</noscript>`;
    }

    function scriptAsReact({ attributes } = {}) {
        return <script {...attributes || {}} dangerouslySetInnerHTML={{ __html: parts.script }}></script>;
    }

    function scriptAsHTML({ attributes } = {}) {
        return `<script ${createAttributesString(attributes)}>${parts.script}</script>`;
    }

    return {
        noScriptAsReact,
        noScriptAsHTML,
        scriptAsReact,
        scriptAsHTML
    };
}

export default GTMParts;
