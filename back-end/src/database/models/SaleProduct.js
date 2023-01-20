module.exports = (sequelize, DataTypes) => {
    const SaleProductTable = sequelize.define(
        "SaleProduct",
        {
          sale_id: DataTypes.INTEGER,
          product_id: DataTypes.INTEGER,
          quantity: DataTypes.INTEGER,
        },
        {
            tablename: "sales_products",
            timestamps: false,
        },
    );

    SaleProductTable.associate = ({ Sale, Product }) => {
        Sale.belongsToMany(Product, {
            as: "products",
            foreignKey: "sale_id",
            otherKey: "product_id",
            through: SaleProductTable,
        });

        SaleProductTable.belongsToMany(Sale, {
            as: "sales",
            foreignKey: "product_id",
            otherKey: "sale_id",
            through: SaleProductTable,
        });
    };
    
    return SaleProductTable;
}