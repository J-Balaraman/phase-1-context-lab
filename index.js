function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(data) {
    return data.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(dateTime) {
    if (!this.timeInEvents) {
        this.timeInEvents = [];
    }

    const [date, time] = dateTime.split(' ');
    const [hour, minutes] = time.split(':');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function createTimeOutEvent(dateTime) {
    if (!this.timeOutEvents) {
        this.timeOutEvents = [];
    }

    const [date, time] = dateTime.split(' ');
    const [hour, minutes] = time.split(':');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(rand) {
    const timeInEvents = this.timeInEvents; 
    const timeOutEvents = this.timeOutEvents;
    const timeIn = timeInEvents.find(event => event.date === rand);
    const timeOut = timeOutEvents.find(event => event.date === rand);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(date) {
    const num = hoursWorkedOnDate.call(this, date)
    const payPerHour = this.payPerHour;
    const num2 = num * payPerHour
    return parseFloat(num2.toString())
}

function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => total + allWagesFor.call(employee), 0);
    return totalPayroll;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable;
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
}