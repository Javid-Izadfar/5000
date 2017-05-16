const fs = require('fs');
const callArgs = process.argv.slice(2)

const desiredResult = callArgs[0] ? callArgs[0] : 'check-programmers'

let signatures = JSON.parse(fs.readFileSync('5000.json', 'utf8'))
let programmers = JSON.parse(fs.readFileSync('programmersday.json', 'utf8'))

function check_programmers() {
  
  let identicals = []
  console.log('There were', programmers.name.length, 'programmers whom signed programmersDay.ir ...')

  for (let groups of Object.keys(signatures)) {
    for (let person = 0; person < signatures[groups].supporters.length; person++) {
      for (let programmer = 0; programmer < programmers.name.length; programmer++) {
        if (programmers.name[programmer].replace(/\s/g, '') === signatures[groups].supporters[person].replace(/\s/g, '')) {
          identicals.push(signatures[groups].supporters[person] + ' (' + signatures[groups].group_name + ')' + '\n')
        }
      }
    }
  }

  console.log('We\'ve found', identicals.length, 'signatures identical to that site\'s ...')
  export_list('identicals', identicals)

}

function export_list(name, list) {
  fs.writeFile( name + '.txt', list , function (err) {
      if (err) return console.log(err)
      console.log('Their names were saved in \'' + name + '.txt\' file')
  });
}

if (desiredResult === 'check-programmers'){
  check_programmers()
} else {
  console.log('Sorry, I can\'t do that :(')
}

