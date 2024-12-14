const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  const { content_data } = props;
  return (
    <>
      <Part
        part_number={content_data[0].name}
        exercise_number={content_data[0].exercises}
      />
      <Part
        part_number={content_data[1].name}
        exercise_number={content_data[1].exercises}
      />
      <Part
        part_number={content_data[2].name}
        exercise_number={content_data[2].exercises}
      />
    </>
  );
};

const Total = (props) => {
  const total = props.total.reduce((acc, value) => acc + value.exercises, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part_number} {props.exercise_number}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content content_data={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

export default App;
