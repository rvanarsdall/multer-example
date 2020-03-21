module.exports= function(sequelize, DataTypes){
    return sequelize.define('user',{
       // Col Name : Datatype
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING
    })
    }