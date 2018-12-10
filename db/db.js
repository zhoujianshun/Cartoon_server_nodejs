const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('./config');

console.log('init sequelize...');


function generatedId(){
    return uuid.v4();
}

console.log('db config: ' + JSON.stringify(config));

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false,
            };
        }
    }

    attrs.id = {
        type: ID_TYPE,
        primaryKey: true,
    };

    attrs.createAt = {
        type: Sequelize.BIGINT,
        allowNull: false,
    };

    attrs.updateAt = {
        type: Sequelize.BIGINT,
        allowNull: false,
    };

    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false,
    };

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (obj.isNewRecord) {
                        if (!obj.id) {
                            obj.id = generatedId();
                        }
                        obj.createAt = now;
                        obj.updateAt = now;
                        obj.version = 0;

                    } else {
                        obj.updateAt = Date.now();
                        obj.version++;
                    }
                }
            },
        }
    });
}
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
    defineModel: defineModel,
    sync: () => {

        // only allow create ddl in non-production environment
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generatedId = generatedId;

module.exports = exp;