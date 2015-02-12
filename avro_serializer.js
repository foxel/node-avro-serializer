var Schema = require('node-avro-io').Schema,
    IO = require('node-avro-io').IO;

var Serializer = function(schema) {
    if ((this instanceof arguments.callee) === false) {
        return new arguments.callee(schema);
    }

    this._schema = new Schema.Schema(schema);

    return this;
};

Serializer.prototype.serialize = function(datum) {
    var buffer = new Buffer([]);
    var encoder = new IO.BinaryEncoder({
        write: function(data) {
            if (!Buffer.isBuffer(data)) {
                data = new Buffer([data]);
            }
            buffer = Buffer.concat([buffer, data]);
        }
    });
    var writer = new IO.DatumWriter(this._schema);
    writer.write(datum, encoder);

    return buffer;
};

Serializer.prototype.deserialize = function(buffer) {
    if (!Buffer.isBuffer(buffer)) {
        throw "Buffer object expected";
    }

    var decoder = new IO.BinaryDecoder({
        _i: 0,
        read: function(len) {
            if (this._i + len > buffer.length) {
                throw "reading after buffer exhausted"
            }
            var i = this._i;
            this._i += len;
            return len == 1
                ? buffer[i]
                : buffer.slice(i, this._i);
        },
        skip: function(len) {
            if (this._i + len > buffer.length) {
                throw "reading after buffer exhausted"
            }
            this._i += len;
        }
    });
    var reader = new IO.DatumReader(this._schema, this._schema);
    return reader.read(decoder);
};

module.exports = exports = Serializer;
