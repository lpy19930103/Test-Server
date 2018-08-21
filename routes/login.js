var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var sql = require('../module/sqlUtil');
var cuid = require('cuid');
var urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/', urlencodedParser, function (req, res) {
    var body = req.body;
    var queryStr = `SELECT * from User WHERE phone=${body.phone}`;
    sql.query(queryStr, function (err, data) {
        if (err) {
            console.log(body.name);
            console.log(body.phone);
            console.log(body.companyId);
            console.log(body.companyName);
            var cuidStr = cuid();
            var addSql = 'INSERT INTO user(userId,userName,passWord,phone,companyId,companyName,applicationStatus) VALUES(?,?,?,?,?,?,?)';
            var modSqlParams = [cuidStr, body.name, '', body.phone, body.companyId, body.companyName, 0];
            sql.add(addSql, modSqlParams, (error) => {
                if (error) {
                    res.json({eCode: 10001, eMsg: 'add user fail'});
                    res.end();
                } else {
                    res.json({
                        eCode: 10000, eMsg: '', data: {
                            userId: cuidStr,
                            username: body.name,
                            passWord: '',
                            phone: body.phone,
                            companyId: body.companyId,
                            companyName: body.companyName,
                            applicationStatus: 0,
                        }
                    });
                    res.end();
                }
            });
        } else {
            res.json(data);
            res.end();
        }
    }, true);
});

module.exports = router;
