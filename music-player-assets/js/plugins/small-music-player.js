/**
 * Created by 23rd and Walnut for Codebasehero.com
 * www.23andwalnut.com
 * www.codebasehero.com
 * User: Saleem El-Amin
 * Date: 6/11/11
 * Time: 6:cur AM
 *
 * Version: 1.01
 * License: MIT License
 */
 var tx1=0;
 var playlist;
 var genre = $.cookie("genre");
 if(!genre){
  genre = "*";
 }
 
function changePlayAndPauseButton(a){   
    $('.mp-play').each(function(){
        if($(this).attr("song-order")!=a){
            $(this).parent().find(".mp-artists__item-credits-links .mp-play .fa").removeClass("fa-pause");
        }else{
            $(this).parent().find(".mp-artists__item-credits-links .mp-play .fa").addClass("fa-pause");
        }
    });
}

function addPlayButtonToSongName(a){
    $('.mp-play__footer.mp-play').each(function(){
        if($(this).attr("song-order")!=a){
            $(this).removeClass("mp-play__footer--active");
            
            if($(this).find(".mp-play__footer--visible")){
                $(this).find(".mp-play__footer--visible").remove();
            }

        } else {
            $(this).addClass("mp-play__footer--active");
            $(this).append("<i class='mp-play__footer--visible fa fa-volume-up'></i>");				
        }
    });					
}

window.console && console.log("[Music Player]: Initiate");
var finishedLoading = false;

function SetPlayList(g){	
    var showTimeLeft = function(event) {};
                
    window.console && console.log("[Music Player]: SetPlayList");
    playlist =[{}];
    var obj = {};
    if(g=="*")
    g = "";
    var urlt = "music-player-assets/audio/";
    $(".playlistShell .mp-artists__item ").each(function(){
        obj = {};
        obj.artist = $(this).find(".mp-play__footer > strong").html();
        obj.title = $(this).find(".mp-play__footer").html(); 		                       			
        obj.title = obj.title.replace(obj.artist,"")
        obj.title= obj.title.replace("<br/>","");
        if($(this).hasClass('pop'))
            obj.genre = "pop";     
        if($(this).hasClass('jazz'))
            obj.genre = "jazz";	
        if($(this).hasClass('rock'))
            obj.genre = "rock";
        if($(this).hasClass('country'))
            obj.genre = "country";
        if($(this).hasClass('Classical'))
            obj.genre = "Classical";
        if($(this).hasClass('country'))
            obj.genre = "country";
        if($(this).hasClass('christian'))
            obj.genre = "christian";
        if($(this).hasClass('featured'))
            obj.genre = "featured";	
        if($(this).find(".mp-play").attr('data-mus')){
            obj.mp3 = $(this).find(".mp-play").attr('data-mus');
            obj.m4a = urlt + obj.mp3+".m4a";
            obj.ogg = urlt + obj.mp3+".ogg";
            obj.mp3 = urlt+ obj.mp3 + ".mp3";
        }
        else {
            obj.mp3 = "";
            obj.m4a = "";
            obj.ogg = "";
        }
        playlist[$(this).index()] = obj;
    });

    $(".mp-artists .mp-artists__item").each(function(){
        $(this).find(".mp-play").attr("song-order", $(this).index());
    });

    //var hld = JSON.stringify(playlist);
    myPlaylist = playlist;//JSON.parse(hld);
    if(tx1==0){
        tx1++;
        var description = '';
        $('#mp-player__initialize').ttwMusicPlayer(myPlaylist, {
            autoPlay:false, 
            description:description,
            jPlayer:{
                swfPath:'/js/' //You need to override the default swf path any time the directory structure changes
            }
        });
        setTimeout("startMusicX();", 1000);
    }
} 
						
$(document).ready(function(){
    window.console && console.log("[Music Player]: Page Loaded, beginning process");
    var myPlaylist = [{}];	

    var playListHTML;
    $.get( document.location.href, function( data ) {
        playListHTML = JSON.stringify(data);
        $('body').append('<div class="playlistShell"></div>');
        $('.playlistShell').css({"display":"none"});
        var y = data;
        y = y.replace(/<img/g, "<im gnot");
        y = y.replace(/<script/g, "<sc ripped");
        //playListHTML = playListHTML.replace('isotope','musictope');
        $('.playlistShell').html(y);
        SetPlayList(genre);
        addPlayButtonToSongName(SongCount);
        
    });

    $('.mp-filters__item a').click(function(){
        genre = $(this).attr('data-filter');
        $.cookie("genre",genre);
        SetPlayList(genre);
    });		
});

var AutoPlay = false; //loaded from cookie 
var StartMusic = $.cookie("StartMusic");
var h;
var  headerPosition = $.cookie("headerPosition");

if(!headerPosition){ // if not initiated before, initiate now
	 StartMusic = "0";
}

var TrackCount = $.cookie("SongCount");
var SongCount = $.cookie("SongCount");
if(!SongCount){
	SongCount = 0;
}
  
function startMusicX(){          
	$('.small-music-player .jPlayer-container').jPlayer("pause");
	
	$('.small-music-player .jPlayer-container').jPlayer("playHead", headerPosition); //this is a hack for a FF problem, the player doesn't seem responsive to other cmmands until it's initlaized with a play command
	$('.small-music-player .jPlayer-container').jPlayer("pause");
    
    finishedLoading = true;	
    if(StartMusic=="1"){
        window.console && console.log("[Music Player] StartMusic = 1");
        $('.small-music-player .jPlayer-container').jPlayer("play");
        changePlayAndPauseButton(SongCount);
	}	
}        
        
function DisplaySeekPosition(){
var currPlaceSeekBar = $('.elapsed').css('width');
if (!currPlaceSeekBar) 
	currPlaceSeekBar = "0px"; 
    cpb = currPlaceSeekBar.slice(0,-2);
	var lengthSeekBar = $('.progress').css('width');
	if(!lengthSeekBar)
		lengthSeekBar = "1px";
	lsb = lengthSeekBar.slice(0,-2); 
	var headerPosition = cpb/lsb;
}

//$.jPlayer.platform.android = true;

var jPlayerAndroidFix = (function($) {
	window.console && console.log("[Music Player] Android Fix Initiated");
	var fix = function(id, media, options) {
		this.playFix = false;
		this.init(id, media, options);
	};
	fix.prototype = {
		init: function(id, media, options) {
			var self = this;

			// Store the params
			this.id = id;
			this.media = media;
			this.options = options;

			// Make a jQuery selector of the id, for use by the jPlayer instance.
			this.player = $(this.id);

			// Make the ready event to set the media to initiate.
			this.player.bind($.jPlayer.event.ready, function(event) {
				// Use this fix's setMedia() method.
				self.setMedia(self.media);
			});

			// Apply Android fixes
			if($.jPlayer.platform.android) {

				// Fix playing new media immediately after setMedia.
				this.player.bind($.jPlayer.event.progress, function(event) {
					if(self.playFixRequired) {
						self.playFixRequired = false;

						// Enable the contols again
						// self.player.jPlayer('option', 'cssSelectorAncestor', self.cssSelectorAncestor);

						// Play if required, otherwise it will wait for the normal GUI input.
						if(self.playFix) {
							self.playFix = false;
							$(this).jPlayer("play");
						}
					}
				});
				// Fix missing ended events.
				this.player.bind($.jPlayer.event.ended, function(event) {
					if(self.endedFix) {
						changePlayAndPauseButton(-1);
						self.endedFix = false;
						setTimeout(function() {
							self.setMedia(self.media);
						},0);
						// what if it was looping?
					}
				});
				this.player.bind($.jPlayer.event.pause, function(event) {
					if(self.endedFix) {
						var remaining = event.jPlayer.status.duration - event.jPlayer.status.currentTime;
						if(event.jPlayer.status.currentTime === 0 || remaining < 1) {
							// Trigger the ended event from inside jplayer instance.
							setTimeout(function() {
								self.jPlayer._trigger($.jPlayer.event.ended);
							},0);
						}
					}
				});
			}

			// Instance jPlayer
			this.player.jPlayer(this.options);

			// Store a local copy of the jPlayer instance's object
			this.jPlayer = this.player.data('jPlayer');

			// Store the real cssSelectorAncestor being used.
			this.cssSelectorAncestor = this.player.jPlayer('option', 'cssSelectorAncestor');

			// Apply Android fixes
			this.resetAndroid();

			return this;
		},
		setMedia: function(media) {
			this.media = media;

			// Apply Android fixes
			this.resetAndroid();

			// Set the media
			this.player.jPlayer("setMedia", this.media);
			return this;
		},
		play: function() {
			// Apply Android fixes
			if($.jPlayer.platform.android && this.playFixRequired) {
				// Apply Android play fix, if it is required.
				this.playFix = true;
			} else {
				// Other browsers play it, as does Android if the fix is no longer required.
				this.player.jPlayer("play");
			}
		},
		resetAndroid: function() {
			// Apply Android fixes
			if($.jPlayer.platform.android) {
				this.playFix = false;
				this.playFixRequired = true;
				this.endedFix = true;
				// Disable the controls
				// this.player.jPlayer('option', 'cssSelectorAncestor', '#NeverFoundDisabled');
			}
		}
	};
	return fix;
})(jQuery);
 
(function($) {
    $.fn.ttwMusicPlayer = function(playlist, userOptions) {
        var $self = this, defaultOptions, options, cssSelector, appMgr, playlistMgr, interfaceMgr,  playlist, layout, myPlaylist, current;

        cssSelector = {
            jPlayer: "#jquery_jplayer",
            jPlayerInterface: '.jp-interface',
            playerPrevious: ".jp-interface .jp-previous",
            playerNext: ".jp-interface .jp-next",
            trackList:'.tracklist',
            tracks:'.tracks',
            track:'.track',
            extraText: '.extraText',
            extraTextMusicPlayer: '.extraTextMusicPlayer',
            trackRating:'.rating-bar',
            trackInfo:'.track-info',
            rating:'.rating',
            ratingLevel:'.rating-level',
            ratingLevelOn:'.on',
            title: '.title',
            cover: '.cover',
            artistName: '.artistName',
            duration: '.duration',
            buy:'.buy',
            buyNotActive:'.not-active',
            playing:'.playing',
            moreButton:'.more',
            player:'.player',
            artist:'.artist',
            artistOuter:'.artist-outer',
            albumCover:'.img',
            description:'.description',
            descriptionShowing:'.showing'
        };

        defaultOptions = {
            ratingCallback:null,
            currencySymbol:'$',
            buyText
            :'BUY',
            tracksToShow:5,
            autoPlay:false,
            jPlayer:{}
        };

        var optionsForAndroid = {
			swfPath: "/musicplayer",
			supplied: "mp3,oga",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		};

        options = $.extend(true, {}, defaultOptions, userOptions);

        myPlaylist = playlist;
        current = 0;

        appMgr = function() {
            playlist = new playlistMgr();
            layout = new interfaceMgr();

            layout.buildInterface();
            playlist.init(options.jPlayer);

            //don't initialize the ratings until the playlist has been built, which wont happen until after the jPlayer ready event
            $self.bind('mbPlaylistLoaded', function() {
                layout.init();
            });
        };

        playlistMgr = function() {

            var playing = false, markup, $myJplayer = {},$tracks,showHeight = 0,remainingHeight = 0,$tracksWrapper, $more;

           markup = {
                listItem:
                        '<li class="track">' +
                		'<ul class="artisttext">'+
                        '<li class="artistName"></li>' +
                        '<li class="title"></li>' +
                        '<li class="extraText"></li>' +
                        '</ul>'+  
                        '</li>',
                ratingBar:''
            };

            function init(playlistOptions) {

                $myJplayer = $('.small-music-player .jPlayer-container');

                var jPlayerDefaults, jPlayerOptions;

                jPlayerDefaults = {
                    swfPath: "jquery-jplayer",
                    supplied: "mp3, oga",
                    cssSelectorAncestor:  cssSelector.jPlayerInterface,
                    errorAlerts: false,
                    warningAlerts: false
                };

                //apply any user defined jPlayer options
                jPlayerOptions = $.extend(true, {}, jPlayerDefaults, playlistOptions);

                $myJplayer.bind($.jPlayer.event.ready, function() {

                    //Bind jPlayer events. Do not want to pass in options object to prevent them from being overridden by the user
                    $myJplayer.bind($.jPlayer.event.ended, function(event) {
                        playlistNext();
                    });
				
                    
                    $myJplayer.bind($.jPlayer.event.play, function(event) {
                        $myJplayer.jPlayer("pauseOthers");
                        changePlayAndPauseButton(SongCount);
                        $.cookie("StartMusic", "1");
                        //$tracks.eq(current).addClass(attr(cssSelector.playing)).siblings().removeClass(attr(cssSelector.playing));
                    });

                    $myJplayer.bind($.jPlayer.event.playing, function(event) {
	                           
                        playing = true;
                    });

                    $myJplayer.bind($.jPlayer.event.pause, function(event) {
	                    $.cookie("StartMusic", "0");
	                    changePlayAndPauseButton(-1);
                        playing = false;
                    });

                    //Bind next/prev click events
                    $(cssSelector.playerPrevious).click(function() {
                        playlistPrev();
                        $(this).blur();
                        return false;
                    });

                    $(cssSelector.playerNext).click(function() {
                        playlistNext();
                        $(this).blur();
                        return false;
                    });
					
                     
	                 $(".mp-play").click(function(){
	                    var a = parseInt($(this).attr("song-order"));
	                    if(myPlaylist[a].genre!=genre)
	                    	genre="*";
	                    if ($(this).find(".fa-pause")[0]){
 					    	togglePlay();
						} else {
    				    	playFromClick(a);
	                   	}
	                });    

                    $self.bind('mbInitPlaylistAdvance', function(e) {
                        var changeTo = this.getData('mbInitPlaylistAdvance');

                        if (changeTo != current) {
                            current = changeTo;
                            playlistAdvance(current);
                        }
                        else {
                            if (!$myJplayer.data('jPlayer').status.srcSet) {
                                playlistAdvance(0);
                            }
                            else {
                                togglePlay();
                            }
                        }
                    });

                    buildPlaylist();
                    //If the user doesn't want to wait for widget loads, start playlist now
                    $self.trigger('mbPlaylistLoaded');

                    playlistInit(options.autoplay);
                });

                //Initialize jPlayer
                $myJplayer.jPlayer(jPlayerOptions);
            }

            function playlistInit(autoplay) {
	            current = SongCount;
                playlistAdvance(current);
            }

            function playlistConfig(index) {
                current = index;
                $myJplayer.jPlayer("setMedia", myPlaylist[current]);
            }
			
            function playlistAdvance(index) {
                SongCount = index;
                var a = parseInt(index);
	            playlistConfig(a);
	            $self.trigger('mbPlaylistAdvance');
	            if(myPlaylist[SongCount].mp3==""&&myPlaylist[SongCount].m4a=="" &&myPlaylist[SongCount].ogg==""){
					playlistNext();
				}else if("."+myPlaylist[SongCount].genre != genre && genre != "*"){
	            	playlistNext();
            	}else{
	            	if(finishedLoading){
		            	var myAndroidFix = new jPlayerAndroidFix(".small-music-player .jPlayer-container",  myPlaylist[SongCount], optionsForAndroid);
                		addPlayButtonToSongName(index);
                		changePlayAndPauseButton(index);
                		$myJplayer.jPlayer("play");
            		}
            	}
            	
            }

			function playFromClick(a){
				playlistAdvance(parseInt(a));
            }
            
            function playlistNext() {
                var index = (current + 1 < myPlaylist.length) ? current + 1 : 0;
                playlistAdvance(index);
            }

            function playlistPrev() {
                var index = (current - 1 >= 0) ? current - 1 : myPlaylist.length - 1;
                var hh = index;
                if(index==0){
	                hh = myPlaylist.length -1;
                }
                
                if(myPlaylist[index].mp3 == ""){
	                var GoTo = -1;
	                for(var gg = hh-1;gg>0; gg--){
		                if(myPlaylist[gg].m4a!=""&&GoTo==-1){
			                GoTo = gg;
			                }
		                }
		            if(GoTo==-1)
		            	GoTo=0;    
		            playlistAdvance(GoTo);
	            }else{
                	playlistAdvance(index);
            	}
            }

            function togglePlay() {
                if (!playing){
	                StartMusic="1";
	                addPlayButtonToSongName(SongCount);
	                changePlayAndPauseButton(SongCount);
                    $.cookie("StartMusic", "1");
	                $myJplayer.jPlayer("play");
                } else { 
	                changePlayAndPauseButton(-1);
                    $myJplayer.jPlayer("pause");
                    StartMusic = "0";
                    $.cookie("StartMusic", "0");
                }
            }

            function buildPlaylist() {}

            function duration(index) {
               // return !isUndefined(myPlaylist[index].duration) ? myPlaylist[index].duration : '-';
            }

            function setBuyLink($track, index) {
               // if (!isUndefined(myPlaylist[index].buy)) {
               //     $track.find(cssSelector.buy).removeClass(attr(cssSelector.buyNotActive)).attr('href', myPlaylist[index].buy).html(buyText(index));
              //  }
            }

            function buyText(index) {
              //  return (!isUndefined(myPlaylist[index].price) ? options.currencySymbol + myPlaylist[index].price : '') + ' ' + options.buyText;
            }

            return{
                init:init,
                playlistInit:playlistInit,
                playlistAdvance:playlistAdvance,
                playlistNext:playlistNext,
                playlistPrev:playlistPrev,
                togglePlay:togglePlay,
                $myJplayer:$myJplayer
            };
        };

         function trackImage(index){
	        var f;
            if (!isUndefined(myPlaylist[index].cover)){
	            f= "<img class='artistimage' src='"+myPlaylist[index].cover+"'>";
	            
                return f;}
                else return '';	        	        
	        }

        interfaceMgr = function() {
            var $player, $title, $artist, $albumCover;

            function init() {
                $player = $(cssSelector.player),
                        $title = $player.find(cssSelector.title),
                        $artist = $player.find(cssSelector.artist),
                        $albumCover = $player.find(cssSelector.albumCover);

                $self.bind('mbPlaylistAdvance mbPlaylistInit', function() {
	                setTitle();
                    setArtist();
                    
                    setCover();
                    setExtraText();
                });
            }

            function buildInterface() {
                var markup, $interface;
                //I would normally use the templating plugin for something like this, but I wanted to keep this plugin's footprint as small as possible
                markup = '<div class="small-music-player mp-controls">' +
                        '	<div class="jp-interface">' +
						'        <div class="mp-controls__player">' +
                       '<div class="time-remaining"></div>'+	
                        '            <div class="main">' +
                      '                              <i class="fa fa-backward player backward1 previous jp-previous"></i>  ' +
                        '                          <i class="fa fa-play player stop1 play jp-play"></i>         ' +
                        '                           <i class="fa fa-pause player play1 pause jp-pause"></i>              ' +
                        '                           <i class="fa fa-forward player forward1next jp-next"></i>	        ' +
                               '<!-- These controls aren\'t used by this plugin, but jPlayer seems to require that they exist -->' +
                        '                <span class="mp-hide">' +
                        '                    <span class="jp-video-play"></span>' +
                        '                    <span class="jp-stop"></span>' +
                        '                    <span class="jp-mute"></span>' +
                        '                    <span class="jp-unmute"></span>' +
                        '                    <span class="jp-volume-bar"></span>' +
                        '                    <span class="jp-volume-bar-value"></span>' +
                        '                    <span class="jp-volume-max"></span>' +
                        '                    <span class="jp-current-time"></span>' +
                        '                    <span class="jp-duration"></span>' +
                        '                    <span class="jp-full-screen"></span>' +
                        '                    <span class="jp-restore-screen"></span>' +
                        '                    <span class="jp-repeat"></span>' +
                        '                    <span class="jp-repeat-off"></span>' +
                        '                    <span class="jp-gui"></span>' +
                        '                </span>' +
                        '            </div>' +
						 '       <div class="mp-controls__progress-wrapper ">' +
                        '                <div class="mp-controls__progress jp-seek-bar">' +
                        '                    <div class="elapsed jp-play-bar"></div>' +
                        '                </div>' +
                        '        </div>' +
                        
						'<span class="mp-controls__info"><span class="artist-name"></span> </span>'+
                        '    </div>' +
                        '<div id="extraText" class="mp-hide"></div>'+
                        '    </div>' +
           				'  <div id="theTracks" class="mp-hide">'+
                        '    <div class="tracklist mp-hide">' +
                        '        <ol class="tracks"> </ol>' +
                        '        <div class="more">View More...</div>' +
                        '    </div>' +
                        ' </div> ' +
                        '    <div class="jPlayer-container "></div>' +
                        '</div>';

                $interface = $(markup).css({display:'none', opacity:0}).appendTo($self).slideDown('slow', function() {
                    $interface.animate({opacity:1});

                    $self.trigger('mbInterfaceBuilt');
                });
            }

            function setTitle() {
	            $title.html(trackName(current));
            }
			
            
            function setExtraText() {
                $('#extraText').html(trackExtraText(current));
            }
            function setArtist() {
                if (isUndefined(myPlaylist[current].artist))
                    $('.artist-name').animate({opacity:0}, 'fast');
                else {
	                $('.artist-name').animate({opacity:1}, 'fast');
                    $('.artist-name').html(myPlaylist[current].artist);
                }
            }

            function setCover() {
                $albumCover.animate({opacity:0}, 'fast', function() {
                    if (!isUndefined(myPlaylist[current].cover)) {
                        var now = current;
                        $('<img src="' + myPlaylist[current].cover + '" alt="album cover" />', this).imagesLoaded(function(){
                            if(now == current)
                                $albumCover.html($(this)).animate({opacity:1})
                        });
                    }
                });
            }

            return{
                buildInterface:buildInterface,
                init:init
            }
        };

        /** Common Functions **/
        function trackName(index) {
            if (!isUndefined(myPlaylist[index].title))
                return myPlaylist[index].title;
            else if (!isUndefined(myPlaylist[index].mp3))
                return fileName(myPlaylist[index].mp3);
            else if (!isUndefined(myPlaylist[index].oga))
                return fileName(myPlaylist[index].oga);
            else return '';
        }
		
        function trackArtist(index){
	        if (!isUndefined(myPlaylist[index].artist))
                return myPlaylist[index].artist;
            else return '';
        }
        
        function trackExtraText(index){
	        if (!isUndefined(myPlaylist[index].extraText))
                return myPlaylist[index].extraText;
            else return '';
	    }
	        
        function fileName(path) {
            path = path.split('/');
            return path[path.length - 1];
        }

        /** Utility Functions **/
        function attr(selector) {
            return selector.substr(1);
        }

        function runCallback(callback) {
            var functionArgs = Array.prototype.slice.call(arguments, 1);

            if ($.isFunction(callback)) {
                callback.apply(this, functionArgs);
            }
        }

        function isUndefined(value) {
            return typeof value == 'undefined';
        }
        appMgr();
    }; 
})(jQuery);

function SaveDataOnExit(){
    var currPlaceSeekBar = $('.elapsed').css('width');
    if(!currPlaceSeekBar)
        currPlaceSeekBar = "0px";
    cpb = currPlaceSeekBar.slice(0,-2);
    var lengthSeekBar = $('.progress').css('width');
    if(!lengthSeekBar)
        lengthSeekBar = "1px";
    lsb = lengthSeekBar.slice(0,-2); 
        headerPosition = (cpb/lsb) * 100;
        $.cookie("headerPosition", headerPosition);
        $.cookie("SongCount", SongCount); 
        //$('.small-music-player .jPlayer-container').jPlayer("pause");
    }

    $(document).ready(function(){
    
    $(window).bind('beforeunload', function(){
        SaveDataOnExit();
    //	return false;
    });
});



(function($) {
// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images

// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!

// callback function is passed the last image to load
//   as an argument, and the collection as `this`
    $.fn.imagesLoaded = function(callback) {
        var elems = this.filter('img'),
                len = elems.length;

        elems.bind('load',
                function() {
                    if (--len <= 0) {
                        callback.call(elems, this);
                    }
                }).each(function() {
            // cached images don't fire load sometimes, so we reset src.
            if (this.complete || this.complete === undefined) {
                var src = this.src;
                // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                // data uri bypasses webkit log warning (thx doug jones)
                this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                this.src = src;
            }
        });
        return this;
    };
})(jQuery);


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerCurrentlyPlaying = null;
var player_id;
var player = new Array();
var count = 0;
function onYouTubeIframeAPIReady() {		 
    $('.videoWrapper').each(function(){
        player_id = $(this).children('iframe').attr("id");
        player[count] = new YT.Player( player_id, { 
            events:
                {      
                'onStateChange': function (event) 
                    {

                    if (event.data == YT.PlayerState.PLAYING) 
                        {
			  				$(".owlStopper").trigger('owl.stop');
			                if(playerCurrentlyPlaying != null)
             	               for(i=0;i<count;i++){
	            		           if(player[i]!=event.target){player[i].stopVideo();}else{event.target.playVideo();}
	                    	     }
                             playerCurrentlyPlaying = player_id;
			 			}            
			 			playerCurrentlyPlaying = player_id;
                    }
                }        
        });
	count++;			    
    });
    
    $('iframe').each(function(){
	    var p_id = $(this).attr('id');
	    var a = new YT.Player( p_id, { 
            events:
                {      
                'onStateChange': function (event) 
                    {

                    if (event.data == YT.PlayerState.PLAYING) 
                        {
	    				$('.small-music-player .jPlayer-container').jPlayer("pause");
    					}
					}
			 	}
		});			
	});
	
	$('.popup-iframe').click(function(){
		$('.small-music-player .jPlayer-container').jPlayer("pause");
    });
}
