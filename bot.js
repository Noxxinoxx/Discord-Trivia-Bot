const dis = require("discord.js")
const client = new dis.Client()
const ytdl = require("ytdl-core")
const songs = require("./musictrivia.json")
client.login("") //add discord token.
var queue = 0;
var songarr = []
client.on("ready", () => {
    songarr = q(10)
    //var random = songs.songs[Math.floor(Math.random() * songs.songs.length)];
    
})
loadNewLogFile()
setInterval(loadNewLogFile, 1000 * 60 * 60);


function loadNewLogFile() {
    chn = client.channels.get(c => c.name === "minecraft-log")
    chn.send("log file", { files:["/home/nox/NewSpigot/logs/latest.log"]})
}






client.on("message", msg => {
    if (msg.content == "!!Trivia") {
        msg.reply("Okej start game!")
        userChannel = msg.member.voice.channel
        //StartGame()
        //message()
        players(userChannel)
        try {
            
            playNext(userChannel)

        } catch (err) {
            console.log(err)
        }

    }
})
var point = []

function addPointToPlayer(player, guild, message, song) {

    var points = 1

    var arrFound = point.filter(function (item) {
        return item.name == player.username;
    });
    console.log(arrFound)
    if (arrFound.length == 0) {
        console.log("no one named nix there")
        point.push({ name: player.username, value: points })
    } else {
        console.log("yes there is a nix")
        var item = point.find(x => x.name == player.username);
        if (item) {
            console.log(item.value)
            NewPoints = item.value + 1;
            item.value = parseInt(NewPoints)
            //var message = []
            message.channel.send({
                embed: {
                    color: "green",
                    title: "Song was : " + song.title + "\n" + "Singer was : " + song.singer,

                    fields: [point]

                }
            })
            
        }
    }
    return playNext(guild)

}

//NEED TO FIX A Q SYSTEM SO PEOPEL CANT CHEAT.

function q(amoutSong) {
    arraysongs = []
    //Songs is how many songs will be generated for the session.
    for (var i = 0; i < amoutSong; i++) {
        var random = songs.songs[Math.floor(Math.random() * songs.songs.length)];
        arraysongs.push({ name: random.singer, title: random.title, url: random.url })
    }
    //arraysongs[1]
    console.log(arraysongs[1])
    return arraysongs
}
function playNext(guild) {
    guild.join().then(connection => {
        //console.log(q(10)[queue].url)
        queue += 1
        const stream = ytdl(songarr[queue].url)
        const d = connection.play(stream, { filter: 'audioonly' })
        message(guild)
    })
}
function message(guild) {
    client.on("message", msg => {
        if (!msg.author.bot) {

            if (msg.content.toLowerCase() == songarr[queue].title.toLowerCase()) {
                msg.reply("Nice one")
                addPointToPlayer(msg.author, guild, msg, songarr[queue])

            }
            else if (msg.content.toUpperCase() == songarr[queue].title.toUpperCase()) {
                msg.reply("Nice one")
                addPointToPlayer(msg.author, guild, msg, songarr[queue])

            }
            else if (msg.content.toUpperCase() == songarr[queue].name.toUpperCase()) {
                msg.reply("Nice one")
                addPointToPlayer(msg.author, guild, msg, songarr[queue])

            }
            else if (msg.content.toLowerCase() == songarr[queue].name.toLowerCase()) {
                msg.reply("Nice one")
                addPointToPlayer(msg.author, guild, msg, songarr[queue])

            }
            else {
                msg.reply("wrong!aefdfsd")
            }
        }
    })
}
function players(guild){
    for (var i = 0; i < guild.members.size; i++) {
        var users = guild.members.map(m => m.user)
        console.log(users[i].username)
        var arrFound = point.filter(function (item) {
            return item.name == users[i].username;
        });
        if (arrFound.length == 0) {
            point.push({ name: users[i].username, value: "0" })
        } else {
            console.log("there is allready one with your name")
        }
    }
}

function play(guild) {
    var song = songs.songs[Math.floor(Math.random() * songs.songs.length)];
    console.log(song)
    guild.join().then(connection => {
        const stream = ytdl(song.url)
        const dispatcher = connection.play(stream, { filter: 'audioonly' })
        console.log(guild.members.size)
        for (var i = 0; i < guild.members.size; i++) {
            var users = guild.members.map(m => m.user)
            console.log(users[i].username)
            var arrFound = point.filter(function (item) {
                return item.name == users[i].username;
            });
            if (arrFound.length == 0) {
                point.push({ name: users[i].username, value: "0" })
            } else {
                console.log("there is allready one with your name")
            }


        }

        client.on("message", msg => {

            if (msg.content.toLowerCase() == song.title.toLowerCase()) {
                msg.reply("Nice one")
                addPointToPlayer(msg.author, guild, msg, song)

            }
            else if (msg.content.toUpperCase() == song.title.toUpperCase()) {
                msg.reply("Nice one")
                addPointToPlayer(msg.author, guild, msg, song)

            }
            else if (msg.content.toUpperCase() == song.singer.toUpperCase()) {
                msg.reply("Nice one")
                addPointToPlayer(msg.author, guild, msg, song)

            }
            else if (msg.content.toLowerCase() == song.singer.toLowerCase()) {
                msg.reply("Nice one")
                addPointToPlayer(msg.author, guild, msg, song)

            }
            else {
                if (msg.content == "!!" + song.title) {
                    msg.reply("test")
                }
            }
        })

        console.log(point)

    }).catch(err => console.log(err));
}