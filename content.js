// ==UserScript==
// @name         Dodaj przycisk na Filmweb do Hurawatch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Dodaje przycisk na stronie Filmweb i bestsimilar, który przenosi na Hurawatch dla danego filmu.
// @author       You
// @match        https://www.filmweb.pl/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funkcja do wykonywania akcji po kliknięciu przycisku
    function searchMovie() {
        var movieTitle;

        if (window.location.hostname.includes('filmweb.pl')) {
            var originalTitleElement = document.querySelector('.filmCoverSection__originalTitle');
            if (originalTitleElement) {
                movieTitle = originalTitleElement.innerText;
            } else {
                var titleElement = document.querySelector('h1[itemprop="name"]');
                if (titleElement) {
                    movieTitle = titleElement.innerText;
                } else {
                    alert('Nie można znaleźć tytułu filmu na stronie Filmweb!');
                    return;
                }
            }
        }

        var searchUrl = 'https://hurawatch.bz/filter?keyword=' + encodeURIComponent(movieTitle);
        window.open(searchUrl, '_blank');
    }

    // Tworzenie przycisku
    function createSearchButton() {
        var button = document.createElement('button');
        button.textContent = 'Oglądaj z Kudłatym';
        button.className = 'hurawatch-button';

        // Styl przycisku
        button.style.margin = '10px 0';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#74AC39';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.fontFamily = 'Arial, sans-serif';
        button.style.fontSize = '14px !important'; // Dodaj !important, aby zwiększyć priorytet

        button.addEventListener('click', searchMovie);

        // Wyszukanie elementu z oryginalnym tytułem filmu
        var originalTitleElement = document.querySelector('.filmCoverSection__originalTitle');
        if (originalTitleElement) {
            // Dodanie przycisku obok oryginalnego tytułu
            originalTitleElement.parentElement.insertBefore(button, originalTitleElement.nextSibling);
        } else {
            var titleElement = document.querySelector('h1[itemprop="name"]');
            if (titleElement) {
                // Dodanie przycisku obok tytułu
                titleElement.parentElement.insertBefore(button, titleElement.nextSibling);
            }
        }
    }

    // Wywołanie funkcji do tworzenia przycisku po załadowaniu strony
    window.addEventListener('load', createSearchButton);
})();
