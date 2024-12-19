import express from "express"
import { authenticateToken, isAdmin, cacheMiddleware } from "../middleware/index.middlware";
import { createFixture, deleteFixture, generateFixtureLink, getAllFixtures, getSingleFixture, searchFixtures, updateFixture, getCachedFixtures } from "../controllers/fixtures.controllers";

const router = express.Router();

    router.get('/search', searchFixtures);

    router.use(authenticateToken);

    router.get('/', getAllFixtures);

    router.use(isAdmin("admin"));

    router.post('/', createFixture);
    router.post('/link', generateFixtureLink);
    router.get('/:fixtureId', getSingleFixture);
    router.patch('/:fixtureId', updateFixture);
    router.delete('/:fixtureId', deleteFixture);

    // router.get('/fixtures', cacheMiddleware('fixtures'), getCachedFixtures);



export default router;