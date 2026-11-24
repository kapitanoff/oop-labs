function createBallWorker(id, y, speed) {
  const worker = new Worker("./worker.js");

  worker.onmessage = (event) => {
    const { id, x, y } = event.data;

    const ball = document.querySelector(`#ball-${id}`);

    ball.style.left = `${x}px`;
    ball.style.top = `${y}px`;
  };

  worker.postMessage({
    id,
    x: 0,
    y,
    speed,
    maxX: 470,
  });

  return worker;
}

const workers = [
  createBallWorker(1, 25, 3),
  createBallWorker(2, 95, 5),
  createBallWorker(3, 165, 7),
];
