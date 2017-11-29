"use strict";
define(function(){

	var Meta = function(strukt, type, name, proto){
		this.strukt = strukt;
		this.type = type;
		this.name = name;
		this.proto = proto;
	};

	Meta.prototype = {
		create : function(instance, args){
			if (this.proto.constructor_){construtor_
				this.proto.constructor_.apply(instance, arguments);
			}
		}
	};

	var _strukt;
	var Strukt = function(){
		if (_strukt instanceof Strukt){
			return _strukt;
		}
	};

	Strukt.prototype = {
		Meta : Meta,
		__loop : function(coll, cb, ctx){
			for (var k in coll){
				cb.call(ctx, coll[k], k, coll);
			}
		},	
		__join : function(){
			return Array.prototype.join.call(arguments, "");
		},
		__rename : function(fun, name){
			return eval(this.__join(fun.toString().replace("function", this.__join("function ", name)), ";", name));
		},
		Class : function(name, proto){
			var Construktor = function(){
				this.__meta.create(this, arguments);
			};

			Construktor = this.__rename(Construktor, name);

			this.prop(Construktor.prototype, "__meta", {
				value : new this.Meta(this, "class", name, proto),
				writable : false,
				enumerable : false,
				configurable : false
			});

			this.__loop(proto, function(config, name){
				this.prop(Construktor.prototype, name, config);
			}, this);

			return Construktor;

		},
		Interface : function(){

		},
		Abstract : function(){

		},	
		prop : function(target, name, options){
			if (typeof options == "object" && (typeof options.get == "function" || typeof options.set == "function" || typeof options.value != "undefined")){
				Object.defineProperty(target, name, options);
			} else {
				Object.defineProperty(target, name, {
					value : options
				});
			}

			return this;
		}
	};

	var _strukt = new Strukt();

	return _strukt;
});