module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users",{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validations: {
                len: [1, 254],
                notEmpty: true
            },
            unique: "UniqueUser"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validations: {
                notEmpty: true,
                len: [1,254]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validations: {
                len: [1, 254],
                notEmpty: true,
                isEmail: true
            }
        }
    })
   // Refers to favorites
    Users.associate = function(models) {
        Users.hasMany(models.Favorites, {
            as: "favorites",
            onDelete: "cascade"
        });   
    return Users;

    };
};
