(function(){
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc access songs array (private attribute)
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Buzz object audio file (private attribute)
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong (private function)
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            /**
            * @function getSongIndex (private function)
            * @desc Get the index number of current album in songs array
            * @param song
            * @returns {Number}
            */
            var getSongIndex = function(song) {
                return currentAlbum.songs.indexOf(song);
            };
            
            /**
            * @desc Active song object from list of songs
            * @type {Object}
            */
            SongPlayer.currentSong = song;
            //SongPlayer.currentSong = null;
        };
        
        /**
        * @function playSong (private function)
        * @desc Play the current Buzz object audio file set song attribute to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @desc Current song data that is playing or paused (number, title, duration) (public attribute)
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @function SongPlayer.play (public method)
        * @desc Play current song or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                }
            }
    
        };
        
        /**
        * @function SongPlayer.pause (public method)
        * @desc Pause current Buzz object and set song.playing to false
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous (public method)
        * @desc Get the index of the currently playing song and decrease by one
        * @param {Object} SongPlayer.currentSong
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    };
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();