function Person({ person }) {
  return (
    <div>
      <p>
        {person.name}, <b>{person.number}</b>
      </p>
    </div>
  );
}

export default Person;
