module.exports = function(sequelize, DataTypes) {
	var Links = sequelize.define("Links", {
		short_link: {
			type: DataTypes.STRING, 
			allowNull: false,
			primaryKey: true,
		},
		long_link: {
			type: DataTypes.STRING, 
			allowNull: false,
		},
		domain_name: {
			type: DataTypes.STRING, 
			allowNull: false,
		},
		safe: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
			//this is a BOOLEAN which is determined via virus total node package
		},
	});

	return Links;
}
	// Links.associate = function(models) {
	// 	//creates an association saying that
	// 	Links.hasMany(models.Votes, {
	// 		foreignKey: short_link, 
			
	// 	});
	// }
