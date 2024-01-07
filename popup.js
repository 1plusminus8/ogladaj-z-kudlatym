document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchButton").addEventListener("click", function() {
        var movieTitle = document.getElementById("movieTitleInput").value.trim();

        if (!movieTitle) {
            alert('Proszę wpisać tytuł filmu!');
            return;
        }

        var searchUrl = 'https://hurawatch.bz/filter?keyword=' + encodeURIComponent(movieTitle);
        chrome.tabs.create({url: searchUrl});
    });
});
