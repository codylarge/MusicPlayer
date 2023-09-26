const audio = document.getElementById("myAudio");
const songList = document.getElementById("songList");
const searchInput = document.getElementById("search");

// Add event listener to play a song when a song text is clicked
songList.addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName === "LI") {
    const selectedSong = target.getAttribute("data-src");
    audio.src = selectedSong;
    audio.load(); // Load the new audio source
    audio.play(); // Play the selected song
    console.log("Selected song: " + selectedSong);
  }
});

// Add event listener to filter the song list based on user input
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const songs = songList.getElementsByTagName("li");

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const songName = song.textContent.toLowerCase();
    if (songName.includes(searchTerm)) {
      song.style.display = "block";
    } else {
      song.style.display = "none";
    }
  }
});
