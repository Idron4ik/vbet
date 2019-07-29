import { reject } from "q";

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

(function () {


})();

function getParseDate(selector) {

  let datetime = document.querySelector(selector).innerText.split(/[. :]/g);
  let [day, month, year, h = 0, m = 0] = datetime;
  return new Date(day, month, year, h, m);
}
getParseDate();

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
        } else reject()
      }, 1000);
    });
  }

  function getParseDate(selector) {

    let datetime = selector.split(/[. :]/g);
    let [day, month, year, h = 0, m = 0] = datetime;
    let date = new Date(year, month, day, h, m);
    return date;
  }

  function getMatchesData(context) {
    let homeBox = context.document.querySelector("#flashscore .team-primary-content .home-box");
    let homePlayer = homeBox.innerText.split('.');
    let homePlayerId = homeBox.querySelector(".toggleMyTeam").classList[1].split('_')[1];

    let awayBox = context.document.querySelector("#flashscore .team-primary-content .away-box");
    let awayPlayer = awayBox.innerText.split('.');
    let awayPlayerId = awayBox.querySelector(".toggleMyTeam").classList[1].split('_')[1];

    let [name1, atp1] = homePlayer;
    let [name2, atp2] = awayPlayer;

    let header = context.document.querySelector('.headerStrip .fleft').innerText.split(',');
    let cover = header[1].split('-')[0];

    let date = getParseDate(context.document.querySelector('#utime').innerText);
    return {
      homePlayer: {
        name: name1,
        atp: atp1.split(" ")[1],
        id: homePlayerId
      },
      awayPlayer: {
        name: name2,
        atp: atp2.split(" ")[1],
        id: awayPlayerId
      },
      city: header[0],
      cover,
      date
    };
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

  async function getParseMatch(context) {
    await loaded(context, '#tab-statistics-0-statistic .statRow .statTextGroup');

    let row = context.document.querySelectorAll('#tab-statistics-0-statistic .statRow .statTextGroup');

    let statistics = [...row].map((val) => {
      let arrValue = val.querySelectorAll('.statText');
      let res = [arrValue[0].innerText, arrValue[1].innerText, arrValue[2].innerText]
      return res;
    });

    context.window.location.href = context.window.location.href.replace('#match-statistics;0', '#match-summary');
    let { homePlayer, awayPlayer, city, cover, date } = getMatchesData(context);


    await loaded(context, '#summary-content #parts tbody tr');

    let courseMatch = getShortStatic(context);
    return new Promise(resolve => resolve({
      statistics,
      courseMatch,
      homePlayer,
      awayPlayer,
      city,
      cover,
      date
    }));
  }

  let response = {};

  document.querySelector("#vbtn").onclick = async function () {

    let matches = JSON.parse(document.querySelector("#matches").value);

    let name = matches.filter((item, index)=>{
      if(index < 10) return true;
    });

    // let name =  [
    // "bPm9mveJ"
    // ];

    console.log(name);
    let context = [];

    for (let i = 0; i < name.length; i++) {
      context[i] = window.open(`https://www.myscore.com.ua/match/${name[i]}/#match-statistics;0`, name[i]);

      response[name[i]] = await getParseMatch(context[i]);
    }

    console.log(response);
  };
})();
