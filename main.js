$(document).ready(function () {
  $("#song1").hover(function(){
    $('.a').removeClass('hidden');
}, function(){
    $('.a').addClass('hidden');
});
$("#song2").hover(function(){
    $('.b').removeClass('hidden');
}, function(){
    $('.b').addClass('hidden');
});
$("#song3").hover(function(){
    $('.c').removeClass('hidden');
}, function(){
    $('.c').addClass('hidden');
});
$("#song4").hover(function(){
    $('.e').removeClass('hidden');
}, function(){
    $('.e').addClass('hidden');
});
$("#song5").hover(function(){
    $('.f').removeClass('hidden');
}, function(){
    $('.f').addClass('hidden');
});
    var songsinfo =[];
    $.ajax({
        url:'https://jsonbin.io/b/59f713154ef213575c9f652f',
        method:'GET',
        dataType:'json',
        beforeSend: function () {
            $('#loader').show();
        },
        success: function (data) {
            songsinfo = data;
            init();
            $('#loader').hide();
        },
        'error': function(data) {
          alert('Sorry the songs could not be fetched!! Please try again');
          $('#loader').hide();
        }
      });
    function init() {
        const song =$('audio')[0];
        function togglemusic() {
            if(song.paused) {
                song.play();
                $('.clickable').addClass('fa-pause').removeClass('fa-play');

            }
            else {
                song.pause();
                $('.clickable').addClass('fa-play').removeClass('fa-pause');

            }
        }



        function fancyTimeFormat(time) {
          var hrs = ~~(time / 3600);
          var mins = ~~((time % 3600) / 60);
          var secs = time % 60;
          var ret = "";
          if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
          }
          ret += "" + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs;
          return ret;
        }

        function updateCurrentTime() {
          var song = document.querySelector('audio');
          var currentTime = Math.floor(song.currentTime);
          var duration = Math.floor(song.duration);
          var remainingTime = duration - currentTime;
          currentTime = fancyTimeFormat(currentTime);
          duration = fancyTimeFormat(duration);
          remainingTime = fancyTimeFormat(remainingTime);
          console.log(currentTime);
          $('.time-elapsed').text(currentTime);
          $('.song-duration').text(duration);
          $('.time-left').text(remainingTime);
        }
        updateCurrentTime();
        setInterval(updateCurrentTime, 1000);

        $('.input-wrapper form').on('submit' , function (event) {
            event.preventDefault();
            var name = $('#name-input').val();
            if(name.length > 2){
              var message = "Welcome, " + name;
              $('.main .user-name').text(message);
              $('.welcome-screen').addClass('hidden');
              $('.main').removeClass('hidden');
            }else {
              $('#name-input').addClass('error');
              $('#error-text').removeClass('hidden');
            }

            $('.total-songs').html('Songs:'+ songsinfo.length);
        });

        $('.play-icon').on('click', function(){
          togglemusic();
        });

        $('.play-all').on('click', function(){
          $('.click').addClass('fa-pause-circle').removeClass('fa-play-circle');
          var ad = document.querySelector('audio');
          i = 0;
          var playlist = new Array('song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3');
          var gn = [{"album":"Badrinath ki Dulhania","name":"Badri Ki Dulhania (Title Track)","image":"https://i.imgur.com/rj1EoV8.jpg"},
          {"album":"Ok Jaanu","name":"Humma Song","image":"https://i.imgur.com/MBTAyRP.jpg"},
          {"album":"Befikre","name":"Nashe Si Chadh Gyi","image":"https://i.imgur.com/oxMLCVS.jpg"},
          {"album":"Ae Dil Hai Mushkil","name":"The Breakup Song","image":"https://i.imgur.com/93iwrF1.jpg"}];
          ad.addEventListener('ended', function () {
          i = ++i < playlist.length ? i : 0;
          console.log(i)
          ad.src = playlist[i];
          ad.play();
          }, true);
          ad.volume = 0.3;
          ad.loop = false;
          ad.src = playlist[0];
          ad.play();

          
        });


        $('.main header>#logout').on('click' , function () {
            $('.main').addClass('hidden');
            $('.welcome-screen').removeClass('hidden');
            $('#name-input').val('');
            $('#name-input').removeClass('error');
            $("#error-text").addClass('hidden');
            song.pause();
        });

        $('body').on('keypress', function(e){
          if(e.keyCode == 32 || e.keyCode == 112){
            togglemusic();
          }
        });


        $('#replace-song').on('click', function (){
          var songName = $('#song-name-input');
          var songArtist = $('#song-artist-input');
          var songAlbum = $('#song-album-input');
          var songDuration = $('#song-duration-input');
          var songURL = $('#song-url-input');
          var songVideo = $('#song-video-input');
          var songLyrics = $('#song-lyrics-input');
          var songImage = $('#song-image-input');

          songsinfo[4] = {
            'name': songName.val(),
            'artist': songArtist.val(),
            'album': songAlbum.val(),
            'duration': songDuration.val(),
            'fileName': songURL.val(),
            'videoLink': songVideo.val(),
            'lyricsLink': songLyrics.val(),
            'image': songImage.val()
          };

          songName.val('');
          songArtist.val('');
          songAlbum.val('');
          songDuration.val('');
          songURL.val('');
          songVideo.val('');
          songLyrics.val('');
          songImage.val('');
          setupApp();

        });

        for ( var i=0; i<songsinfo.length; i++) {
            var obj = songsinfo[i];
            var name = '#song' + (i+1);
            var audio = $(name);
            audio.find(' .song-name').text(obj.name);
            audio.find(' .song-artist').text(obj.artist);
            audio.find(' .song-album').text(obj.album);
            audio.find(' .song-length').text(obj.duration);
            audio.find(' .song-video-link').html('<a target="_blank" href="' + obj.videoLink +'"> Watch Video </a>');
            audio.find(' .song-lyrics-link').html('<a target="_blank" href="' + obj.lyricsLink +'"> See Lyrics </a>');
        }

        function changeCurrentSongDetails(songObj){
          for ( var i=0; i<songsinfo.length; i++) {
              var obj = songsinfo[i];
              var name = '#song' + (i+1);
              var audio = $(name);
              audio.find(' .song-name').text(obj.name);
              audio.find(' .song-artist').text(obj.artist);
              audio.find(' .song-album').text(obj.album);
              audio.find(' .song-length').text(obj.duration);
              audio.find(' .song-video-link').html('<a target="_blank" href="' + obj.videoLink +'"> Watch Video </a>');
              audio.find(' .song-lyrics-link').html('<a target="_blank" href="' + obj.lyricsLink +'"> See Lyrics </a>');
          }
          $('.current-song-image').attr('src', songObj.image);
          $('.current-song-name').text(songObj.name);
          $('.current-song-album').text(songObj.album);
        }


                function setupApp(){
                  changeCurrentSongDetails(songsinfo[0]);
                  setInterval(function() {
                    updateCurrentTime();
                  });
                  setInterval(function() {
                    updateCurrentSong();
                  });
                }

        $('#submit-song button').on('click', function(){
          var song_url = $('#add-song').val();
          if(song_url != ""){
            song_url = "";
            alert("Song submitted successfully");
          }
          else {
            $('#add-song').addClass('error');
          }
        });

        function somefunction(id , index) {
            $(id).on('click', function () {
                if (song.src.search(songsinfo[index].fileName) === -1){
                    song.src = songsinfo[index].fileName;
                    var current_song= $('.current-song-wrapper');
                    current_song.find('img').attr('src', songsinfo[index].image);
                    current_song.find(' .current-song-album').text(songsinfo[index].album);
                    current_song.find(' .current-song-name').text(songsinfo[index].name);

                    togglemusic();
                }else {
                    togglemusic();

                }
            });
        }
        for (var i=1 ;i<=songsinfo.length;i++){
            somefunction('#song'+ i, i-1);
        }

        function pg() {
            var fs = songsinfo[0];
            song.src= fs.fileName;
            var current_song= $('.current-song-wrapper');
            current_song.find('img').attr('src', fs.image);
            current_song.find(' .current-song-album').text(fs.album);
            current_song.find(' .current-song-name').text(fs.name)
        }
        pg();
    }
    var i = 1;
    function updateCurrentSong(){
      var audio = document.querySelector('#all');
      if(audio.currentTime == audio.duration){
        audio.src = "song" + (i+1).toString() + ".mp3";
        i++;
        audio.play();
      }
      if(i>4){
        i=1;
        audio.src = "song" + (i).toString() + ".mp3";
        audio.play();
      }
    }
});
