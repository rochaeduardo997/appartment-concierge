/* general imports */
const axios = require("axios");

/* pre definitions to send request */
const URL                  = "http://localhost:3000/deliveries";
const BEARER_TOKEN         = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0ZXN0ZTJAZG9taW5pbyIsInByb2ZpbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjI5MzI3ODc1fQ.5M5uj9m1OWex5wX61G7TOZLn8ur9bq6yYywvJAFNMVs";
const DEFAULT_CREATE_MODEL = { "appartmentFloor_id": 1, "resident_id": 8, "concierge_id": 4,  "packageDescription": "Adicionado, ok? ok" };
const DEFAULT_UPDATE_MODEL = { "appartmentFloor_id": 1, "resident_id": 16, "concierge_id": 4,  "packageDescription": "Alterado, ok? ok" };

/* global variables */
let DELIVERY_ID = 0;

/* tests */
test("Create a delivery", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}`,
    method: "post",
    data: DEFAULT_CREATE_MODEL
  });

  DELIVERY_ID = data.delivery.id;

  expect(data.status).toEqual(true);
  expect(data.delivery.appartmentFloor_id).toEqual(DEFAULT_CREATE_MODEL.appartmentFloor_id);
  expect(data.delivery.resident_id).toEqual(DEFAULT_CREATE_MODEL.resident_id);
  expect(data.delivery.concierge_id).toEqual(DEFAULT_CREATE_MODEL.concierge_id);
  expect(data.delivery.packageDescription).toEqual(DEFAULT_CREATE_MODEL.packageDescription);
});

test("Find a delivery by ID", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${DELIVERY_ID}`,
    method: "get"
  });

  expect(data.status).toEqual(true);
  expect(data.delivery.appartment.id).toEqual(DEFAULT_CREATE_MODEL.appartmentFloor_id);
  expect(data.delivery.concierge.id).toEqual(DEFAULT_CREATE_MODEL.concierge_id);
  expect(data.delivery.resident.id).toEqual(DEFAULT_CREATE_MODEL.resident_id);
  expect(data.delivery.packageDescription).toEqual(DEFAULT_CREATE_MODEL.packageDescription);
});

test("Find all deliveries", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}`,
    method: "get"
  });
  
  expect(data.status).toEqual(true);
  expect(data.deliveries.length).toBeGreaterThan(0);
});

test("Update a delivery by id", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${DELIVERY_ID}`,
    method: "put",
    data:   DEFAULT_UPDATE_MODEL
  });

  expect(data.status).toEqual(true);
});

test("Delete a delivery by id", async () => {
  const { data } = await axios({
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`
    },
    url:    `${URL}/${DELIVERY_ID}`,
    method: "delete"
  });

  expect(data.status).toEqual(true);
  expect(data.message).toEqual("Delivery deleted");
});