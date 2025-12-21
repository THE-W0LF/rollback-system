const express = require("express");
const router = express.Router();

const { 
    createEntity,
    updateEntity,
    getVersions,
    rollbackEntity,
    getEntity, 
} = require("../controllers/entityController");

router.post("/entities", createEntity);
router.get("/entities/:id", getEntity);
router.put("/entities/:id", updateEntity);
router.get("/entities/:id/versions", getVersions);
router.post("/entities/:id/rollback/:versionId", rollbackEntity);

module.exports = router;
