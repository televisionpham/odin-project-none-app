const Position = (coor, prev = null) => {
  return {
    prev,
    coor,
  };
};

function possibleMoves(x, y) {
  const moves = [
    [x - 1, y - 2],
    [x + 1, y - 2],
    [x - 2, y - 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x + 2, y + 1],
    [x - 1, y + 2],
    [x + 1, y + 2],
  ];

  return moves.filter((p) => p[0] >= 0 && p[1] >= 0);
}

function PosQueue() {
  const queue = [];

  function enqueue(pos, prev) {
    queue.push(Position(pos, prev));
  }

  function _posAreEqual(p1, p2) {
    return p1[0] === p2[0] && p1[1] === p2[1];
  }

  function contains(pos) {
    return queue.filter((p) => _posAreEqual(p.coor, pos)).length > 0;
  }

  function find(pos) {
    return queue.filter((p) => _posAreEqual(p.coor, pos))[0];
  }

  function dequeue() {
    return queue.shift();
  }

  return {
    enqueue,
    contains,
    dequeue,
    find,
  };
}

function knightMoves(start, end) {
  const queue = PosQueue();
  queue.enqueue(start, null);
  while (!queue.contains(end)) {
    const p = queue.dequeue();
    const moves = possibleMoves(p.coor[0], p.coor[1]);
    for (const move of moves) {
      queue.enqueue(move, p);
    }
  }

  let move = queue.find(end);
  const result = [];
  while (move) {
    result.push(move.coor);
    move = move.prev;
  }

  console.log(
    "You made it in " + (result.length - 1) + " moves! Here's your path:"
  );
  for (let i = result.length - 1; i >= 0; i--) {
    console.log(result[i]);
  }
}

knightMoves([3, 3], [4, 3]);
