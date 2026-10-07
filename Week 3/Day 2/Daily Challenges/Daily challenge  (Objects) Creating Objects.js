class Video {

  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  watch() {
    console.log(`${this.uploader} watched all ${this.time} of ${this.title}!`);
  }
}

const newvideo = new Video("JavaScript Course", "John", 180);
const newvideo2 = new Video("Python Tutorial", "Sarah", 190);

const videos = [
  { title: "JavaScript", uploader: "John", time: 120 },
  { title: "Python", uploader: "Sarah", time: 300 },
  { title: "HTML", uploader: "Mike", time: 180 }
];

const videoInstances = [];

videos.forEach(function(video) {
  const newVideo = new Video(video.title, video.uploader, video.time);
  videoInstances.push(newVideo);
});
