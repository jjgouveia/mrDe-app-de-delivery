module.exports = (sequelize, DataTypes) => {
    const SaleTable = sequelize.define(
        "sale",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: DataTypes.INTEGER,
            sellerId: DataTypes.INTEGER,
            totalPrice: DataTypes.DECIMAL(9,2),
            deliveryAddress: DataTypes.STRING,
            deliveryNumber: DataTypes.STRING,
            saleDate: DataTypes.DATE,
            status: DataTypes.STRING,
        },
        {   
            underscored: true,
            tablename: "sales",
            timestamps: false,
        },
    );

    SaleTable.associate = ({ user }) => {
        SaleTable.belongsTo(user, {
            foreignKey: 'user_id',
            as: 'user',
        });

        SaleTable.belongsTo(user, {
            foreignKey: 'seller_id',
            as: 'seller',
        });
    };
    
    return SaleTable;
}