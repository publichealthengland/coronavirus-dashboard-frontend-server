'use strict';

function gtag() {
    window.dataLayer.push(arguments)
}

var setCookies = function () {
    window.dataLayer = window.dataLayer || [];

    gtag('js', new Date());
    gtag(
        'config',
        'UA-161400643-2',
        {
            'anonymize_ip': true,
            'allowAdFeatures': false
        }
    );
    window.ga('create', 'UA-145652997-1', 'auto', 'govuk_shared', { 'allowLinker': true });
    window.ga('govuk_shared.require', 'linker');
    window.ga('govuk_shared.set', 'anonymizeIp', true);
    window.ga('govuk_shared.set', 'allowAdFeatures', false);
    window.ga('govuk_shared.linker:autoLink', ['www.gov.uk']);
    window.ga('send', 'pageview');
    window.ga('govuk_shared.send', 'pageview');
};


var removeCookies = function () {
    document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_gat_gtag_UA_161400643_2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "LocationBanner=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};


var determineCookieState = function () {
    var cookies = document.cookie.split(';');
    var cookiePreferences = cookies.find(c => c.trim().startsWith('cookies_preferences_set_21_3'));

    if ( !cookiePreferences || cookiePreferences.split('=')[1] !== 'true' ) {
        var cookieBanner = document.querySelector("#cookie-banner");
        cookieBanner.style.display = 'block';
        cookieBanner.style.visibility = 'visible';
    }
};

function showElement (elm) {
    elm.style.display = 'block';
    elm.style.visibility = 'visible';
}

function hideElement (elm) {
    elm.remove()
}

function runCookieJobs() {
    var cookieDecisionBanner = document.querySelector('#global-cookie-message');

    document.querySelector("#accept-cookies").onclick = function () {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();
        var cookieExpiryDate = new Date(year, month + 1, day).toUTCString();

        document.cookie = `cookies_policy_21_3=${ encodeURIComponent('{"essential":true,"usage":true,"preferences":true}') }; expires=${ cookieExpiryDate };`;
        document.cookie = `cookies_preferences_set_21_3=true; expires=${ cookieExpiryDate };`;
        setCookies();

        showElement(cookieDecisionBanner);

        var cookieBanner = document.querySelector("#cookie-banner");
        hideElement(cookieBanner);

		    document.querySelector("#hide-cookie-decision").onclick = function () {
		        hideElement(cookieDecisionBanner);
		    };
    };

    document.querySelector("#reject-cookies").onclick = function () {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();
        var cookieExpiryDate = new Date(year, month + 1, day).toUTCString();

        document.cookie = `cookies_policy_21_3=${ encodeURIComponent('{"essential":true,"usage":false,"preferences":false}') }; expires=${ cookieExpiryDate };`;
        document.cookie = `cookies_preferences_set_21_3=true; expires=${ cookieExpiryDate };`;
        removeCookies();

        cookieDecisionBanner.innerHTML = cookieDecisionBanner.innerHTML.replace("accepted", "rejected");
        showElement(cookieDecisionBanner);

        var cookieBanner = document.querySelector("#cookie-banner");
        hideElement(cookieBanner);

		    document.querySelector("#hide-cookie-decision").onclick = function () {
		        hideElement(cookieDecisionBanner);
		    };
    };

    determineCookieState();
}

document.readyState !== 'loading'
    ? runCookieJobs()
    : document.addEventListener('DOMContentLoaded', runCookieJobs);