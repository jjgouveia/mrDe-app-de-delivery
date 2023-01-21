module.exports = (sequelize, DataTypes) => {
    const UserTable = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
        },
        {
            tablename: "users",
            timestamps: false,
        },
    );

    UserTable.associate = ({ sale }) => {
        UserTable.hasMany(sale, {
            as: "costumer",
            foreignKey: "user_id",
        });

        UserTable.hasMany(sale, {
            as: "seller",
            foreignKey: "seller_id",
        });
    };

    return UserTable;
}
