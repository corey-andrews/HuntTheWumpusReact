

const MainMenu = (props) => {

    // simple menu that uses props to toggle into the game on button press
    return (
        <div className="flex flex-col">
          <div className="text-4xl mt-80 mb-4">
            You stand in a dark cave, find the Wumpus, kill the Wumpus,
          </div>
          <div className="mb-4 flex-row text-7xl font-bold">
            HUNT THE WUMPUS
          </div>
          <button
            onClick={props.changePage}
            className="bg-red-500 hover:bg-red-700 text-7xl font-bold text-black py-4 rounded-xl"
          >
            Get Hunting
          </button>
        </div>
    )
}

export default MainMenu;
