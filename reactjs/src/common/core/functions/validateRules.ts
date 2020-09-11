export function validatorCode(value: any, validator: any, $field: any) {
  var reg = /^[\d\w_]+$/;
  return reg.test(value);
}
