var database;
exports.datamodule = {
	init : function (data){
		console.log("데이터 pool init");
		database = data;
	},
	getRsData : function (sql,param,callback){
		let conn;
		let result;
		try{
			conn = database.getConnection();
			result = conn.query(sql,param);
		}catch(err){
			throw err;
		}finally{
			if(conn){conn.end();}
		}
		
		return result;
	}
};



