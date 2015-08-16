var descriptor  = Object.getOwnPropertyDescriptor,
    properties  = Object.getOwnPropertyNames,
    define_prop = Object.defineProperty;

function extend(target, source) {
  Object.getOwnPropertyNames(source).forEach(function(key) {
    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
  });
}
