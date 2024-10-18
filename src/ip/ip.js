

const getLocalIP = () => {
    return new Promise((resolve, reject) => {
      const rtcPeerConnection = new RTCPeerConnection();
      rtcPeerConnection.createDataChannel('');
      rtcPeerConnection.createOffer()
        .then(offer => rtcPeerConnection.setLocalDescription(offer))
        .catch(reject);
      
      rtcPeerConnection.onicecandidate = (event) => {
        if (!event || !event.candidate || !event.candidate.candidate) {
          return;
        }
  
        const candidate = event.candidate.candidate;
        const localIP = candidate.split(' ')[4]; 
        resolve(localIP);
        rtcPeerConnection.close();
      };
    });
  };
  
  // Usage
  getLocalIP()
    .then(ip => console.log('Local IP:', ip))
    .catch(error => console.error('Error getting local IP:', error));

export default  getLocalIP()