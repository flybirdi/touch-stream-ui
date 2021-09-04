/* globals WebSocket */

let keepAliveInterval;

const keepAlive = (socket) => {
  if (socket && socket.readyState === 1) {
    socket.send('keep-alive');
  }
};

function startWs(store) {
  try {
    const socket = new WebSocket(process.env.WS_URL);
    socket.addEventListener('error', (err) => {
      console.log('WS Error:', err);
    });
    socket.addEventListener('open', () => {
      console.log('💬WS: Opened');
      if (keepAliveInterval) clearInterval(keepAliveInterval);
      keepAliveInterval = setInterval(() => keepAlive(socket), 20000);
    });
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      try {
        store.dispatch(message);
      } catch (err) {
        console.log(err);
      }
    });
    // Attempt reconnect on close / failure
    socket.addEventListener('close', () => setTimeout(startWs(store), 3000));
  } catch (err) {
    console.log(err);
  }
}

export default startWs;
