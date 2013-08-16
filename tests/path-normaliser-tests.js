var pathNormaliser = require('../tasks/lib/path-normaliser'),
    should = require('should'),
    util = require('util');


describe('path-normaliser tests', function(){
    it('should normalise a windows path to a unix path', function(){
        var result = pathNormaliser('\\some\\windows\\path', '/');
        result.should.eql('/some/windows/path');
    });

    it('should normalise a windows path to a windows path', function(){
        var result = pathNormaliser('\\some\\windows\\path', '\\');
        result.should.eql('\\some\\windows\\path');
    });

    it('should normalise a unix path to a windows path', function(){
        var result = pathNormaliser('/some/unix/path', '\\');
        result.should.eql('\\some\\unix\\path');
    });

    it('should normalise a unix path to a unix path', function(){
        var result = pathNormaliser('/some/unix/path', '/');
        result.should.eql('/some/unix/path');
    });

    it('should remove empty segments', function(){
        var result = pathNormaliser('\\some\\\\windows\\path', '/');
        result.should.eql('/some/windows/path');
    });

    it('should not append leading separator when not present in original', function(){
        var result = pathNormaliser('some\\\\windows\\path', '/');
        result.should.eql('some/windows/path');
    });
});
