var should = require('chai').should(),
    Serializer = require('../avro_serializer');

var s = new Serializer({
    "type": "record",
    "name": "testRecord",
    "namespace": "com.test",
    "fields": [
        {"name": "name",    "type": "string"},
        {"name": "surname", "type": "string"},
        {"name": "title",   "type": "string"},
        {"name": "age",     "type": "long"}
    ]
});

var record = {
    name: "John",
    surname: "Smith",
    title: "User",
    age: 28
};
var recordHex = '084a6f686e0a536d697468085573657238';


describe('#serialize', function() {
    it('serializes to Buffer', function() {
        s.serialize(record).toString('hex')
            .should.equal(recordHex);
    });

    it('deserializes to same record', function() {
        s.deserialize(new Buffer(recordHex, 'hex'))
            .should.deep.equal(record);
    });

});
