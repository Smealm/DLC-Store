// ==UserScript==
// @name         DLC Store Floating Sidebar Enhancements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a floating collapsible sidebar and links to real HTML sections
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create the floating sidebar element
    const sidebar = document.createElement('div');
    sidebar.classList.add('userscript-sidebar');
    sidebar.innerHTML = `
        <div class="sidebar-header">
            <button class="toggle-btn">☰</button>
            <button class="restore-btn" style="display: none;">→</button>
        </div>
        <ul>
            <li><a href="#home" class="sidebar-link">🏠 Home</a></li>
            <li><a href="#store" class="sidebar-link">💳 Store</a></li>
            <li><a href="#settings" class="sidebar-link">⚙ Settings</a></li>
            <li><a href="#about" class="sidebar-link">ℹ About</a></li>
        </ul>
    `;

    // Append the sidebar to the body
    document.body.appendChild(sidebar);

    // Add some basic styles for the sidebar to match your layout
    const style = document.createElement('style');
    style.innerHTML = `
        .userscript-sidebar {
            position: fixed;
            top: 10px; /* Adjust top position to prevent overlap */
            left: 10px; /* Floating from the left */
            width: 200px;
            height: auto;
            background: rgba(45, 45, 45, 0.8);
            color: white;
            padding: 20px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            z-index: 1000;
            transition: all 0.3s ease;
            border-radius: 8px;
        }

        .userscript-sidebar.collapsed {
            width: 50px;
            height: 50px; /* Make the height the same as the width for a perfect circle */
            border-radius: 50%;
            padding: 0;
            box-shadow: none;
        }

        .sidebar-header {
            text-align: center;
            position: relative;
            width: 100%; /* Ensure the header spans the entire width */
            height: 100%; /* Make sure the header fills the available space */
        }

        .toggle-btn, .restore-btn {
            background: none;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%); /* Center the button */
            width: 100%;
            height: 100%;
            transition: none; /* Prevent any movement during collapse */
        }

        .userscript-sidebar ul {
            list-style: none;
            padding: 0;
            margin-top: 20px;
            display: block;
            transition: opacity 0.3s ease;
        }

        .userscript-sidebar.collapsed ul {
            display: none;
        }

        .userscript-sidebar li {
            margin: 15px 0;
        }

        .userscript-sidebar a {
            color: white;
            text-decoration: none;
            font-size: 16px;
            display: block;
            padding: 10px;
            border-radius: 5px;
            transition: background 0.2s ease;
        }

        .userscript-sidebar a:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(style);

    // Toggle sidebar visibility
    const toggleBtn = sidebar.querySelector('.toggle-btn');
    const restoreBtn = sidebar.querySelector('.restore-btn');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        toggleBtn.style.display = 'none'; // Hide the original toggle button
        restoreBtn.style.display = 'block'; // Show the "→" button
    });

    restoreBtn.addEventListener('click', () => {
        sidebar.classList.remove('collapsed');
        toggleBtn.style.display = 'block'; // Show the original toggle button
        restoreBtn.style.display = 'none'; // Hide the "→" button
    });

    // Add event listeners for linking sidebar buttons to real sections
    const links = sidebar.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showPage(targetId);
        });
    });

    // Function to show the corresponding content
    function showPage(targetId) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.style.display = page.id === targetId ? 'flex' : 'none';
        });
    }

    // Initially show the 'home' page if not specified
    showPage('home');
})();
