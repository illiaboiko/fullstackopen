const Header = ({ header }) => {
  return (
    <>
      <h1>{header}</h1>
    </>
  );
};
const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </>
  );
};

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => (sum += part.exercises), 0);

  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  );
};

export default Course;
