module.exports = (sequelize, DataTypes) => {
    const ProductTable = sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.INTEGER,
            price: DataTypes.DECIMAL(4, 2),
            url_image: DataTypes.STRING,
        },
        {
            tablename: "products",
            timestamps: false,
        },
    );
    return ProductTable;
}