// Dummy socket for now
const socket: WebSocket = new WebSocket("ws://localhost:5000");

interface PeerConnections {
  [key: string]: RTCPeerConnection;
}

interface DataChannels {
  [key: string]: RTCDataChannel;
}

const peerConnections: PeerConnections = {}; // store p2p connections
const dataChannels: DataChannels = {}; // store channels for drawing data

// handles backend websocket events
socket.onmessage = async (event: MessageEvent) => {
  const data = JSON.parse(event.data);

  if (data.type === "offer") {
    await handleOffer(data.offer, data.senderId);
  } else if (data.type === "answer") {
    await handleAnswer(data.answer, data.senderId);
  } else if (data.type === "candidate") {
    await handleCandidate(data.candidate, data.senderId);
  }
};

// makes p2p connection
async function createPeerConnection(peerId: string): Promise<RTCPeerConnection> {
  const peer = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }], // Free STUN server
  });

  peer.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      socket.send(
        JSON.stringify({
          type: "candidate",
          candidate: event.candidate,
          senderId: socket.url,
        })
      );
    }
  };

  // data channel for RECEIVING drawing data
  peer.ondatachannel = (event: RTCDataChannelEvent) => {
    const channel = event.channel;
    dataChannels[peerId] = channel;

    channel.onopen = () => console.log("WebRTC DataChannel open!");
    channel.onmessage = (event: MessageEvent) => handleDrawingData(event.data);
  };

  // data channel for SENDING drawing data
  const dataChannel: RTCDataChannel = peer.createDataChannel("drawing");
  dataChannels[peerId] = dataChannel;

  dataChannel.onopen = () => console.log("WebRTC DataChannel open!");
  dataChannel.onmessage = (event: MessageEvent) => handleDrawingData(event.data);

  peerConnections[peerId] = peer;
  return peer;
}

// WebRTC offer 
async function handleOffer(offer: RTCSessionDescriptionInit, senderId: string): Promise<void> {
  const peer = await createPeerConnection(senderId);
  await peer.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  socket.send(
    JSON.stringify({
      type: "answer",
      answer,
      senderId,
    })
  );
}

// WebRTC answer
async function handleAnswer(answer: RTCSessionDescriptionInit, senderId: string): Promise<void> {
  if (peerConnections[senderId]) {
    await peerConnections[senderId].setRemoteDescription(new RTCSessionDescription(answer));
  }
}

// Handle ICE candidate
async function handleCandidate(candidate: RTCIceCandidateInit, senderId: string): Promise<void> {
  if (peerConnections[senderId]) {
    await peerConnections[senderId].addIceCandidate(new RTCIceCandidate(candidate));
  }
}

// join room
function joinRoom(roomId: string): void {
  socket.send(JSON.stringify({ type: "join", roomId }));

  socket.onopen = async () => {
    const peer = await createPeerConnection(roomId);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.send(
      JSON.stringify({
        type: "offer",
        offer,
        senderId: socket.url,
      })
    );
  };
}

// sending drawing data
function sendDrawingData(data: string): void {
  Object.values(dataChannels).forEach((channel) => {
    if (channel.readyState === "open") {
      channel.send(data);
    }
  });
}

// receiving drawing data
function handleDrawingData(data: string): void {
  console.log("🖊 Drawing event received:", data);
  // Integrate with frontend drawing logic here
}

// export
export { joinRoom, sendDrawingData };
