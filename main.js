// ==UserScript==
// @name         XP Boost
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Script that multiplies your XP when doing Times Tables Club Check!
// @author       Sparxist
// @match        *://*.sparx-learning.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const targetUrl = "https://api.sparx-learning.com/sparx.swworker.v1.Sparxweb/SendIndependentLearningTablesAnswers";
    const N = 1000; // How many times should each times table be sent?
    const delay = 10; // How fast, in milliseconds, should each request be sent?

    // Intercepts fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        const [input, init] = args;
        
        if (init?.method?.toUpperCase() === "POST" && 
            (typeof input === 'string' ? input.includes(targetUrl) : input.url.includes(targetUrl))) {
            console.log(`[XP-Boost] Intercepted fetch request to ${targetUrl}, sending ${N} additional requests...`);
            
            console.log(`[XP-Boost] Starting to send ${N} requests via fetch...`);
            for (let i = 0; i < N; i++) {
                await new Promise(r => setTimeout(r, delay));
                try {
                    originalFetch(input, init);
                } catch (e) {
                    console.error('[XP-Boost] Error in fetch interceptor:', e);
                }
            }
        }
        
        return originalFetch(...args);
    };

    // Intercepts XHR requests
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        this._url = url;
        this._method = method;
        return originalOpen.call(this, method, url, ...rest);
    };

    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        if (this._method?.toUpperCase() === "POST" && this._url?.includes(targetUrl)) {
            console.log(`[XP-Boost] Intercepted XHR request to ${targetUrl}, sending ${N} additional requests...`);
            
            console.log(`[XP-Boost] Starting to send ${N} requests via XHR...`);
            for (let i = 0; i < N; i++) {
                setTimeout(() => {
                    try {
                        const xhr = new XMLHttpRequest();
                        xhr.open(this._method, this._url, true);
                        
                        if (this._headers) {
                            Object.entries(this._headers).forEach(([key, value]) => {
                                xhr.setRequestHeader(key, value);
                            });
                        }
                        xhr.send(body);
                    } catch (e) {
                        console.error('[XP-Boost] Error in XHR intercept:', e);
                    }
                }, delay * i);
            }
        }
        
        return originalSend.call(this, body);
    };

    // Store original setRequestHeader for preserves headers
    const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
        if (!this._headers) {
            this._headers = {};
        }
        this._headers[header] = value;
        return originalSetRequestHeader.call(this, header, value);
    };

    console.log('[XP-Boost] Loaded! Bon voyage with your XP hunt!');
    console.log('[XP-Boost] https://github.com/Sparxist/XP-Boost');
})();
