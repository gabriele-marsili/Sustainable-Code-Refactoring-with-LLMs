import PhoneNumber from './phone-number';

describe('PhoneNumber()', function() {
  it('cleans the number (123) 456-7890', function() {
    var phone = new PhoneNumber('(123) 456-7890');
    expect(phone.number()).toEqual('1234567890');
  });

  it('cleans numbers with dots', function() {
    var phone = new PhoneNumber('123.456.7890');
    expect(phone.number()).toEqual('1234567890');
  });

  it('valid when 11 digits and first digit is 1', function() {
    var phone = new PhoneNumber('11234567890');
    expect(phone.number()).toEqual('1234567890');
  });

  it('invalid when 11 digits', function() {
    var phone = new PhoneNumber('21234567890');
    expect(phone.number()).toEqual('0000000000');
  });

  it('invalid when 9 digits', function() {
    var phone = new PhoneNumber('123456789');
    expect(phone.number()).toEqual('0000000000');
  });

  it('has an area code', function() {
    var phone = new PhoneNumber('1234567890');
    expect(phone.areaCode()).toEqual('123');
  });

  it('formats a number', function() {
    var phone = new PhoneNumber('1234567890');
    expect(phone.toString()).toEqual('(123) 456-7890');
  });
});
