import {useState} from 'react'

import Game from "../component/Game.jsx"
import MainMenu from "../component/MainMenu.jsx"

const Home = () => {
  const [page, setPage] = useState(0)

  const togglePage = () =>
        setPage(page==0?1:0)

  // Setting up the overall look
  return (
    <div className="flex flex-center justify-center h-screen bg-black text-gray-400 font-serif">
      <div className="flex flex-col text-center items-center">
        {[
          <MainMenu changePage={togglePage} />,
          <Game changePage={togglePage} />,
        ][page]}
      </div>
    </div>
  )
}

export default Home;
