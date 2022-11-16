const playerBox = document.querySelector(".container"),
trackImage = playerBox.querySelector(".imageBox img"),
musicTitle = playerBox.querySelector(".songDetails .songTitle"),
artists = playerBox.querySelector(".songDetails .artist-e"),
song = playerBox.querySelector(".activeSong"),
navigateSong = playerBox.querySelector(".listen");

let musicIndex = 1;

window.addEventListener("load", () => {
    loadSongs(musicIndex);
})

function loadSongs(indexNumber){
    musicTitle.innerText = musicFolder[indexNumber - 1].name;
    artists.innerText = musicFolder[indexNumber - 1].artist;
    trackImage.src = `./images/${musicFolder[indexNumber - 1].image}.png`;
    song.src = `./songs/${musicFolder[indexNumber - 1].source}.mp3`;
}
