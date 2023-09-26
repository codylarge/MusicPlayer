import songlist from "./songlist.js"; // Import the songs array from the separate file

const audio = document.getElementById("myAudio");
const songList = document.getElementById("songList");
const searchInput = document.getElementById("search");

// Function to create and append a list item for each song
function createSongListItem(song) {
  const listItem = document.createElement("li");
  listItem.textContent = song.name;
  listItem.setAttribute("data-src", song.src); // give it a data-src attribute to apply path & name
  listItem.classList.add("song-item"); // give it a class to apply CSS
  songList.appendChild(listItem);
}

// Populate the song list dynamically using the imported songs array
songlist.forEach(createSongListItem);

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
