import LinkedList from './linked-list';

describe('LinkedList', function () {
  it('push/pop', function () {
    var list = new LinkedList();
    list.push(10);
    list.push(20);
    expect(list.pop()).toBe(20);
    expect(list.pop()).toBe(10);
  });
  it('push/shift', function () {
    var list = new LinkedList();
    list.push(10);
    list.push(20);
    expect(list.shift()).toBe(10);
    expect(list.shift()).toBe(20);
  });
  it('unshift/shift', function () {
    var list = new LinkedList();
    list.unshift(10);
    list.unshift(20);
    expect(list.shift()).toBe(20);
    expect(list.shift()).toBe(10);
  });
  it('unshift/pop', function () {
    var list = new LinkedList();
    list.unshift(10);
    list.unshift(20);
    expect(list.pop()).toBe(10);
    expect(list.pop()).toBe(20);
  });
  it('example', function () {
    var list = new LinkedList();
    list.push(10);
    list.push(20);
    expect(list.pop()).toBe(20);
    list.push(30);
    expect(list.shift()).toBe(10);
    list.unshift(40);
    list.push(50);
    expect(list.shift()).toBe(40);
    expect(list.pop()).toBe(50);
    expect(list.shift()).toBe(30);
  });
  it('pops undefined when there are no elements', function () {
    var list = new LinkedList();
    expect(list.pop()).toBe(undefined);
  });
  it('can count its elements', function () {
    var list = new LinkedList();
    expect(list.count()).toBe(0);
    list.push(10);
    expect(list.count()).toBe(1);
    list.push(20);
    expect(list.count()).toBe(2);
  });
  it('deletes the last element from the list', function () {
    var list = new LinkedList();
    list.push(10);
    list.push(20);
    list.push(30);
    list.delete(20);
    expect(list.count()).toBe(2);
    expect(list.pop()).toBe(30);
    expect(list.shift()).toBe(10);
  });
  it('deletes the only element', function() {
    var list = new LinkedList();
    list.push(10);
    list.delete(10);
  });
});
