module.exports = (sequelize, DataTypes) => {
    const UserTable = sequelize.define(
        "User",
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

    UserTable.associate = ({ Sale }) => {
        UserTable.hasMany(Sale, {
            as: "costumer",
            foreignKey: "user_id",
        });

        UserTable.hasMany(Sale, {
            as: "seller",
            foreignKey: "seller_id",
        });
    };

    return UserTable;
}
