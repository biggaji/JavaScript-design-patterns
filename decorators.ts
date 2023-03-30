/**
 * Decorators Design Pattern
 * 
 * The fundamental purpose of decorators is to attach new features and behaviors to already defined classes or methods.
 * 
 * Types of decorators
 *  - Class decorators
 *  - Method decorators
 *  - Property decorators
 *  - Accessor decorators
 *  - Parameter decorators
 */

/**
 * Class Decorators
 * 
 * We can declare a class decorator by adding it just before the class declaration. Its argument is the constructor of our class.
 */

function log(constructor: any) {
  return function(...args: any[]) {
    // Write logic here
    console.log(`New ${args[0]} ${constructor.name} created!`);
    return new constructor(...args);
  } as typeof constructor;
};

@log
class Fruit {
  constructor(public fruit_name: string) {
    this.fruit_name = fruit_name;
  }
}

new Fruit("Apple");
new Fruit("Orange");

/**
 * Method Decorators
 * 
 * We add a method decorator just before the declaration of a method. We can use it to track, alter, or replace a method definition.
 * We will be using the decorator factory approach. It involves creating a function that returns a decorator.
 * 
 * method decorator has three arguments
 * - the constructor function of the class (for a static property), or the prototype of the class (for instance property),
 * - the name of the property
 * - the description of the property  
 */

const users = [
  {
    id: 1,
    username: "0xware",
    password: "showmemore"
  },
  {
    id: 2,
    username: "biggaji",
    password: "showmegoodness"
  }
];

interface UserData {
  id: number;
  username: string;
  password: string;
}

function excludeProperties(propertiesToExclude: string[]) {
  // we need to return a decorator
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    const mainfunction = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const results = await mainfunction.apply(this, args);
      propertiesToExclude.forEach((propertyName) => {
        delete results[propertyName];
      });
      return results;
    }
  }
}


// class UserService {
//   private user: UserData[] = users;
  
//   @excludeProperties(['username'])
//   getUserInfo = async (user_id: number) => {
//     const user = await this.user.filter((user) => {
//       return user.id === user_id;
//     });

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return user;
//   }
// }

// const user = new UserService();
// console.log(user.getUserInfo(1));

/**
 * Property Decorators
 */

function logProp(target: any, propName: string) {
  console.log(`The property was ${propName} added to the class`);
};

class Yogurt {
  @logProp
  public flavour: string;

  constructor(flavour: string) {
    this.flavour = flavour;
  }
}

new Yogurt("vanila");
