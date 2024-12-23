import React from "react";
import Person from "./Person";

export default function Persons({ persons }) {
  return (
    <div>
      {persons.length == 0 ? (
        <p>No results</p>
      ) : (
        persons.map((person) => <Person key={person.id} person={person} />)
      )}
    </div>
  );
}
