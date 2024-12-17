import { useState } from "react";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <h1>Statistics</h1>
      {all ? (
        <>
          <table>
            <tbody>
              <StatisticsLine text="neutral" value={neutral} />
              <StatisticsLine text="good" value={good} />
              <StatisticsLine text="bad" value={bad} />
              <StatisticsLine text="average" value={average} />
              <StatisticsLine text="positive" value={positive} />
            </tbody>
          </table>
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}:</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text} </button>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // maybe just a variable would work?
  const all = good + neutral + bad;
  const average = all
    ? (good * 1 + neutral * 0 + bad * -1) / all
    : "no data yet";
  const positive = all ? (good / all) * 100 + "%" : "no data yet";
  return (
    <div>
      <h1>Please give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
