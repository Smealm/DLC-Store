// ==UserScript==
// @name         Remove target="_blank" from links dynamically
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes target="_blank" from all links to prevent opening in new tabs, including newly added ones
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

    // Initial run to remove target="_blank" from existing links
    removeTargetBlank();

    // Set up a MutationObserver to detect new <a> elements added to the DOM
    const observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'A' && node.hasAttribute('target') && node.getAttribute('target') === '_blank') {
                        node.removeAttribute('target');
                        console.log(`Removed target="_blank" from new link: ${node.href}`);
                    }
                });
            }
        }
    });

    // Start observing the document for added child elements
    observer.observe(document.body, {
        childList: true,  // Look for added or removed child elements
        subtree: true     // Observe all descendants of the body
    });

})();
