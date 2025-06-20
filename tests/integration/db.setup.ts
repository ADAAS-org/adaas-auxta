// =====================================================================================
// This file sets up the database for integration tests.
// It initializes the schema and clears the database before each test.

import { clearDB, initDB } from "./db/auxta";



beforeAll(async () => {
    await initDB(); // set up tables before running tests
});

afterAll(async () => {
    await clearDB(); // clean DB before each test
});