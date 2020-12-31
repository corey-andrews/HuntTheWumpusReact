import { useState, useEffect } from "react"
import AnswerInput from "./AnswerInput"
import * as coord from "../lib/Coord"
import Map from "./map"

const Game = (props) => {
  // establish some basic constants
  const WUMPUS_STANK = 3
  const BAT_VOLUME = 2
  const PIT_BREEZE = 1

  // Player coords
  const [plyr, setPlyr] = useState({x: -1, y: -1});

  // start the game spawn the Wumpus
  const [gameOver, setGameOver] = useState(false);
  const [wumpus,setWumpus] = useState({x: 1, y: 1});

  // generates 10 random coordinates for bats and pits
  const [bats,setBats] = useState([1,2,3,4,5,6,7,8,9,0].map(_=>({x: 1, y: 1})))
  const [pits,setPits] = useState([1,2,3,4,5,6,7,8,9,0].map(_=>({x: 1, y: 1})))

  // set an initial state for the warning message list
  const [warnings, setWarnings] = useState([<div />])

  // set up the game on startup
  useEffect(() => {
    setPlyr(coord.rndCoord())
    setWumpus(coord.rndCoord())
    setBats(bats.map(_=>coord.rndCoord()))
    setPits(pits.map(_=>coord.rndCoord()))
  }, []);

  // change warning messages whenever the player moves
  useEffect(() => {
    setWarnings(
      () => {
        // preserve Bat carry message
        // warning hard coded message
        if(warnings.length != 0 && warnings.slice(-1)[0].props.children === 'Bats carried you away!')
          return warnings.concat(checkSquare())
        return checkSquare()
      }
    )
  }, [plyr])

  const action = str => {
    const dir = st => {
      // we can ignore anything beyond the first letter
      // this also serves as a convenient shortcut
      switch(st[0]) {
        // up or north
        case "u":
        case "n":
          return coord.coordDown(plyr)
        // down or south
        case "d":
        case "s":
          return coord.coordUp(plyr)
        // right or east
        case "r":
        case "e":
          return coord.coordRight(plyr)
        // left or west
        case "l":
        case "w":
          return coord.coordLeft(plyr)
        // no change
        default:
          return _ => (plyr)
      }
    }

    const move = coor => {
      setPlyr(coor)
    }
    const shoot = coor => {
      // Game will end either way
      setGameOver(true);
      // Hit shot! You win
      if(coord.coordEq(wumpus)(coor)) {
        setWarnings([<div className="text-6xl">You have slain the Wumpus</div>])
      }
      // Missed shot? You die
      else {
        setWarnings([
          <div className="text-4xl">
            <div>The Wumpus hears your gun ring through the caves.</div>
            <div>He runs you down and eats you.</div>
          </div>
        ])
      }
    }

    const words = str.toLowerCase().split(' ')
    if(words.length != 2){
      return;
    }
    // bat carry reset
    // occurs after main whiff check
    const tempWarn = warnings
    setWarnings([<div />])
    switch(words[0]) {
      // move options
      case "go":
      case "walk":
        move(dir(words[1]))
        break;
      // attempt to kill wumpus
      case "fire":
      case "shoot":
        shoot(dir(words[1]))
        break;
      // resets on first word typo
      // no forgiveness for second word typo
      default:
        setWarnings(tempWarn)
    }
  }

  // Check the square the player is on
  const checkSquare = () => {
    const formatting = "text-lg text-center"
    const deathform  = "text-4xl text-center font-bold"
    let divs = []

    // check for wumpus
    if(coord.coordEq(plyr)(wumpus)){
      setGameOver(true);
      divs.push(<div className={deathform}>You have been eaten by the Wumpus</div>);
      return divs;
    }
    // check for bats
    else if(bats.filter(coord.coordEq(plyr)).length > 0){
      // WARNING!!!: Message hard coded elsewhere
      divs.push(<div className={formatting}>Bats carried you away!</div>);
      setPlyr(coord.rndCoord());
      return divs;
    }
    //check for pits
    else if(pits.filter(coord.coordEq(plyr)).length > 0){
      setGameOver(true);
      divs.push(<div className={deathform}>You have fallen down a pit</div>);
      return divs
    }
    // proximity warning to wumpus
    if(coord.getDist(plyr)(wumpus) <= WUMPUS_STANK){
      divs.push(<div className={formatting}>You smell a Wumpus</div>)
    }
    divs.push(
      // proximity warning to bats
      bats.map(coord.getDist(plyr)).filter(a => a <= BAT_VOLUME).map(
        _ => <div className={formatting}>You hear flapping</div>
      ),
      // proximity warning to pits
      pits.map(coord.getDist(plyr)).filter(a => a <= PIT_BREEZE).map(
        _ => <div className={formatting}>You feel a breeze</div>
      )
    )
    // merge the bat and pit proximity
    return divs.flat()
  }


  return (
      <div className="flex flex-col h-screen">
        <div className="text-4xl mb-2">
          You stand in a dark cave.  Find the Wumpus, kill the Wumpus,
        </div>
        <div className="flex-row text-7xl font-bold">
          HUNT THE WUMPUS
        </div>
        <div className={"item-center"}>
          <Map player={plyr} wumpus={wumpus} displayWumpus={gameOver} />
        </div>
        <div className={"flex flex-col h-3/5"}>
          {warnings}
        </div>
        <div className="item-center">
          {
            (gameOver) ?
            <button onClick={props.changePage}
              className="bg-red-500 hover:bg-red-700 text-black p-1 font-bold rounded mb-2"
            >
              Main Menu
            </button> :
            <AnswerInput onPress={action} />
          }
        </div>
        <div className="font-sans">
          <div>
            Use commands such as "Walk North" to move around
          </div>
          <div>
            Use commands such as "Shoot East" to stake your life on a shot to kill the Wumpus
          </div>
        </div>
        <div className="font-sans">
          <div>
            The Wumpus's odor is so foul, it can be smelled from {WUMPUS_STANK} spaces away
          </div>
          <div>
            Giant bats displace so much air with their wings that they can be heard {BAT_VOLUME} spaces away
          </div>
          <div>
            In the stagnant air of the caves, wind from pits can be felt from {PIT_BREEZE} space away.
          </div>
        </div>
      </div>
  )
}

export default Game;
