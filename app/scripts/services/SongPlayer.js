(function(){
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentSong = null;
        var currentBuzzObject = null;
        
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
        }
        
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                /**
                * @function setSong
                * @desc Stops currently playing song and loads new audio file as currentBuzzObject
                * @params {Oject} song
                */
                setSong(song);
                currentBuzzObject.play();
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                    song.playing = true;
                }
            }
    
        };
        
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();