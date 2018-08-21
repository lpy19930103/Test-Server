const mysql = require('mysql');
const config = {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'user'
};

function handleError(err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

// 连接数据库
function connect() {
    connection = mysql.createConnection(config);
    connection.connect(handleError);
    connection.on('error', handleError);
}

var connection;
connect();


module.exports.query =
    function query(querySql, callBack, selectOne) {
        connection.query(querySql, (error, results,) => {
            if (error) {
                console.log('The error is: ', error);
                callBack(true, {eCode: 10001});
            } else {
                if (results == null || results.length < 1) {
                    callBack(true, {eCode: 10001});
                } else {
                    if (selectOne && results instanceof Array) {
                        callBack(false, {eCode: 10000, eMsg: '', data: results[0]});
                    } else {
                        callBack(false, {eCode: 10000, eMsg: '', data: results});
                    }
                }
            }
        });
    };

module.exports.add = function add(addSql, addParams, callBack) {
    connection.query(addSql, addParams, (error, result) => {
        console.log('The solution is: ', result);
        console.log('The error is: ', error);
        callBack(error);
    });
};

module.exports.update = function update(modSql, modSqlParams) {
    connection.query(modSql, modSqlParams, (err, res) => {
        if (err) throw  err;
        console.log(res);
    });
};

module.exports.deleteSql = function deleteSql(delSql) {
    connection.query(delSql, (err, res) => {
        if (err) throw  err;
        console.log(res);
    });
};


var querySql = 'SELECT\n' +
    'name,\n' +
    'age\n' +
    'FROM\n' +
    'user';

var addSql = 'INSERT INTO user(name,age) VALUES(?,?)';
var addParams = ['lipy', 26];

var modSql = 'UPDATE user SET name = ?,age = ? WHERE Id = ?';
var modSqlParams = ['lipy', 26, 3];

var delSql = 'DELETE FROM user where id=3';


