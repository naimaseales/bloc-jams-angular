(function(){
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc Current song data that is playing or paused (number, title, duration) (private attribute)
        * @type {Object}
        */
        var currentSong = null;
        
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
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
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
        * @function SongPlayer.play (public method)
        * @desc Play current song if song is
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    };
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();