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
		malicious: {
			type: DataTypes.BOOLEAN,
			defaultValue: true //we assume all links are malicious until proven safe
			//this is a BOOLEAN which is determined via virus total node package
		},
	});

	return Links;
}

