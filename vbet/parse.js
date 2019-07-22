
let getParseIdLeague = function () {
  let elems = document.querySelectorAll('#live-table .event__match');

  var result = [...elems].map(function (item) {
    return item.id;
  });
  return result;
};
console.log(getParseIdLeague());



function getParseIdPlayer() {
  let elem = document.querySelector('.team-header .toggleMyTeam');

  return elem.className.split('_')[1];
}
getParseIdPlayer();

function getParseNamePlayer() {
  let elem = document.querySelector('#fscountry #fscon .page-tabs .ifmenu .li0 a');

  return elem.href.split('/')[4];
}

getParseNamePlayer();






function getParseDate(selector) {

  let datetime = document.querySelector(selector).innerText.split(/[. :]/g);
  let [day, month, year, h = 0, m = 0] = datetime;
  return new Date(day, month, year, h, m);
}


getParseDate();

function getParseMatchName() {
  return document.querySelector('.headerStrip .fleft').innerText;
}

getParseMatchName();




function getParseTotal() {

  let bookmaker = document.querySelectorAll('#block-under-over-ft table');

  return [...bookmaker].map((item) => {
    return parseFloat(item.id.split('odds_ou_')[1]);
  });

}


getParseTotal();


(function () {
  function getDate(datetime) {
    if (datetime.indexOf(' ') + 1) {
      datetime = datetime.split(' ')[0] + '2019 ' + datetime.split(' ')[1];
    }

    let date = new Date(datetime.replace(/(\d{2}).(\d{2}).(\d{4})/, "$2/$1/$3"));

    return date;
  }
  
  let getParseIdGame = function () {
    let elems = document.querySelectorAll('#live-table .event__match');

    let result = [];

    [...elems].forEach(function (item) {
      let datetime = item.querySelector('.event__time').innerText;

      let date = getDate(datetime);

      if (date.getFullYear() === 2019) {
        result.push(item.id.split('_2_')[1]);
      }
    });
    return result;
  }
  console.log(getParseIdGame());
})();


(function () {
  function createOverlay() {
    let wrapper = document.createElement("div");

    wrapper.classList = 'vbet';

    wrapper.style = `
      position: fixed;
      left: 5px;
      top: 5px;
      bottom: 5px;
      right: 5px;
      padding: 25px;
      border-radius: 10px;
      border: 1px solid black;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10000;
    `;
    let content = `
      <textarea id="matches" style="width: 100%; height: 80px"></textarea> <br>
      <button id="vbtn" style="padding: 20px 35px">start</button>
    `;

    wrapper.innerHTML = content;
    document.body.appendChild(wrapper);
  }
  createOverlay();

  async function loaded(context, selector) {
    return await new Promise(resolve => {
      let timer = setInterval(() => {
        let row = context.document.querySelectorAll(selector);
        if (row.length > 0) {
          clearInterval(timer);
          return resolve();
        }
      }, 1000);
    });
  }

  function getShortStatic(context) {
    let elem = context.document.querySelectorAll('#summary-content #parts tbody tr');
    let board = [...elem].map((item) => {
      return item.innerText;
    });

    board.shift();
    return board.map((item) => {
      return item.split(/\([0-9]\)/g);
    });
  }

  async function getParseStatistics(context) {
    await loaded(context, '#tab-statistics-0-statistic .statRow .statTextGroup');
    let row = context.document.querySelectorAll('#tab-statistics-0-statistic .statRow .statTextGroup');


    let statistics = [...row].map((val) => {
      let arrValue = val.querySelectorAll('.statText');
      let res = [arrValue[0].innerText, arrValue[1].innerText, arrValue[2].innerText]
      return res;
    });
    console.log(statistics);
    context.window.location.href = context.window.location.href.replace('#match-statistics;0', '#match-summary');
    await loaded(context, '#summary-content #parts tbody tr');

    let courseMatch = getShortStatic(context);
    return new Promise(resolve => resolve({ statistics, courseMatch  }));

    // return data;
  }



  let response = [];

  document.querySelector("#vbtn").onclick = async function () {

    let matches = document.querySelector("#matches").value;
    console.log(matches);

    let name = [
      "fyXBxdlb",
      "WQR97Wkf",
      "63QkVFVe",
    ];

    for (let i = 0; i < name.length; i++) {
      name[i] = window.open(`https://www.myscore.com.ua/match/${name[i]}/#match-statistics;0`, name[i]);

      response.push(await getParseStatistics(name[i]));
    }

    console.log(response);

  };
})();