function convertToKeyValueString(obj) {
    return JSON.stringify(obj).slice(1, -1);
}

function buildParts({ id, dataLayerName = 'dataLayer', additionalEvents = {}, scheme = '' }) {
    if (id === undefined) {
        throw new Error('No GTM id provided');
    }

    const iframe = `
        <iframe src="${scheme}//www.googletagmanager.com/ns.html?id=${id}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

    const script = `
        (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js', ${convertToKeyValueString(additionalEvents)}});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='${scheme}//www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
        })(window,document,'script','${dataLayerName}','${id}');`;

    return {
        iframe,
        script
    };
}

export default buildParts;
