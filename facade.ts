/**
 * Facade Pattern
 * 
 * It aims to provide a simplified way to interact with multiple components by creating a single API.
 * It helps to keep our code more readable by hiding (masking) it underlying interactions.
 * 
 * The facade pattern can also help us to group generic functionalities into a more specific context.
 * 
 * The principle behind the facade design pattern is to simplify the complexity of a system by providing a simplified interface to access its functionalities.
 * 
 * The facade design pattern promotes the principle of information hiding and encapsulation.
 */

type studentType = {name: string, id?: number};

// Student database, created and emptyed at runtime
const studentDB: studentType[] = [];


enum LogAction {
  JOINED="JOINED",
  ASSIGNED_ID="ASSIGNED_ID"
}

/**
 * @class Student
 * @description Creates a new student and prints his/her info
 * @returns void
 */

class Student {
  constructor(private db: studentType[]) {
    this.db = db;
  }
  addStudent(name: string) {
    this.db.push({ name });
  }

  printStudentInfo(db: studentType[], name: string) {
    const student = this.db.find((student) => {
      return student.name === name;
    });

    if(!student) {
      return;
    }

    console.log(`STUDENT INFO:\nName: ${student.name} Id: ${student.id}\n`);
  }
}

/**
 * @class StudentLog
 * @description Generates and prints logs to the console
 * @returns void
 */
class StudentLog {
  logActivity(name: string, action: LogAction) {
    const timeStamp = new Date().toISOString();
    switch(action) {
      case LogAction.JOINED:
        console.log(`LOG: ${action}@${timeStamp} - A new student with name ${name} joined our class.`);
      break;

      case LogAction.ASSIGNED_ID:
        console.log(`LOG: ${action}@${timeStamp} - An ID was assigned to student ${name}.`);
      break;
    }
  }
}

/**
 * @class AssignStudentId
 * @description Assigns an Id to a new Student
 * @constructor
 * @param db - Student Database
 * @returns void
 */

class AssignStudentId {
  constructor(private db: studentType[]) {
    this.db = db;
  }

  assignId(name: string) {
    const ID = Math.floor(Math.random() * 1000) + 1;
    const student = this.db.find((student) => {
      return student.name === name;
    });

    if(!student) {
      return;
    }

    student.id = ID;
  }
}


// Now using the facade principle, abstract all class into a single entry point or API

/**
 * @class StudentAPI
 * @description Built using the Facade Principle, providing a sibgle accesss point to the students group of classes
 * @returns void
 */

class StudentAPI {
  constructor(private student: Student, private logger: StudentLog, private idManager: AssignStudentId, private db: studentType[]) {
    this.student = student;
    this.logger = logger;
    this.idManager = idManager;
    this.db = db;
  }

  welcomeNewStudent(name: string) {
    this.student.addStudent(name);
    this.logger.logActivity(name, LogAction.JOINED);
    this.idManager.assignId(name);
    this.logger.logActivity(name, LogAction.ASSIGNED_ID);
    this.student.printStudentInfo(this.db, name);
  }
}

const studentAPI = new StudentAPI(new Student(studentDB), new StudentLog(), new AssignStudentId(studentDB), studentDB);
studentAPI.welcomeNewStudent("Dolapo Ola");
studentAPI.welcomeNewStudent("Tobiloba Ajibade");
studentAPI.welcomeNewStudent("Temiloluwa Omoyele");
