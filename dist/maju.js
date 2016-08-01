// Generated by CoffeeScript 1.10.0
(function() {
  window.maju = function() {};

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.ajax = function(opts) {
    var xhr;
    opts = opts || {};
    opts.cb = opts.cb || function() {};
    xhr = new XMLHttpRequest();
    xhr.open('GET', opts.url);
    xhr.send(null);
    xhr.onreadystatechange = function() {
      var DONE, OK, err;
      DONE = 4;
      OK = 200;
      err = false;
      if (xhr.readyState === DONE) {
        if (xhr.status !== OK) {
          err = xhr.status;
        }
        opts.cb(err, xhr.responseText);
      }
    };
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.domready = function(cb) {
    if (document.readyState === 'complete') {
      return window.setTimeout(cb, 1);
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        cb();
      });
    }
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.find = function(sel, ref) {
    var el, el_arr, els, i, len;
    el_arr = [];
    if (sel) {
      if (typeof sel !== 'object') {
        if (ref) {
          els = ref.querySelectorAll(sel);
        } else {
          els = document.querySelectorAll(sel);
        }
      } else {
        if (sel.length) {
          els = sel;
        } else {
          els = [sel];
        }
      }
      for (i = 0, len = els.length; i < len; i++) {
        el = els[i];
        el.find = function(sel) {
          return window.maju.find(sel, this);
        };
        el.on = function(eventName, cb) {
          window.maju.on(el, eventName, cb);
        };
        el_arr.push(el);
      }
      el_arr.get = function(index) {
        return this[index];
      };
    }
    return el_arr;
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  var LocalStorage;

  LocalStorage = function() {
    var ApplyBackup, GetBackup, localStorage;
    localStorage = window.localStorage;
    ApplyBackup = function(backup, fClear, fOverwriteExisting) {
      var i, key, len, value;
      fClear = fClear || false;
      fOverwriteExisting = fOverwriteExisting || false;
      if (fClear === true) {
        localStorage.clear();
      }
      for (value = i = 0, len = backup.length; i < len; value = ++i) {
        key = backup[value];
        if (fOverwriteExisting === false && backup[key] !== void 0) {
          continue;
        }
        localStorage.setItem(key, value);
      }
    };
    GetBackup = function() {
      var backup, key, value;
      backup = {};
      for (key in localStorage) {
        value = localStorage[key];
        backup[key] = value;
      }
      return backup;
    };
    this.GetRemainingSpace = function(cb) {
      var data, e, error, increase, itemBackup, totalData, trytotalData;
      itemBackup = localStorage.getItem('');
      increase = true;
      data = '1';
      totalData = '';
      trytotalData = '';
      while (true) {
        try {
          trytotalData = totalData + data;
          localStorage.setItem('', trytotalData);
          totalData = trytotalData;
          if (increase) {
            data += data;
          }
        } catch (error) {
          e = error;
          if (data.length < 2) {
            break;
          }
          increase = false;
          data = data.substr(data.length / 2);
        }
      }
      if (itemBackup === null) {
        localStorage.removeItem('');
      } else {
        localStorage.setItem('', itemBackup);
      }
      cb(totalData.length);
    };
    return this.GetMaximumSize = function(cb) {
      var backup, max;
      backup = localStorage_getBackup();
      localStorage.clear();
      max = this.GetRemainingSpace(function(max) {
        ApplyBackup(backup);
        cb(max);
      });
    };
  };

}).call(this);
// Generated by CoffeeScript 1.10.0
(function() {
  window.maju.prototype.on = function(el, eventName, cb) {
    el.addEventListener(eventName, cb, false);
    return el;
  };

}).call(this);
window.maju = new window.maju();
