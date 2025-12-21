const Entity = require("../models/Entity");
const Version = require("../models/Version");

/**
 * CREATE ENTITY
 */
const createEntity = async (req, res) => {
  try {
    const entity = await Entity.create(req.body);
    res.status(201).json(entity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ENTITY
 */
const getEntity = async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }
    res.json(entity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE ENTITY + SAVE VERSION
 */
const updateEntity = async (req, res) => {
  try {
    const { id } = req.params;

    const entity = await Entity.findById(id);
    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }

    const versionCount = await Version.countDocuments({ entityId: id });

    await Version.create({
      entityId: id,
      snapshot: {
        name: entity.name,
        status: entity.status,
      },
      versionNumber: versionCount + 1,
    });

    entity.name = req.body.name || entity.name;
    entity.status = req.body.status || entity.status;

    await entity.save();
    res.json(entity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET VERSION HISTORY
 */
const getVersions = async (req, res) => {
  try {
    const versions = await Version.find({
      entityId: req.params.id,
    }).sort({ versionNumber: -1 });

    res.json(versions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ROLLBACK ENTITY
 */
const rollbackEntity = async (req, res) => {
  try {
    const { id, versionId } = req.params;

    const entity = await Entity.findById(id);
    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }

    const version = await Version.findById(versionId);
    if (!version) {
      return res.status(404).json({ message: "Version not found" });
    }

    // Save current state as a new version before rollback
    const versionCount = await Version.countDocuments({ entityId: id });

    await Version.create({
      entityId: id,
      snapshot: {
        name: entity.name,
        status: entity.status,
      },
      versionNumber: versionCount + 1,
    });

    // Rollback
    entity.name = version.snapshot.name;
    entity.status = version.snapshot.status;

    await entity.save();

    res.json({
      message: "Rollback successful",
      entity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEntity,
  getEntity,
  updateEntity,
  getVersions,
  rollbackEntity,
};
