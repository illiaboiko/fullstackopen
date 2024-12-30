import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [notification, setNotification] = useState({
    type: null,
    message: null,
  });

  const showNotification = (type, message) => {
    setNotification({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setNotification({ type: null, message: null });
    }, 5000);
  };

  useEffect(() => {
    personsService.getAllPersons().then((data) => {
      setPersons(data);
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
          showNotification("success", `${newPerson.name} has been added!`);
        })
        .catch((error) =>
          showNotification("error", "failed to add the person..")
        );
    } else {
      if (
        window.confirm(
          `${newPersonObj.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const dublicatePerson = persons.find(
          (p) => p.name === newPersonObj.name
        );
        const id = dublicatePerson.id;
        personsService
          .updatePerson(id, newPersonObj)
          .then((returnedPerson) => {
            setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
            showNotification(
              "success",
              `${returnedPerson.name}'s phone number has been updated`
            );
          })
          .catch((error) =>
            showNotification(
              "error",
              `Information of ${newPersonObj.name} has already been removed from server`
            )
          );
      }
    }

    setNewName("");
    setNewPhone("");
  };

  const deletePerson = (id) => {
    if (window.confirm("Sure?")) {
      personsService
        .deletePerson(id)
        .then((deletedPerson) => {
          setPersons(persons.filter((p) => p.id !== deletedPerson.id));
          showNotification("success", `Deleted successfully`);
        })
        .catch((error) =>
          showNotification(
            "error",
            `Information of ${
              persons.find((p) => p.id === id).name
            } has already been removed from server`
          )
        );
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
      <Notification notification={notification} />
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
