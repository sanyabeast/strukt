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

		this.__globalClasses = {};
		this.__globalInterfaces = {};
	};

	Strukt.prototype = {
		GLOBAL : "global",
		PRIVATE : "private",
		Meta : Meta,
		__err : function(msg){
			throw new Error(this.__join("Strukt Error: ", msg));
		},
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
		__extend : function(parent, child){
			console.log(parent, child);
		},
		__extends : function(Klass){
			var _this = (typeof this == "function") ? this : this.construktor;

			if (_this.__meta && _this.__meta instanceof Meta){

				if (typeof Klass == "function" && Klass.__meta && Klass.__meta instanceof Meta){
					return _strukt.__extend(Klass, this);
				} else {	
					this.__err("only strukt-Classes can be extended");
				}

			} else {
				this.__err("only strukt-Class can extend another strukt-Class");
			}
		},
		__implements : function(){
			var _this = (typeof this == "function") ? this.prototype : this;

			if (_this.__meta && _this.__meta instanceof Meta){

			} else {
				this.__err("only strukt-Classes can implement stukt-Interfaces");
			}
		},
		Class : function(access, name, proto){

			if (!name && !proto && typeof access == "string"){
				if (this.__globalClasses[access]){
					return this.__globalClasses[access];
				} else {
					this.__err(this.__join("global class \"", access,"\" not found"));
				}
			}

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

			this.prop(Construktor, "__meta", {
				value : new this.Meta(this, "class", name, proto),
				writable : false,
				enumerable : false,
				configurable : false
			});

			this.prop(Construktor.prototype, "extends", {
				value : this.__extends,
				writable : false,
				enumerable : false,
				configurable : false
			});

			this.prop(Construktor.prototype, "implements", {
				value : this.__implements,
				writable : false,
				enumerable : false,
				configurable : false
			});

			this.prop(Construktor, "extends", {
				value : this.__extends,
				writable : false,
				enumerable : false,
				configurable : false
			});

			this.prop(Construktor, "implements", {
				value : this.__implements,
				writable : false,
				enumerable : false,
				configurable : false
			});

			this.prop(Construktor.prototype, "construktor", {
				value : Construktor,
				writable : false,
				enumerable : false,
				configurable : false
			});

			this.__loop(proto, function(config, name){
				this.prop(Construktor.prototype, name, config);
			}, this);

			switch(access){
				case this.GLOBAL:
					this.__globalClasses[name] = Construktor;
				break;
				case this.PRIVATE:

				break;
			}

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