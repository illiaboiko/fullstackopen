import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ id, text, votes, onVote, showVoteButton = true }) => {
  return (
    <>
      <p>{text}</p>
      <p>has {votes} votes</p>
      {showVoteButton && <button onClick={() => onVote(id)}>vote</button>}
      <br />
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const findIndexOfMax = (arr) => {
    return arr.reduce((maxIndex, currentElement, currentIndex, array) => {
      return array[maxIndex] > currentElement ? maxIndex : currentIndex;
    }, 0);
  };

  const topAnecdote = findIndexOfMax(points);

  const vote = (id) => {
    const copy = [...points];
    copy[id] += 1;
    setPoints(copy);
  };

  const pickRandom = (max) => {
    return Math.floor(Math.random() * max);
  };

  const generateRandomAnecdote = () => {
    setSelected(pickRandom(anecdotes.length));
  };

  return (
    <div>
      <h2>Anecdote of the day:</h2>
      <Anecdote
        onVote={vote}
        id={selected}
        text={anecdotes[selected]}
        votes={points[selected]}
      />
      <br />
      <Button text={"next"} onClick={generateRandomAnecdote} />
      <h2>Anecdote with the most votes</h2>
      <Anecdote
        id={topAnecdote}
        text={anecdotes[topAnecdote]}
        votes={points[topAnecdote]}
        showVoteButton={false}
      />
    </div>
  );
};

export default App;
