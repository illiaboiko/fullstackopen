import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function createPerson(obj) {
  const request = axios.post(baseUrl, obj);
  return request.then((response) => response.data);
}

function deletePerson(id) {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { createPerson, deletePerson, updatePerson };
