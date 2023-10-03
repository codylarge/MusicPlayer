document.addEventListener("DOMContentLoaded", function () {
  const songList = document.getElementById("songList");
  const currentSong = document.getElementById("currentsong");

  // Store the last clicked song name
  let lastClickedSongItem = null;

  // Add a click event listener to the song list container
  songList.addEventListener("click", function (e) {
    const target = e.target;
    if (target.tagName === "LI" && song.listNum != 0) {
      // Remove the .last-clicked class from the previously clicked song item
      if (lastClickedSongItem) {
        lastClickedSongItem.classList.remove("last-clicked");
      }

      // Update the last clicked song item
      lastClickedSongItem = target;

      // Add the .last-clicked class to the currently clicked song item
      lastClickedSongItem.classList.add("last-clicked");

      // Update the h1 element with the last clicked song name
      currentSong.textContent = "Song: " + lastClickedSongItem.textContent;
    }
  });
});
