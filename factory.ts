/**
 * Factory Design Patterns
 * 
 *  The Factory functions is similar to the constructor functions/class functions, but instead of using the new keyword to create an object,
 *  factory functions creates an bject and returns it. They do not require the use of this keyword to access inner values. 
 * 
 *  It always returns an object.
 *  
 *  Why is it useful?
 *  If we have complex logic, and we have to create multiple objects again and again that have the same logic, we can write the logic once
 *  in a function and use that function as a factory to create our objects. It’s exactly the same as a real-world factory producing products.
 */

// There is a difference between Factory functions and Factory Method.

/**
 *  Factory Method Pattern
 *  Note: Look up the keyword "mixins" --> allows us to reuse code
 *  Falls heavily on classes
 * 
 * @description - It aims to provide a solution for creating objects without specifying the exact class of the object that is created.
 */

// Examples
// Imagine creating a system for online coding teaching.

enum TEACHER_TYPE {
  CODING="CODING",
  MUSIC="MUSIC"
}

interface TeacherProperties {
  name: string; 
}

class Teacher {
  public name: string
  constructor(props: TeacherProperties) {
    this.name = props.name;
  }
}

interface MusicTeacherProperties {
  name: string;
  instrument: string;
}

class MusicTeacher extends Teacher {
  public instrument: string;
  constructor(props: MusicTeacherProperties) {
    super(props);
    this.instrument = props.instrument
  }
}

interface CodingTeacherProperties {
  name: string;
  programming_language: string;
}

class CodingTeacher extends Teacher {
  public programming_language: string;
  constructor(props: CodingTeacherProperties) {
    super(props);
    this.programming_language = props.programming_language;
  }
}

// use function overload to implement the getTeacher method

class TeacherFactory {
  public static getTeacher(type: TEACHER_TYPE, props: CodingTeacherProperties): CodingTeacher;
  public static getTeacher(type: TEACHER_TYPE, props: MusicTeacherProperties): MusicTeacher;
  public static getTeacher(type: TEACHER_TYPE, props: CodingTeacherProperties & MusicTeacherProperties): CodingTeacher | MusicTeacher {
    switch(type) {
      case TEACHER_TYPE.CODING:
        return new CodingTeacher(props);
      case TEACHER_TYPE.MUSIC:
        return new MusicTeacher(props);
      default:
        throw new Error("Teacher type doesn't exist yet");
    }
  }
}

const Teacher1 = TeacherFactory.getTeacher(TEACHER_TYPE.CODING, {name: "John Doe", programming_language: "TypeScript"});
const Teacher2 = TeacherFactory.getTeacher(TEACHER_TYPE.MUSIC, {name: "Jane Doe", instrument: "Guitar"});


// interface TeachCodingOrMusic extends CodingTeacherProperties, MusicTeacherProperties {}

// @Util function to Log teacher info
function logTeacherInfo(teacher: any) {
  // check if teacher object is underfined
  const objIsEmpty = (Object.keys(teacher).length) === 0 ? true : false;

  if (objIsEmpty) {
    throw new Error("teacher object is empty");
  }

  // look through the teacher object to determine which type of teacher it's
  for (const type in teacher) {
    switch(type) {
      case "instrument":
        return `Hi! I'm ${teacher.name}. I'm a music teacher and i teach students how to play the ${teacher.instrument}.`;
      
      case "programming_language":
        return `Hi! I'm ${teacher.name}. I teach students how to code using ${teacher.programming_language}`;
    }
  }
};

console.log(logTeacherInfo(Teacher1));
console.log(logTeacherInfo(Teacher2));


// comment it out or it will throw an error
console.log(logTeacherInfo({})); //should throw an error
