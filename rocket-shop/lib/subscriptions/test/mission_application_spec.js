var assert = require('assert');
var MembershipApplication = require('../models/membership_application');
var Helpers = require('./helpers');

describe('Applying for mission', function() {
    var validApp;
    
    before(function() {
        //arrange the data here
        validApp = Helpers.validApplication;
    })
    
    
    describe('Application valid if...', function() {
        it('all validators successful', function() {
            assert(validApp.isValid());
        }); 
    }); 
    
    describe('Application invalid if...', function(){
        
        it('is expired', function() {
            var app = new MembershipApplication({validUntil: '01/01/2010'});
            assert(app.expired);
        })
        
        it('email is 4 characters or less', function() {
            var app = new MembershipApplication({email: 'd@dd'});
            assert(!app.emailIsValid()); 
        });
        
        it('email does not contain an @', function() {
                var app = new MembershipApplication({email: 'thingthinthing:thing.com'});
                assert(!app.emailIsValid());     
        });
        
        it('email is omitted', function() {
                var app = new MembershipApplication({});
                assert(!app.emailIsValid());        
        });
        
        it('height is less than 60 inches', function() {
                var app = new MembershipApplication({height: 10});
                assert(!app.heightIsValid());        
        });
        
        it('height is more than 75 inches', function() {
                var app = new MembershipApplication({height: 80});
                assert(!app.heightIsValid());        
        });
        
        it('height is omitted', function() {
                var app = new MembershipApplication({});
                assert(!app.heightIsValid());        
        });
        
        it('age is more than 100', function() {
                var app = new MembershipApplication({age: 101});
                assert(!app.ageIsValid());        
        });
        
        it('age is less than 15', function() {
                var app = new MembershipApplication({age: 12});
                assert(!app.ageIsValid());        
        });
        
        it('age is omitted', function() {
                var app = new MembershipApplication({});
                assert(!app.ageIsValid());        
        });
        
        it('weight is less than 100', function() {
                var app = new MembershipApplication({weight: 99});
                assert(!app.weightIsValid());        
        });
        
        it('weight is more than 300', function() {
                var app = new MembershipApplication({weight: 309});
                assert(!app.weightIsValid());        
        });
        
        it('weight is omitted', function() {
                var app = new MembershipApplication({});
                assert(!app.weightIsValid());        
        });
        
        it('first is omitted', function() {
                var app = new MembershipApplication({});
                assert(!app.nameIsValid());        
        });
        
        it('last is omitted', function() {
                var app = new MembershipApplication({});
                assert(!app.nameIsValid());        
        });
       
    });
});