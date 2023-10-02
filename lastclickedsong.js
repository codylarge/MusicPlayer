document.addEventListener("DOMContentLoaded", function () {
  const songList1 = document.getElementById("songList1");
  const songList2 = document.getElementById("songList2");
  const songList3 = document.getElementById("songList3");
  const songList4 = document.getElementById("songList4");
  const songList5 = document.getElementById("songList5");

  const currentSong = document.getElementById("currentsong");

  let lastClickedSongItem = null;

  // Function to handle click events on a song list
  function handleSongListClick(e, listContainer) {
    const target = e.target;
    if (target.tagName === "LI") {
      // Remove the .last-clicked class from the previously clicked song item
      if (lastClickedSongItem) {
        lastClickedSongItem.classList.remove("last-clicked");
      }

      // Update the last clicked song item
      lastClickedSongItem = target;

      lastClickedSongItem.classList.add("last-clicked");

      // Update the h1 element with the last clicked song name
      currentSong.textContent = "Song: " + lastClickedSongItem.textContent;
    }
  }

  // Attach the click event listeners to each song list container
  songList1.addEventListener("click", function (e) {
    handleSongListClick(e, songList1);
  });

  songList2.addEventListener("click", function (e) {
    handleSongListClick(e, songList2);
  });

  songList3.addEventListener("click", function (e) {
    handleSongListClick(e, songList3);
  });

  songList4.addEventListener("click", function (e) {
    handleSongListClick(e, songList4);
  });

  songList5.addEventListener("click", function (e) {
    handleSongListClick(e, songList5);
  });

  // You can add more event listeners for additional lists as needed
});
