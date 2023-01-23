module.exports = (sequelize, DataTypes) => {
    const SaleProductTable = sequelize.define(
        "sale_product",
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

    SaleProductTable.associate = ({ sale, product }) => {
        sale.belongsToMany(product, {
            as: "products",
            foreignKey: "sale_id",
            otherKey: "product_id",
            through: SaleProductTable,
        });

        SaleProductTable.belongsToMany(sale, {
            as: "sales",
            foreignKey: "product_id",
            otherKey: "sale_id",
            through: SaleProductTable,
        });
    };
    
    return SaleProductTable;
}