import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName.trim() || !newPhone.trim()) {
      alert("Specify a value for both name and phone number");
      return;
    }

    const newPersonObj = {
      name: newName,
      number: newPhone,
    };

    const isUnique = !persons.some(
      (person) => person.name === newPersonObj.name
    );

    if (isUnique) {
      personsService
        .createPerson(newPersonObj)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
        })
        .catch((error) => alert("failed to add person", error));
    } else {
      if (
        window.confirm(
          `${newPersonObj.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const dublicatePerson = persons.find(
          (p) => p.name === newPersonObj.name
        );
        const id = dublicatePerson.id
        personsService
          .updatePerson(id, newPersonObj)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === id ? returnedPerson : p
              )
            );
          })
          .catch((error) => alert("failed to update the person", error));
      }
    }

    // const isUnique = !persons.some((person) =>
    //   areTheseObjectsEqual(person, newPersonObj)
    // );

    // isUnique
    //   ? setPersons([...persons, newPersonObj])
    //   : alert(`${newName} is already in phone book`);

    setNewName("");
    setNewPhone("");
  };

  const deletePerson = (id) => {
    if (window.confirm("Sure?")) {
      personsService
        .deletePerson(id)
        .then((deletedPerson) => {
          setPersons(persons.filter((p) => p.id !== deletedPerson.id));
        })
        .catch((error) => alert("failed to delete person", error));
    }
  };

  const handleInputNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleInputPhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterQueryChange = (event) => {
    setFilterQuery(event.target.value);
  };

  const personsToShow =
    filterQuery.length == 0
      ? persons
      : persons.filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(filterQuery.toLocaleLowerCase())
        );
  console.log("render", persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterQueryChange} value={filterQuery} />

      <InputForm
        onSubmit={addPerson}
        onInputNameChange={handleInputNameChange}
        onInputPhoneChange={handleInputPhoneChange}
        nameValue={newName}
        phoneValue={newPhone}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
