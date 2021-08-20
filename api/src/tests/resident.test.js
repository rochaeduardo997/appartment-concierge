/* general imports */
const axios = require("axios");

/* pre definitions to send request */
const URL                  = "http://localhost:3000/residents";
const BEARER_TOKEN         = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTJAZG9taW5pbyIsInByb2ZpbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjI5MzI3ODc1fQ.5M5uj9m1OWex5wX61G7TOZLn8ur9bq6yYywvJAFNMVs";
const DEFAULT_CREATE_MODEL = { 
  ownerFirstName: "BATMAN",
  ownerLastName: "THEJESTERKNIGHT", 
  password: "testando",
  profile:  "proprietario",
  email: "batmanjesterknight@dominio.test", 
  appartmentFloor_id: 1
};
const DEFAULT_UPDATE_MODEL = { 
  ownerFirstName: "NOLONGERAJOKE", 
  ownerLastName: "NOLONGERJESTERKNIGHT", 
  username: "usernamealteradojestado", 
  password: "testado-aprovado", 
  profile:  "morador",
  email: "aprovadotestadoeafins@dominio.test", 
  appartmentFloor_id: 1
};

/* global variables */
let RESIDENT_ID = 0;

/* tests */
test("Create a resident", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}`,
    method: "post",
    data: DEFAULT_CREATE_MODEL
  });

  RESIDENT_ID = data.residents.id;

  expect(data.status).toEqual(true);
  expect(data.residents.ownerFirstName).toEqual(DEFAULT_CREATE_MODEL.ownerFirstName);
  expect(data.residents.ownerLastName).toEqual(DEFAULT_CREATE_MODEL.ownerLastName);
  expect(data.residents.email).toEqual(DEFAULT_CREATE_MODEL.email);
  expect(data.residents.appartmentFloor_id).toEqual(DEFAULT_CREATE_MODEL.appartmentFloor_id);
});

test("Find a resident by ID", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${RESIDENT_ID}`,
    method: "get"
  });

  expect(data.status).toEqual(true);
  expect(data.resident.ownerFirstName).toEqual(DEFAULT_CREATE_MODEL.ownerFirstName);
  expect(data.resident.ownerLastName).toEqual(DEFAULT_CREATE_MODEL.ownerLastName);
  expect(data.resident.email).toEqual(DEFAULT_CREATE_MODEL.email);
  expect(data.resident.appartments.id).toEqual(DEFAULT_CREATE_MODEL.appartmentFloor_id);
});

test("Find all residents", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}`,
    method: "get"
  });
  
  expect(data.status).toEqual(true);
  expect(data.residents.length).toBeGreaterThan(0);
});

test("Update a resident by id", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${RESIDENT_ID}`,
    method: "put",
    data:   DEFAULT_UPDATE_MODEL
  });

  expect(data.status).toEqual(true);
});

test("Delete a resident by id", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${RESIDENT_ID}`,
    method: "delete"
  });

  expect(data.status).toEqual(true);
  expect(data.message).toEqual("Resident deleted");
});