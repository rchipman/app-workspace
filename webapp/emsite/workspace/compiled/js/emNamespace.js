var EM, em;

EM = (function() {
  var unitMaker;

  function EM() {}

  EM.prototype.unit = null;

  unitMaker = (function() {
    var PrivateUnit;

    function unitMaker() {}

    PrivateUnit = (function() {
      function PrivateUnit() {
        return {};
      }

      return PrivateUnit;

    })();

    unitMaker.get = function() {
      return new PrivateUnit();
    };

    return unitMaker;

  })();

  EM.prototype.getUnit = function() {
    return this.unit != null ? this.unit : this.unit = unitMaker.get();
  };

  EM.prototype.clone = function(obj) {
    var flags, key, newInstance;
    if ((obj == null) || typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
      flags = '';
      if (obj.global != null) {
        flags += 'g';
      }
      if (obj.ignoreCase != null) {
        flags += 'i';
      }
      if (obj.multiline != null) {
        flags += 'm';
      }
      if (obj.sticky != null) {
        flags += 'y';
      }
      return new RegExp(obj.source, flags);
    }
    newInstance = new obj.constructor();
    for (key in obj) {
      newInstance[key] = EM.prototype.clone(obj[key]);
    }
    return newInstance;
  };

  EM.prototype.identity = function(x) {
    return x;
  };

  EM.prototype.toController = function(str) {
    console.log(str);
    return "" + (str.slice(0, 1).toUpperCase()) + str.slice(1);
  };

  return EM;

})();

em = new EM;

em.getUnit();
