import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getItems = (user) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/items.json?orderBy="uid"&equalTo="${user}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

// then((response) => resolve(Object.values(response.data))) is converting to obj, so instead pass
const getItemsFB = (fbKey) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/items/${fbKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const createItem = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/items.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/items/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getItems(object.uid).then(resolve));
    })
    .catch(reject);
});

const deleteItem = (itemObj) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/items/${itemObj.firebaseKey}.json`)
    .then(() => getItems(itemObj.uid).then(resolve))
    .catch(reject);
});

const updateItem = (itemObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/items/${itemObj.firebaseKey}.json`, itemObj)
    .then(() => getItems(itemObj.uid).then(resolve))
    .catch(reject);
});

const updateFav = (itemObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/items/${itemObj.firebaseKey}.json`, itemObj)
    .then(resolve)
    .catch(reject);
});

const getNotes = (itemID) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/notes.json?orderBy="itemID"&equalTo="${itemID}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createNote = (object) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/notes.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/notes/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getNotes(object.itemID).then(resolve));
    })
    .catch(reject);
});

const deleteNote = (noteObj) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/notes/${noteObj.firebaseKey}.json`)
    .then(() => resolve(getNotes(noteObj.itemID)))
    .catch(reject);
});

export {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  getItemsFB,
  updateFav,
  getNotes,
  createNote,
  deleteNote,
};
