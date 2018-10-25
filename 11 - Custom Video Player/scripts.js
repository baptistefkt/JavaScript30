//get elements

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
// let barSize = progress.width;

// functions

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? "►" : "&#9208;";
  toggle.innerHTML = icon;
}

function toggleKeyPlay(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}

function skip() {
  video.currentTime += Number(this.dataset.skip);
}

function handleRangeUpdate() {
  //   if (this.name === "volume") {
  //     video.volume = this.value;
  //   } else if (this.name === "playbackRate") {
  //     video.playbackRate = this.value;
  //   }
  video[this.name] = this.value;
}

function handleProgressBar() {
  progressBar.style.flexBasis =
    (video.currentTime / video.duration) * 100 + "%";
}

function scrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}
// event listeners

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
window.addEventListener("keydown", toggleKeyPlay);
skipButtons.forEach(btn => btn.addEventListener("click", skip));
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
video.addEventListener("timeupdate", handleProgressBar);
progress.addEventListener("click", scrub);
let mousedown = false;
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("mousemove", function(e) {
  if (mousedown) {
    scrub(e);
  }
});
