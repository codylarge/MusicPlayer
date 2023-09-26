document.addEventListener("DOMContentLoaded", function () {
  const songList = document.getElementById("songList");
  const currentSong = document.getElementById("currentsong");

  // Store the last clicked song name
  let lastClickedSongName = "";

  // Add a click event listener to the song list container
  songList.addEventListener("click", function (e) {
    const target = e.target;
    if (target.tagName === "LI") {
      lastClickedSongName = target.textContent; // Update the last clicked song name
      currentSong.textContent = "Song: " + lastClickedSongName; // Update the h1 element
    }
  });
});
