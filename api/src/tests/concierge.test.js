/* general imports */
const axios = require("axios");

/* pre definitions to send request */
const URL                  = "http://localhost:3000/concierges";
const BEARER_TOKEN         = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTJAZG9taW5pbyIsInByb2ZpbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjI5MzI3ODc1fQ.5M5uj9m1OWex5wX61G7TOZLn8ur9bq6yYywvJAFNMVs";
const DEFAULT_CREATE_MODEL = { 
  firstName: "THIS IS A JOKE", 
  lastName:  "JESTER THE PUNK",
  password:  "jestando",
  profile:   "administrador",
  email:     "jst@thejester.cu",
  workShift: "diurno" 
};
const DEFAULT_UPDATE_MODEL = {
  firstName: "JESTER THE PUNK",
  lastName:  "THIS IS A JOKE",
  password:  "JESTADO",
  profile:   "porteiro",
  username:  "alteradohahajestficado",
  email:     "jestadohaha@thejester.cu", 
  workShift: "diurno" 
};

/* global variables */
let CONCIERGE_ID = 0;

/* tests */
test("Create a concierge", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}`,
    method: "post",
    data: DEFAULT_CREATE_MODEL
  });

  CONCIERGE_ID = data.concierge.id;

  expect(data.status).toEqual(true);
  expect(data.concierge.firstName).toEqual(DEFAULT_CREATE_MODEL.firstName);
  expect(data.concierge.lastName).toEqual(DEFAULT_CREATE_MODEL.lastName);
  expect(data.concierge.email).toEqual(DEFAULT_CREATE_MODEL.email);
  expect(data.concierge.workShift).toEqual(DEFAULT_CREATE_MODEL.workShift);
});

test("Find a concierge by ID", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${CONCIERGE_ID}`,
    method: "get"
  });

  expect(data.status).toEqual(true);
  expect(data.concierge.firstName).toEqual(DEFAULT_CREATE_MODEL.firstName);
  expect(data.concierge.lastName).toEqual(DEFAULT_CREATE_MODEL.lastName);
  expect(data.concierge.workShift).toEqual(DEFAULT_CREATE_MODEL.workShift);
});

test("Find all concierges", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}`,
    method: "get"
  });
  
  expect(data.status).toEqual(true);
  expect(data.concierges.length).toBeGreaterThan(0);
});

test("Update a concierge by id", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${CONCIERGE_ID}`,
    method: "put",
    data:   DEFAULT_UPDATE_MODEL
  });

  expect(data.status).toEqual(true);
});

test("Delete a concierge by id", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${CONCIERGE_ID}`,
    method: "delete"
  });

  expect(data.status).toEqual(true);
  expect(data.message).toEqual("Concierge deleted");
});