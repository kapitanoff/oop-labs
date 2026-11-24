self.onmessage = (event) => {
  const { id, y, speed, maxX } = event.data;

  let x = 0;
  let direction = 1;

  setInterval(() => {
    x += speed * direction;

    if (x >= maxX) {
      x = maxX;
      direction = -1;
    }

    if (x <= 0) {
      x = 0;
      direction = 1;
    }

    self.postMessage({
      id,
      x,
      y,
    });
  }, 30);
};
