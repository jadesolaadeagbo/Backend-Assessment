import express from "express"
import { authenticateToken, isAdmin } from "../middleware/index.middlware";
import { createFixture, deleteFixture, getAllFixtures, getSingleFixture, searchFixtures, updateFixture } from "../controllers/fixtures.controllers";

const router = express.Router();

    router.get('/search', searchFixtures);

    router.use(authenticateToken);

    router.get('/', getAllFixtures);

    router.use(isAdmin("admin"));

    router.post('/', createFixture);
    router.get('/:fixtureId', getSingleFixture);
    router.patch('/:fixtureId', updateFixture);
    router.delete('/:fixtureId', deleteFixture);




export default router;