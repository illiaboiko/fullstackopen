import axios from "axios";

const baseUrl = "/api/persons";

function getAllPersons() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function createPerson(obj) {
  const request = axios.post(baseUrl, obj);
  return request
    .then((response) => response.data)
    // .catch((error) => console.log(error.response.data.error));
}

function deletePerson(id) {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
}

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { createPerson, deletePerson, updatePerson, getAllPersons };
