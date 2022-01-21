const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3000",
});

let myVideoStream;

//when user allows to turn on camera and audio
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    //   console.log(myVideoStream);
    addVideoStream(myVideo, stream);
    // answering the call
    peer.on("call", (call) => {
      //when user call us we answer it 
      call.answer(stream);
      const video = document.createElement("video");

      // add video stream to the call
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connecToNewUser(userId, stream);
    });
  });

// stream is basically user video

// join this room
peer.on("open", (id) => {
  console.log(id);
  socket.emit("join-room", ROOM_ID, id);
});

const connecToNewUser = (userId, stream) => {
  console.log(`new user connected from ${userId}`);
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  //sending new user our own stream 
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });

  videoGrid.append(video);
};




// let text = document.querySelector('input');
let text= $('input')

$('html').keydown((e)=> {
  if (e.which == 13 && text.val().length !== 0) {
    console.log(text.val());
    socket.emit('message', text.val());
    text.val(' ');
  }
})


socket.on('createMessage', message => {
  console.log("this is commign form the server", message);
})



//socket.emit --sends the data
//scoket.on --listens to the data
// socket io --reatime engien
// with norman server you gives request and it responds to it but in socket io you send request and server can request back for another thing
// in socket io server does not have to wait for request from client to respond
// socket io is a realtime engine
// it creates a channel between client and server it like a tube ans msgs and trafic goes through that

//peerjs - to send stream between 2 users and it is a realtime engine
//web rtc- allows you to communicate in real time in web browser
