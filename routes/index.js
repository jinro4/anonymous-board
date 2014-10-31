var _ = require('lodash'),
    moment = require('moment'),
    Sequelize = require('sequelize-mysql').sequelize,
    mysql = require('sequelize-mysql').mysql;

var sequelize = new Sequelize('cizion_timeline', 'root');

sequelize.authenticate()
    .complete(function(err) {
        if ( !! err) {
            console.log('::Unable to connect to the database.(localhost)::');
        } else {
            console.log('::Connection has been established successfully.(localhost)::');
        }
    });

var timelineModel = sequelize.define('timeline', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: Sequelize.TEXT,
    reply_cnt: Sequelize.INTEGER,
    regdate: Sequelize.DATE
}, {
    tableName: 'timeline',
    timestamps: false
});

exports.getTimeline = function(req, res) {

    // TODO: getReply
    timelineModel.findAll({
        order: 'id DESC'
    }).success(function(list) {
        res.jsonp(200, list);
    });
};

exports.write = function(req, res) {
    var content = req.body.content;

    if (!content || content.length < 1) {
        res.jsonp(404, {
            message: 'Parameter error'
        });

        return;
    }

    var buildObject = {
        content: req.body.content,
        reply_cnt: 0,
        regdate: new Date()
    };

    var bucket = timelineModel.build(buildObject);
        bucket.save().
            complete(function(err) {
                if ( !! err) {
                    console.log('::The bucket has not been saved.::');
                    throw err;
                } else {
                    res.jsonp(200, {
                        message: 'Writing completed'
                    });
                }
            });
};