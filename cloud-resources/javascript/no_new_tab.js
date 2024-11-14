// ==UserScript==
// @name         Remove target="_blank" from links at intervals
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes target="_blank" from all links to prevent opening in new tabs, at regular intervals
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove target="_blank" from all links
    function removeTargetBlank() {
        const links = document.querySelectorAll('a[target="_blank"]');
        links.forEach(link => {
            link.removeAttribute('target');
            console.log(`Removed target="_blank" from: ${link.href}`);
        });
    }

    // Run the removal function immediately on script load
    removeTargetBlank();

    // Set an interval to run the function every 0.5 seconds (500ms)
    setInterval(removeTargetBlank, 500);  // 500ms = 0.5 seconds
})();
