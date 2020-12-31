import { useState, useEffect } from "react"

const base = [0,0,0,0,0,0,0,0,0,0]

const Map = props => {
    // generates 10x10 array
    const [caveMap, setCaveMap] = useState(base.map(_=>base))
    // holds html to be output
    const [html, setHtml] = useState(<div />)

    // when player changes we update the map
    useEffect(() => {
        handleMove(props.player);
    }, [,props.player])

    // when we update the map we then redraw it
    useEffect(() => {
        setHtml(createMap(caveMap))
    }, [caveMap])

    // display wumpus when you lose
    useEffect(() => {
        if(props.displayWumpus) {
            let temp = caveMap
            temp[props.wumpus.x][props.wumpus.y] = 3
            setCaveMap(temp)
            setHtml(createMap(caveMap))
            console.log(caveMap)
        }
    }, [props.displayWumpus])

    // event to process
    const handleMove = player => {
        let temp = caveMap.map(
            a=>a.map(
                b=>{if(b == 2) return 1; return b;}
            )
        )
        if(player.x < 0 || player.x > 9 || player.y < 0 || player.y > 9)
            return;
        temp[player.x][player.y] = 2
        setCaveMap(temp)
    }

    // generate the div for each square of the map
    const createSquare = sq => {
        const general = "border border-gray-900 w-2 h-2"
        const mystery = " bg-gray-800"
        const visited = " bg-gray-700"
        const current = " bg-gray-600"
        const wumpus  = " bg-red-500"

        if(sq == 0)
            return <div className={general + mystery} />
        if(sq == 1)
            return <div className={general + visited} />
        if(sq == 2)
            return <div className={general + current} />
        if(sq == 3)
            return <div className={general + wumpus}/>
    }

    // maps square creation to a row
    const createRow = row => {
        const general = "flex flex-col"

        return (
            <div className={general}>
              {row.map(createSquare)}
            </div>
        )
    }

    // maps row creation to all rows
    const createMap = grid => {
        const general = "flex flex-row item-center"

        return (
            <div className={general}>
              {grid.map(createRow)}
            </div>
        )
    }

    return (
        <div className={"flex justify-center"}>{html}</div>
    )
}

export default Map;
