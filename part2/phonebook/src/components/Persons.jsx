import React from "react";
import Person from "./Person";

export default function Persons({ persons, onDelete }) {
  return (
    <div>
      {persons.length == 0 ? (
        <p>No results</p>
      ) : (
        persons.map((person) => <Person key={person.id} person={person} onDelete={onDelete} />)
      )}
    </div>
  );
}
