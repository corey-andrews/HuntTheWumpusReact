import { useState } from "react"
const AnswerInput = (props) => {
  // set up text field state
  const [response, setResponse] = useState("");

  // handle text field changes
  const handle_change = (event) => {
      console.log(event.target)
    setResponse(event.target.value)
  }

  // handle action submit
  const handlePress = (_) => {
    const res = response
    setResponse("")
    props.onPress(res)
  }

  return (
    <div>
      <form onSubmit={handlePress}
        className={"flex justify-center items-center mb-2"}
      >
        <input
          type="text"
          placeholder="Action"
          value={response}
          onChange={handle_change}
          className={"border border-red-500 focus:outline-none focus:ring-2 " +
            "focus:ring-red-500 focus:border-transparent bg-black rounded text-xl"}
        />
        <button
          onClick={(e)=>{e.preventDefault(); handlePress(e)}}
          className="bg-red-500 hover:bg-red-700 text-black p-1 font-bold rounded ml-2"
        >
          GO!
        </button>
      </form>
    </div>
  )
}

export default AnswerInput;
