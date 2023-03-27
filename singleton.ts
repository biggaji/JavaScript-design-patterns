/**
 * Singleton Design Pattern
 * 
 * It's one of the well known patterns. In its core, it restricts a class to have just one instance and ensures it to be available on a global scale.
 * It's might come in handy when you need to manage something from across your whole application.
 * 
 * Note: The term singleton comes from math and means a set with exactly one element.
 * 
 * By design, singletons create an instance of a class if it does not yet exist. Otherwise, they return the reference to an existing instance.
 */

class Singleton {
  private static instance?: Singleton

  private constructor() {
    console.log("Instance plugged in to source");
  }

  static getInstance() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = new Singleton();
    return Singleton.instance;
  }
}

// So every call to Singleton.getInstance() returns the same instance 
const instance = Singleton.getInstance();

console.log(Singleton.getInstance() === instance); // true

// Not yet familar with the use case yet, but i understand the implementation in the code example above.