'use strict';
var dto = require('dto');

module.exports = (sequelize, DataTypes) => {
    var Flow = sequelize.define('Flow', {
            id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
            name: {type: DataTypes.STRING, allowNull: false, unique: true},
            value: {type: DataTypes.BOOLEAN, defaultValue: false},
            revision: {type: DataTypes.INTEGER, defaultValue: 0}
        }
    );

    Flow.Revisions = Flow.hasPaperTrail();

    Flow.prototype.toDTO = function () {
        return JSON.stringify(dto.take.only(this.dataValues, ['name', 'value']));
    };

    return Flow;
};