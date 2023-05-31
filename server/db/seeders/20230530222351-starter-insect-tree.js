'use strict';

const { Tree, Insect, InsectTree } = require('../models');
const { Op } = require('sequelize');

const insectTrees = [
  {
    insectName: "Western Pygmy Blue Butterfly",
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insectName: "Patu Digua Spider",
    trees: [
      { tree: "Stagg" },
    ],
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let insectIdx = 0; insectIdx < insectTrees.length; insectIdx++) {
      const { insectName, trees } = insectTrees[insectIdx];
      const insect = await Insect.findOne({ where: { name: insectName } });

      for (let treeIdx = 0; treeIdx < trees.length; treeIdx++) {
        const treeName = trees[treeIdx].tree;
        const tree = await Tree.findOne({ where: { tree: treeName }});
        await InsectTree.create({ treeId: tree.id, insectId: insect.id });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    for (let insectIdx = 0; insectIdx < insectTrees.length; insectIdx++) {
      const { insectName, trees } = insectTrees[insectIdx];
      const insect = await Insect.findOne({ where: { name: insectName } });

      for (let treeIdx = 0; treeIdx < trees.length; treeIdx++) {
        const treeName = trees[treeIdx].tree;
        const tree = await Tree.findOne({ where: { tree: treeName }});
        await InsectTree.destroy({ where: { [Op.and]: [
          { insectId: insect.id },
          { treeId: tree.id}
        ]
      }
    });

      }
    }
  }
};
