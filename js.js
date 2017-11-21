var allUsers = [];
var streamers = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas'
];

var url = 'https://wind-bow.glitch.me/twitch-api/';

streamers.forEach(async function(stream) {
  var status, streamTitle, status, username, name, logo, channelUrl;
  // Check if streaming
  const response1 = await fetch(`${url}streams/${stream}`);
  const data1 = await response1.json();
  console.log(data1);

  const streaming = data1.stream === null ? false : true;
  if (streaming) {
    status = 'green fa fa-check';
    streamTitle = data1.stream.channel.status;
    if (streamTitle.length > 36) {
      streamTitle = streamTitle.substring(0, 33);
      streamTitle += '...';
    }
  } else {
    status = 'fa fa-exclamation';
    streamTitle = '';
  }
  username = stream;

  //Get user name and image

  const response2 = await fetch(`${url}users/${stream}`);
  const data2 = await response2.json();

  channelUrl = `https://www.twitch.tv/${data2._links.self.slice(36)}`;
  console.log(data2);
  name = data2.display_name;
  logo = data2.logo;

  var div = document.createElement('li');
  div.className = 'list-group-item';
  div.innerHTML = `<img src=${logo} /><a target="_blank" href=${channelUrl}>${name}  ${streamTitle}</a>\
  <i class="${status}" aria-hidden="true"></i>`;

  document.getElementById('target').appendChild(div);
});
