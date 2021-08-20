/* general imports */
const axios = require("axios");

/* pre definitions to send request */
const URL                  = "http://localhost:3000/appartments";
const BEARER_TOKEN         = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTJAZG9taW5pbyIsInByb2ZpbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjI5MzI3ODc1fQ.5M5uj9m1OWex5wX61G7TOZLn8ur9bq6yYywvJAFNMVs";
const DEFAULT_CREATE_MODEL = { appartmentFloor: "B99-666" };
const DEFAULT_UPDATE_MODEL = { appartmentFloor: "B66-999" };

/* global variables */
let APPARTMENT_ID = 0;

/* tests */
test("Create an appartment", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}`,
    method: "post",
    data: DEFAULT_CREATE_MODEL
  });

  APPARTMENT_ID = data.appartments.id;

  expect(data.status).toEqual(true);
  expect(data.appartments.appartmentFloor).toEqual(DEFAULT_CREATE_MODEL.appartmentFloor);
});

test("Find an appartment by ID", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${APPARTMENT_ID}`,
    method: "get"
  });

  expect(data.status).toEqual(true);
  expect(data.appartments.appartmentFloor).toEqual(DEFAULT_CREATE_MODEL.appartmentFloor);
});

test("Find all appartments", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}`,
    method: "get"
  });
  
  expect(data.status).toEqual(true);
  expect(data.appartments.length).toBeGreaterThan(0);
});

test("Update an appartment by id", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${APPARTMENT_ID}`,
    method: "put",
    data:   DEFAULT_UPDATE_MODEL
  });

  expect(data.status).toEqual(true);
});

test("Delete an appartment by id", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${APPARTMENT_ID}`,
    method: "delete"
  });

  expect(data.status).toEqual(true);
  expect(data.message).toEqual("Appartment floor deleted");
});