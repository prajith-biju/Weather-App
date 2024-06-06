const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function findingFirstDayOfMonth(date, dayNum) {
  const remain = date % 7;

  for (let i = remain; i > 1; i--) {
    dayNum--;
    if (dayNum < 0) {
      dayNum = 6;
    }
  }
  return days[dayNum];
}

function testFuntion() {
  const testCase = [
    {
      // test 1
      date: 17,
      day: 3,
      expected: "Monday",
    },
    {
      // test 2
      date: 26,
      day: 4,
      expected: "Sunday",
    },
    {
      // test 3
      date: 16,
      day: 1,
      expected: "Sunday",
    },
    {
      // test 4
      date: 31,
      day: 2,
      expected: "Sunday",
    },
    {
      // test 5
      date: 4,
      day: 3,
      expected: "Sunday",
    },
    {
      // test 6
      date: 2,
      day: 4,
      expected: "Wednesday",
    },
    {
      // test 7
      date: 1,
      day: 3,
      expected: "Wednesday",
    },
    {
      // test 8
      date: 4,
      day: 6,
      expected: "Wednesday",
    },
    {
      // test 9
      date: 5,
      day: 0,
      expected: "Wednesday",
    },
    {
      // test 10
      date: 24,
      day: 5,
      expected: "Wednesday",
    },
  ];
  for (let i = 0; i < testCase.length; i++) {
    let got = findingFirstDayOfMonth(testCase[i].date, testCase[i].day);
    if (got === testCase[i].expected) {
      console.log(`Test case ${i + 1} passed`);
    } else {
      console.log(`Test case ${i + 1} failed`);
    }
  }
}
testFuntion();
