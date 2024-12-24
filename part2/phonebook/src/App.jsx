import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName.trim() || !newPhone.trim()) {
      alert("Specify a value for both name and phone number");
      return;
    }

    const newPersonObj = {
      name: newName,
      number: newPhone,
      id: persons.length + 1,
    };

    // const isUnique = !persons.some((person) =>
    //   areTheseObjectsEqual(person, newPersonObj)
    // );

    const isUnique = !persons.some(
      (person) => person.name === newPersonObj.name
    );

    isUnique
      ? setPersons([...persons, newPersonObj])
      : alert(`${newName} is already in phone book`);

    setNewName("");
    setNewPhone("");
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
        console.log('render', persons)
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
