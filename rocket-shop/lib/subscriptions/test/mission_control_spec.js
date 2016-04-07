var moment = require('moment');
var MissionControl = require('../models/mission_control');
var assert = require('assert');
var DB = require('../db');
var sinon = require('sinon');
var Mission = require('../models/mission');

describe('Mission Planning', function() {
    var missionControl, db;
    before(function() {
        db = new DB();
        sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
        sinon.stub(db, 'createNextMission').yields(null, new Mission());
        missionControl = new MissionControl({db: db});
    });
    describe('No Current Mission', function() {
        var currentMission;
        before(function(done) {
            missionControl.currentMission(function(err, res) {
                currentMission = res;
                done(); 
            });
        });
        it('it is created if none exist', function() {
            assert(currentMission); 
            assert(db.getMissionByLaunchDate.called);
        });
    });
    
    describe('Current Mission Exists', function() {
        var currentMission;
        before(function(done) {
            db.getMissionByLaunchDate.restore(); //unwrap it
            sinon.stub(db, 'getMissionByLaunchDate').yields(null, {id: 1000});
            missionControl.currentMission(function(err, res) {
                currentMission = res;
                done(); 
            });
        });
        it('it returns mission 1000', function() {
            console.log(currentMission);
            assert.equal(currentMission.id, 1000); 
            assert(db.getMissionByLaunchDate.called);
        });
    });
});
