/**
 * @name SongWidgetComponent
 * @desc SongWidgetComponent component
 */

'use strict';

var SpotifyUtility = require('../utility/SpotifyUtility');
var Annyang = require('annyang');

var SongWidgetComponent = function () {

  (function() {
    var audio = new Audio(),
        spotifyApi = new SpotifyUtility();

    function playSong (songName, artistName) {
      var query = songName;
      if (artistName) {
        query += ' artist:' + artistName;
      }
      spotifyApi.searchTracks(query).then(function(response) {
        if (response.tracks.items.length) {
          var track = response.tracks.items[0];
          audio.src = track.preview_url;
          audio.play();
          communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><img width="150" src="' + track.album.images[1].url + '">');
        }
      });
    }

    function communicateAction (text) {
      var rec = document.getElementById('conversation');
      rec.innerHTML += '<div class="action">' + text + '</div>';
    }

    function recognized (text) {
      var rec = document.getElementById('conversation');
      rec.innerHTML += '<div class="recognized"><div>' + text + '</div></div>';
    }

    if (annyang) {
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = {
        'stop': function() {
          audio.pause();
        },
        'play track *song': function(song) {
          recognized('Playing track ' + song);
          playSong(song);
        },
        'play *song by *artist': function(song, artist) {
          recognized('Playing song ' + song + ' by ' + artist);
          playSong(song, artist);
        },
        'play song *song': function(song) {
          recognized('Playing song ' + song);
          playSong(song);
        },
        'play *song': function(song) {
          recognized('Playing ' + song);
          playSong(song);
        },

        ':nomatch': function (message) { recognized(message); communicateAction('Sorry, I don\'t understand this action'); }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();
    }

    annyang.addCallback('error', function() { communicateAction('error'); });
  })();

  return {
    template: '<div id="commands><h1>Play songs through voice commands</h1><p>This demo uses speech recognition and the <a href="https://developer.spotify.com/web-api/">Spotify Web API</a> to play songs. Try it using some of the commands below. Remember to allow the use of the microphone.</p><p>For instance "Play Some Nights"</p><h2>Voice commands</h2><ul><li>Play {song name}</li><li>Play {song name} by {artist name}</li></ul></div><div id="conversation"></div>'
    /*template: '<div class="content"<div class="icon"></div<span<h1 i18n-content="incognitoTabHeading">Title</h1<p><span i18n-values=".innerHTML:incognitoTabDescription">Pages you view in incognito tabs won’t stick around in your browser’s history, cookie store, or search history after you’ve closed <strong>all</strong> of your incognito tabs. Any files you download or bookmarks you create will be kept.</span><a i18n-content="learnMore" i18n-values=".href:learnMoreLink" href="https://support.google.com/chrome/?p=incognito">Learn more about incognito browsing</a></p><p><strong i18n-content="incognitoTabWarning">Going incognito doesn’t hide your browsing from your employer, your internet service provider, or the websites you visit.</strong></p></span></div>'*/
  };
};

module.exports = SongWidgetComponent;
