import songlist from "./songlist.js";

// TODO: Seperate song playing operations into different js file as song changing/moving

// Get references to important HTML elements
const audio = document.getElementById("myAudio");
const songList = document.getElementById("songList");
const searchInput = document.getElementById("search");
const currentSong = document.getElementById("currentsong");

let currentSongIndex = 0;

// Function to create and append a list item for each song
function createSongListItem(song, index) {
  const listItem = document.createElement("li");
  listItem.textContent = song.name;
  listItem.classList.add("song-item");
  songList.appendChild(listItem);

  // Add a click event listener to EVERY song (TODO: There must be a better way)
  listItem.addEventListener("click", () => playSong(index));
}

// Function to play a song by its index
function playSong(index) {
  const selectedSong = songlist[index].src;

  // Pause the audio if it's currently playing
  if (!audio.paused) {
    audio.pause();
  }

  // Clear the audio source to stop the current playback
  audio.src = "";

  // Load and play the selected song
  loadAndPlay(selectedSong, index);
}

// Function to load and play a song - Loads audio data
function loadAndPlay(audioSrc, index) {
  // Create a new Audio element to preload the selected song
  const preloadAudio = new Audio();
  preloadAudio.src = audioSrc;

  // Listen for the "canplaythrough" event to ensure audio data is loaded
  preloadAudio.addEventListener("canplaythrough", () => {
    // Set the source of the main audio element to the preloaded audio
    audio.src = audioSrc;

    // Play the selected song
    audio.play();

    // Update the display with the current song's name
    currentSong.textContent = "Song: " + songlist[index].name;

    // Update the currently playing song index
    currentSongIndex = index;
  });
}

// Populate the song list dynamically using the imported songs array
songlist.forEach(createSongListItem);

// Play the first song when the page loads
// playSong(0);

// Add event listener to filter the song list based on user input
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const songs = songList.getElementsByTagName("li");

  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const songName = song.textContent.toLowerCase();

    // Display or hide songs based on the search term
    song.style.display = songName.includes(searchTerm) ? "block" : "none";
  }
});

// Add event listener to play the next song when the current song ends
audio.addEventListener("ended", () => {
  // Increment the index to play the next song (looping back to the first if needed)
  currentSongIndex = (currentSongIndex + 1) % songlist.length;
  playSong(currentSongIndex);
});

/* Song Navigation */
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

// Add event listeners for the next and previous song buttons
nextButton.addEventListener("click", playNextSong);
prevButton.addEventListener("click", playPreviousSong);

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songlist.length;
  playSong(currentSongIndex);
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songlist.length) % songlist.length;
  playSong(currentSongIndex);
}
