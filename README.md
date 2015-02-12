Node Avro Serializer
=========

A small library providing serialization and deserialization routines for Apache avro binary encoding

## Installation

    npm install avro-serializer --save

## Usage

    var Serializer = require('avro-serializer');

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

    var buffer = s.serialize(record);
    console.log(buffer.toString('hex'));

    var newRecord = s.deserialize(buffer);
    console.log(newRecord);

## Tests

    npm test
