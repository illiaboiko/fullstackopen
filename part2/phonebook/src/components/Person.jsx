function Person({ person, onDelete }) {
  return (
    <div>
      <p>
        {person.name}, <b>{person.number}</b>
      <button onClick={() => onDelete(person.id)}> Delete</button>
      </p>
    </div>
  );
}

export default Person;
