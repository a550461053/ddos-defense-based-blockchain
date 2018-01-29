// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-datatype-geopoint
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var should = require('should');
var GeoPoint = require('../lib/geopoint');
var DELTA = 0.0000001;

describe('GeoPoint', function() {
  describe('constructor', function() {
    it('supports a valid array', function() {
      var point = new GeoPoint([-34, 150]);

      point.lat.should.equal(-34);
      point.lng.should.equal(150);
    });

    it('supports a valid object', function() {
      var point = new GeoPoint({ lat: -34, lng: 150 });

      point.lat.should.equal(-34);
      point.lng.should.equal(150);
    });

    it('supports a valid string geo coordinates', function() {
      var point = new GeoPoint('-34,150');

      point.lat.should.equal(-34);
      point.lng.should.equal(150);
    });

    it('supports coordinates as inline parameters', function() {
      var point = new GeoPoint(-34, 150);

      point.lat.should.equal(-34);
      point.lng.should.equal(150);
    });

    it('supports coordinates as inline parameters without new keyword',
      function() {
        var point = GeoPoint(-34, 150);

        point.lat.should.equal(-34);
        point.lng.should.equal(150);
      });

    it('rejects invalid parameters', function() {
      // invalid string value throws error
      fn = function() {
        new GeoPoint('invalid_string');
      };
      fn.should.throw();

      // string of numbers is not coerced
      fn = function() {
        new GeoPoint('2.3', 3);
      };
      fn.should.throw();

      // lattitude cannot be out of +/-90 degree range
      var fn = function() {
        new GeoPoint('150,-34');
      };
      fn.should.throw();

      fn = function() {
        new GeoPoint([-94, -34]);
      };
      fn.should.throw();

      // longitude cannot be out of +/-180 degree range
      fn = function() {
        new GeoPoint({
          lat: 10,
          lng: 181,
        });
      };
      fn.should.throw();

      fn = function() {
        new GeoPoint(10, -181);
      };
      fn.should.throw();

      // empty values throw error
      fn = function() {
        new GeoPoint();
      };
      fn.should.throw();

      fn = function() {
        new GeoPoint({});
      };
      fn.should.throw();

      fn = function() {
        new GeoPoint([]);
      };
      fn.should.throw();

      fn = function() {
        new GeoPoint('', 2);
      };
      fn.should.throw();

      // array with more than two elements throws error
      fn = function() {
        new GeoPoint([70, -34, 33, 4]);
      };
      fn.should.throw();

      // boolean is not allowed
      fn = function() {
        new GeoPoint(3, true);
      };
      fn.should.throw();

      // null is not allowed
      fn = function() {
        new GeoPoint(null, -34);
      };
      fn.should.throw();

      // undefined is not allowed
      fn = function() {
        var undef;
        new GeoPoint(undef, -34);
      };
      fn.should.throw();
    });
  });

  describe('toString()', function() {
    it('returns a string in the form "lat,lng"', function() {
      var point = new GeoPoint({ lat: -34, lng: 150 });
      point.toString().should.equal('-34,150');
    });
  });

  describe('distance calculation between two points', function() {
    var here = new GeoPoint({
      lat: 40.77492964101182,
      lng: -73.90950187151662,
    });

    var there = new GeoPoint({ lat: 40.7753227, lng: -73.909217 });

    it('returns value in miles by default', function() {
      var distance = GeoPoint.distanceBetween(here, there);
      distance.should.be.a.Number;
      distance.should.be.approximately(0.03097916611592679, DELTA);
    });

    it('returns value using specified unit', function() {
      /* Supported units:
       * - `radians`
       * - `kilometers`
       * - `meters`
       * - `miles`
       * - `feet`
       * - `degrees`
       */

      var distance = here.distanceTo(there, { type: 'radians' });
      distance.should.be.a.Number;
      distance.should.be.approximately(0.000007825491914348416, DELTA);

      distance = here.distanceTo(there, { type: 'kilometers' });
      distance.should.be.a.Number;
      distance.should.be.approximately(0.04985613511367009, DELTA);

      distance = here.distanceTo(there, { type: 'meters' });
      distance.should.be.a.Number;
      distance.should.be.approximately(49.856135113670085, DELTA);

      distance = here.distanceTo(there, { type: 'miles' });
      distance.should.be.a.Number;
      distance.should.be.approximately(0.03097916611592679, DELTA);

      distance = here.distanceTo(there, { type: 'feet' });
      distance.should.be.a.Number;
      distance.should.be.approximately(163.56999709209347, DELTA);

      distance = here.distanceTo(there, { type: 'degrees' });
      distance.should.be.a.Number;
      distance.should.be.approximately(0.0004483676593058972, DELTA);
    });
  });
});
