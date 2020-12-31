
// Calculate the Manhattan distance between player and event
const getDist = plr => evnt => {
  const dist1D = a1 => a2 => {
    return Math.min(
      Math.abs(a1 - a2),
      Math.abs(10 + a1 - a2),
      Math.abs(-10 + a1 - a2)
    )
  }
  return dist1D(evnt.x)(plr.x) + dist1D(evnt.y)(plr.y)
}

// generate a random coordinate
const rndCoord = () =>
      ({x: Math.floor(Math.random()*10), y: Math.floor(Math.random()*10)})

// check for equality of coordinates
const coordEq = a => b => {
  return a.x == b.x && a.y == b.y
}

// get the coordinates one square away in a given direction
const coordRight = (coord) =>
      (coord.x<9)?{x: coord.x+1, y: coord.y}:{x: 0, y: coord.y}
const coordLeft  = (coord) =>
      (coord.x>0)?{x: coord.x-1, y: coord.y}:{x: 9, y: coord.y}
const coordUp    = (coord) =>
      (coord.y<9)?{x: coord.x, y: coord.y+1}:{x: coord.x, y: 0}
const coordDown  = (coord) =>
      (coord.y>0)?{x: coord.x, y: coord.y-1}:{x: coord.x, y: 9}

export {getDist, rndCoord, coordEq, coordRight, coordLeft, coordUp, coordDown};
