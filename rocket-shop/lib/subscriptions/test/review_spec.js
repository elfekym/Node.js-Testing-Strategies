var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');
var sinon = require('sinon');

describe('The Review Process', function() {
    
    describe('Receiving a valid application', function() {
        var decision;
        var validApp = new MembershipApplication({
                first: 'Test',
                last: 'User',
                email: 'test@test.com',
                age: 30,
                height: 66,
                weight: 185
        });
        var review = new ReviewProcess({application: validApp});
        sinon.spy(review, 'ensureAppValid');
        sinon.spy(review, 'findNextMission');
        sinon.spy(review, 'roleIsAvailable');
        sinon.spy(review, 'ensureRoleCompatible');
        
        before(function(done) {
            review.processApplication(function(err, result) {
                decision = result;
                done(); 
            });
        });
        it('returns success', function() {
            assert(decision.success, decision.message);
        });
        it('ensures the application is valid', function() {
            assert(review.ensureAppValid.called);
        });
        it('selects a mission', function() {
            assert(review.findNextMission.called);
        });
        it('ensures a role exists', function() {
            assert(review.roleIsAvailable.called);
        });
        it('ensures role compatibility', function() {
            assert(review.ensureRoleCompatible.called);
        });
    });
    
});