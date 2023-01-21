module.exports = (sequelize, DataTypes) => {
    const SaleTable = sequelize.define(
        "Sale",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            seller_id: DataTypes.INTEGER,
            total_price: DataTypes.DECIMAL(9,2),
            delivery_address: DataTypes.STRING,
            delivery_number: DataTypes.STRING,
            sale_date: DataTypes.DATE,
            status: DataTypes.STRING,
        },
        {
            tablename: "sales",
            timestamps: false,
        },
    );

    SaleTable.associate = ({ User }) => {
        SaleTable.belongsTo(User, {
            as: "costumer",
            foreignKey: "id",
        });

        SaleTable.belongsTo(User, {
            as: "seller",
            foreignKey: "id",
        });
    };
    
    return SaleTable;
}