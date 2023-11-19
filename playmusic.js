import songlist from "./songlist.js";

// TODO: ADD SHUFFLE FEATURE
// TODO: Seperate song playing operations into different js file as song changing/moving

// Get references to important HTML elements
const audio = document.getElementById("myAudio");
audio.src = "";
const songList = document.getElementById("songList");
const searchInput = document.getElementById("search");
const currentSong = document.getElementById("currentsong");

let currentSongIndex = 0;
let lastSongIndex = 0;
let nextIndex = getRandomSongIndex(currentSongIndex, songlist.length);

// Function to create and append a list item for each song
function createSongListItem(song, index, listNum) {
  const listItem = document.createElement("li");
  listItem.textContent = song.name;
  listItem.classList.add("song-item");

  const album = song.listNum;

  listItem.setAttribute("id", `album-${album}`);

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
  // Get the previously played song and remove its CSS style
  const previouslyPlayedSong = document.querySelector(
    ".song-item.last-clicked"
  ); // Gets the last clicked song element
  if (previouslyPlayedSong) {
    previouslyPlayedSong.classList.remove("last-clicked"); // removes the "last clicked class" from the element
  }

  lastSongIndex = currentSongIndex;
  loadAndPlay(selectedSong, index);

  // Adds the last clicked class to the new song thats playings
  const currentSongItem = songList.querySelectorAll(".song-item")[index];
  if (currentSongItem) {
    currentSongItem.classList.add("last-clicked");
  }
}

// Function to load and play a song - Loads audio data
function loadAndPlay(audioSrc, index) {
  // Create a new Audio element to preload the next song
  if (isShuffle) {
    nextIndex = getRandomSongIndex(index, songlist.length);
  } else {
    nextIndex = (index + 1) % songlist.length;
  }

  const nextAudio = new Audio();
  nextAudio.src = songlist[nextIndex].src;
  nextAudio.preload = "auto"; // Preload the audio data

  // Create a new Audio element for the selected song
  const preloadAudio = new Audio();
  preloadAudio.src = audioSrc;

  // Listen for the "canplaythrough" event to ensure audio data is loaded before attempting to play
  preloadAudio.addEventListener("canplaythrough", () => {
    audio.src = audioSrc;
    audio.play();

    // Update the display with the current song's name
    currentSong.textContent = "Song: " + songlist[index].name;

    currentSongIndex = index;

    // Start preloading the next song
    nextAudio.load();
  });
}

// Populate the song list dynamically using the imported songs array
songlist.forEach(createSongListItem);

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

/*-----------------*/
/*-Song Navigation-*/
/*-----------------*/
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");

// Add event listeners for the next and previous song buttons
nextButton.addEventListener("click", playNextSong);
prevButton.addEventListener("click", playPreviousSong);

/*-------------------*/
/*-Shuffle Mechanics-*/
/*-------------------*/
const shuffleButton = document.getElementById("shuffleButton");
let isShuffle = false;

function playNextSong() {
  playSong(nextIndex);
}

// This function doesnt really work at the moment, if user is in shuffle mode it plays the wrong song
function playPreviousSong() {
  if (isShuffle) {
    playSong(lastSongIndex);
  } else {
    currentSongIndex =
      (currentSongIndex - 1 + songlist.length) % songlist.length;
    playSong(currentSongIndex);
  }
}

// Helper function to get a random song index different from the current index
function getRandomSongIndex(currentIndex, totalSongs) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * totalSongs);
  } while (randomIndex === currentIndex); // Ensure the random index is different from the current index
  return randomIndex;
}

shuffleButton.addEventListener("click", () => {
  shuffleButton.classList.toggle("active");
  isShuffle = !isShuffle;
  currentSongIndex = getRandomSongIndex(currentSongIndex, songlist.length);
});
