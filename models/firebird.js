'use strict';

var fb = require('node-firebird');
var async = require('async');
var url = require('url');

var options = {};
    options.host = '192.168.1.5';
    options.port = 3050;
    options.database = '/work/db/firebird/meteo.gdb';
    options.user = 'sysdba';
    options.password = 'dvvdendem';
    options.role = null;            // default 
    options.pageSize = 4096; 


var params = {
    timeStart: '',
    timeEnd:   '',
    type1: 4,
    type2: 4
};

var date = new Date();

exports.get = function(req, res, next){

     if(req.route.path == '/' || req.route.path == '/mainReq'){
          params.timeStart = getTimeStart(new Date());
          params.timeEnd = new Date();
          params.type1 = 0;
          params.type2 = 1;
        } else if(req.route.path == '/request'){
            var urlParse = url.parse(req.url, true);
            console.log(urlParse);
            if((urlParse.query.intra || urlParse.query.toGround) && urlParse.query.datetime) {
                if (urlParse.query.intra) {
                    params.type1 = urlParse.query.intra;
                }
                if (urlParse.query.toGround) {
                    params.type2 = urlParse.query.toGround;
                }
                console.log(urlParse.query.datetime);
                params.timeEnd = new Date(urlParse.query.datetime);
                params.timeStart = getTimeStart(params.timeEnd);
                console.log(params.timeEnd);
            } else { 
                params.type1 = 4;  //получаем пустой ответ
                params.type2 = 4;
                params.timeStart = 0;
                params.timeEnd = 0;
            }
        } 


    async.waterfall([
          function(callback) {
            fb.attach(options, function(err, db) {
                callback(null, db);  
            });
          },
          function(db, callback) {
            db.query('select * from LIGHTNING where (TYPES = ? or TYPES = ?) and TIMES > ? and TIMES < ?', [params.type1, params.type2, params.timeStart, params.timeEnd], function(err, result) {
                console.log(result);
                callback(null, result);
                db.detach();
            });
            
          }
        ], function(err, result) {
        if (err)
            throw err;

        
        //console.log(result);

        if(req.url == '/'){
            res.render('main', {date: date, data: JSON.stringify(result)});
            date = new Date();
        } else {
            res.json(result);
        }
    });
    
}



function getTimeStart(timeEnd){
 var timeStart = new Date(timeEnd.getTime()-7200000); //2 часа в мс
 return timeStart;
}
