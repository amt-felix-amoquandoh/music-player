const playerBox = document.querySelector(".container"),
trackImage = playerBox.querySelector(".imageBox img"),
musicTitle = playerBox.querySelector(".songDetails .songTitle"),
artists = playerBox.querySelector(".songDetails .artist-e"),
song = playerBox.querySelector("#activeSong"),
playBtn = playerBox.querySelector(".listen .play"),
pauseBtn = playerBox.querySelector(".listen .pause"),
nextBtn = playerBox.querySelector("#nextSong"),
previousBtn = playerBox.querySelector("#prevSong"),
progressBox = playerBox.querySelector(".songProgress"),
songProgress = playerBox.querySelector(".progressBar"),
repeatButton = playerBox.querySelector("#repeatSong"),
songsList = playerBox.querySelector(".musicList"),
moreSongsBtn = playerBox.querySelector("#moreSongs"),
closeSongList = playerBox.querySelector("#closeList"),
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

// play song function
function playSongs (){
    playerBox.classList.add("paused");
    playBtn.setAttribute("name", "pause-outline")
    song.play();
}

// pause song function
function pauseSong (){
    playerBox.classList.add("paused");
    playBtn.setAttribute("name", "play")
    song.pause();
}

// next song function
function nextSong(){
  musicIndex++;
  musicIndex > musicFolder.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadSongs(musicIndex);
  playSongs();
}

// previous song function
function previousSong(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = musicFolder.length : musicIndex = musicIndex;
    loadSongs(musicIndex);
    playSongs();
}


function seekSong (){
    const isMusicPaused = playerBox.classList.contains("paused");
    isMusicPaused ? pauseSong() : playSongs();
}

function songTime (e){
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progress = (currentTime / duration) * 100;
    songProgress.style.width = `${progress}%`;

    //updating total song duration
    let activeMusicTime = playerBox.querySelector(".currentTime"),
    activeMusicDuration = playerBox.querySelector(".fullDuration");
    song.addEventListener("loadeddata", () => {
     let activeDuration = song.duration;
     let totalMinutes = Math.floor(activeDuration / 60);
     let totalSeconds = Math.floor(activeDuration % 60);

     if (totalSeconds > 10) {
        totalSeconds = `${totalSeconds}`;
     }

     activeMusicDuration.innerText = `${totalMinutes}:${totalSeconds}`;
    });
    let currentDuration = song.duration;
    let currentMinutes = Math.floor(currentTime / 60);
     let currentSeconds = Math.floor(currentTime % 60);

     if (currentSeconds > 10) {
        currentSeconds = `${currentSeconds}`;
     }

     activeMusicTime.innerText = `${currentMinutes}:${currentSeconds}`;
 }

 function progressBar (e){
    let progressWidth = progressBox.clientWidth;
    let offsetXclicked = e.offsetX;
    let activeDuration = song.duration;

    song.currentTime = (offsetXclicked / progressWidth) * activeDuration;
    playSongs();
}

function repeatFunc (){
    let getRepeatText = repeatButton.classList.value;
    switch (getRepeatText) {
        case "bi-repeat":
            repeatButton.classList.value = "bi-repeat-1";
            repeatButton.setAttribute("title", "song looped");            
            break;
            case "bi-repeat-1":
            repeatButton.classList.value = "bi-shuffle";
            repeatButton.setAttribute("title", "playback shuffled");            
            break;
            case "bi-shuffle":
            repeatButton.classList.value = "bi-repeat";
            repeatButton.setAttribute("title", "playback shuffled");            
            break;
            
    
        default:
            break;
    }
}

function listPlayback() {
    let getClassText = repeatButton.classList.value;
    switch (getClassText) {
        case "bi-repeat":
            nextSong();         
            break;
            case "bi-repeat-1":
            song.currentTime = 0;
            loadSongs(musicIndex);
            playSongs();           
            break;
            case "bi-shuffle":
            let randonSongIndex = Math.floor((Math.random() * musicFolder.length) + 1);
            do {
                randonSongIndex = Math.floor((Math.random() * musicFolder.length) + 1);
            } while (musicIndex == randonSongIndex);
            musicIndex == randonSongIndex;
            loadSongs(musicIndex);
            playSongs();            
            break;
    }
}

function showPlayList(){
    songsList.classList.add("showMusicList");
}


navigateSong.addEventListener("click", seekSong);
nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", previousSong);
song.addEventListener("timeupdate", songTime);
progressBox.addEventListener("click", progressBar);
repeatButton.addEventListener("click", repeatFunc);
song.addEventListener("ended", listPlayback);
moreSongsBtn.addEventListener("click", showPlayList)

