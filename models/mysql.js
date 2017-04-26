'use strict';

var async = require('async');
var url = require('url');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'testuser',
  password : 'password',
  database : 'thunder'
});

var params = {
    timeStart: '',
    timeEnd:   '',
    type1: 0,
    type2: 1
};

exports.get = function(req, res, next){
     if(req.route.path == '/' || req.route.path == '/mainReq'){
          params.timeStart = getTimeStart(new Date());
          params.timeEnd = new Date();
          params.type1 = 0;
          params.type2 = 1;
        } else if(req.route.path == '/request'){
            var urlParse = url.parse(req.url, true);
            if(urlParse.query.type && urlParse.query.datetime) {            
                //console.log(urlParse);
                //console.log(urlParse.query.datetime);
                if (urlParse.query.type == 2){
                    params.type1 = 0;
                    params.type1 = 1;
                } else {
                params.type1 = urlParse.query.type;
                params.type2 = urlParse.query.type;
                }
                //преобразовываем локальное время в время по гринвичу
                var timeStr = new Date(urlParse.query.datetime);
                params.timeEnd = new Date(Date.parse(timeStr)-timeStr.getTimezoneOffset()*60000);
                params.timeStart = getTimeStart(params.timeEnd);
                //console.log(params.timeEnd);
            } else { 
                params.type1 = 4;
                params.type2 = 4;
                params.timeStart = 0;
                params.timeEnd = 0;
            }
        } 


	connection.connect();

	connection.query('select * from LIGHTNING where (TYPES = ? or TYPES = ?) and TIMES > ? and TIMES < ?', [params.type1, params.type2, params.timeStart, params.timeEnd], function (error, results, fields) {
	  if (error) throw error;
	  
	});

	connection.end();


}

function getTimeStart(timeEnd){
 var timeStart = new Date(timeEnd.getTime()-7200000);  //2часа в милисекундах, 
 return timeStart;
}
