var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var saltRound = 10;
var users = [];

var conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '@Gundam00',
    database: 'html5'
});
conn.connect();

app.use('/', express.static(__dirname + '/client'));

var players = [];
var maps = [];
var rooms = [];
var online_cnt = 0;

io.on('connection', function (socket) {
    io.emit("online_cnt", online_cnt + " Online");
    socket.on("mov", function (data) {
        if (typeof socket.len == "undefined") {
            console.log("error catch:33");
            socket.emit("mula");
        }
        else {
            if (typeof players[socket.len] == "undefined") {
                console.log("error catch: 34");
                socket.emit("mula");
            }
            else {
                var target_user = socket.userid;
                if (typeof data.id !== "undefined") {
                    target_user = data.id;
                }
                players[socket.len].x = Number(data.x);
                players[socket.len].y = Number(data.y);
                io.to(socket.curr_room).emit("mov", { uid: target_user, x: Number(data.x), y: Number(data.y) });
            }
        }
    });

    socket.on("delete_room", function () {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            conn.query("SELECT uid FROM rooms WHERE id = " + conn.escape(socket.curr_room), function (err, result) {
                if (result[0].uid == socket.userid) {
                    //pick all furni
                    conn.query("UPDATE furnis SET room_id = '0' WHERE room_id = " + conn.escape(socket.curr_room));
                    conn.query("DELETE FROM rooms WHERE id = " + conn.escape(socket.curr_room));
                    io.to(socket.curr_room).emit("home_room");
                    io.to(socket.curr_room).emit('send_msg', {
                        msg: "Room deleted.",
                        own: "@SYSTEM"
                    });
                    socket.emit('send_msg', {
                        msg: "Your furni now in your inventory.",
                        own: "@SYSTEM"
                    });
                }
            });
        }
        else {
            socket.emit("mula");
        }
    });

    socket.on("pickfurni", function (data) {
        if (typeof socket.len != "undefined") {
            conn.query("SELECT uid FROM rooms WHERE id = " + conn.escape(socket.curr_room), function (err, res) {
                if (res[0].uid == socket.userid) {
                    conn.query("UPDATE furnis SET room_id = '0' WHERE room_id = " + conn.escape(socket.curr_room) + " AND id = " + conn.escape(data.id), function () {
                        var tmp_player = [];
                        players.filter(function (curr) {
                            if (curr.room == socket.curr_room) { tmp_player.push(curr); }
                        });
                        io.to(socket.curr_room).emit("updateroom", tmp_player);
                        conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, items.state AS state, furnis.x AS x, furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(socket.curr_room), function (err, res2) {
                            io.to(socket.curr_room).emit("place_furni", res2);
                        });
                    });
                }
            });
        }
        else {
            socket.emit("mula");
        }
    })

    socket.on("place_furni", function () {
        if (typeof socket.len != "undefined") {
            var tmp_player = [];
            players.filter(function (curr) {
                if (curr.room == socket.curr_room) { tmp_player.push(curr) }
            });
            io.to(socket.curr_room).emit("updateroom", tmp_player);

            conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, items.state AS state, furnis.x AS x, furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(socket.curr_room), function (err, res) {
                io.to(socket.curr_room).emit("place_furni", res);
            });
        }
        else {
            socket.emit("mula");
        }
    });

    socket.on("mov_update", function (data) {
        if (data.ses == socket.id) {
            players[socket.len].x = Number(data.x);
            players[socket.len].y = Number(data.y);
            var tmp_player = [];
            players.filter(function (curr) {
                if (curr.room == socket.curr_room) { tmp_player.push(curr) }
            });
            io.to(socket.curr_room).emit("updateroom", tmp_player);
        }
    });

    socket.on('open_shop', function () {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            conn.query("SELECT * FROM shop_pages ORDER BY `order` ASC", function (err, res) {
                socket.emit('open_shop', res);
            });
        }
        else {
            socket.emit("mula");
        }
    });
    socket.on('open_shop_page', function (data) {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            socket.emit("open_shop_page", "clear");
            conn.query("SELECT shop_items.id AS id, shop_items.name AS name, shop_items.price AS price, items.img AS img FROM shop_items JOIN items ON shop_items.fid = items.id WHERE shop_items.pid = " + conn.escape(data), function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    socket.emit("open_shop_page", { id: res[i].id, name: res[i].name, img: res[i].img, price: res[i].price });
                }
                if (res.length == 0) {
                    socket.emit("open_shop_page", { id: "", name: "No item", img: "80a0573fad53d67.png", price: "" });
                }
            });
        }
        else {
            socket.emit("mula");
        }
    });

    socket.on('buy_item', function (data) {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            conn.query("SELECT * FROM shop_items WHERE id = " + conn.escape(data), function (err, result) {
                if (socket.credits > result[0].price) {
                    socket.emit("buy_item", { status: 1, id: data, name: result[0].name, price: result[0].price });
                }
                else {
                    socket.emit("buy_item", { status: 0, id: data.id, name: result[0].name, price: result[0].price });
                }
            });
        }
        else {
            socket.emit("mula");
        }
    });

    socket.on("buy_", function (data) {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            conn.query("SELECT fid, price FROM shop_items WHERE id = " + conn.escape(data), function (err, res) {
                if (socket.credits > res[0].price) {
                    socket.credits -= res[0].price;
                    conn.query("UPDATE users SET credits = " + conn.escape(socket.credits) + " WHERE id = " + conn.escape(socket.userid));
                    conn.query("INSERT INTO furnis (uid, item_id) VALUES (" + conn.escape(socket.userid) + ", " + conn.escape(res[0].fid) + ")");
                    conn.query("SELECT credits FROM users WHERE id = " + conn.escape(socket.userid), function (err1, res1) {
                        socket.emit("update_credits", socket.credits);
                    });
                }
            });
        }
        else {
            socket.emit("mula");
        }
    });

    socket.on("open_inventory", function () {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            var last_furni = 0;
            var count = 0;
            conn.query("SELECT * FROM furnis JOIN items ON furnis.item_id = items.id WHERE uid = " + conn.escape(socket.userid) + " AND room_id = '0' ORDER BY furnis.item_id", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    if (last_furni != res[i].id) {
                        res[i].mode = "add";
                        res[i].count = 1;
                        last_furni = res[i].id;
                        count = 1;
                    }
                    else {
                        res[i].mode = "edit"
                        count++;
                        res[i].count = count;
                    }
                    socket.emit("inventory_item", res[i]);
                }
            });
        }
        else {
            socket.emit("mula");
        }
    });

    socket.on('goto_room', function (data) {

        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            var old_room = socket.curr_room;

            //set current user's current room
            players[socket.len].room = data;

            rooms[socket.curr_room].cnt--;
            if (rooms[socket.curr_room].cnt == 0) {
                delete rooms[socket.curr_room];
            }

            //just to arrange user where user in the same room (before change room)
            var tmp_player = [];
            players.filter(function (curr) {
                if (curr.room == socket.curr_room) {
                    tmp_player.push(curr);
                }
            });
            io.to(socket.curr_room).emit('updateroom', tmp_player);


            //leaving room
            socket.leave(socket.curr_room);


            conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, items.state AS state, furnis.x AS x, furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(old_room), function (err, res_furni) {
                io.to(old_room).emit("place_furni", res_furni);
            });

            io.to(old_room).emit("debug");

            conn.query("SELECT name, maps, door, uid FROM rooms WHERE id = " + conn.escape(data), function (error, result) {
                socket.emit("change_room", { maps: result[0].maps });

                var door_ = result[0].door.split(",");
                var door_x = Number(door_[0]);
                var door_y = Number(door_[1]);
                players[socket.len].x = door_x;
                players[socket.len].y = door_y;

                if (socket.userid == result[0].uid) {
                    socket.own_room = true;
                    players[socket.len].own_room = true;
                }
                else {
                    socket.own_room = false;
                    players[socket.len].own_room = false;
                }

                socket.curr_room = data;
                socket.join(data);

                if (typeof rooms[socket.curr_room] == "undefined") {
                    rooms[socket.curr_room] = {
                        id: data,
                        name: result[0].name,
                        cnt: 1
                    }
                }
                else {
                    rooms[socket.curr_room].cnt++;
                }

                var tmp_player = [];
                players.filter(function (curr) {
                    if (curr.room == socket.curr_room) { tmp_player.push(curr) }
                });
                io.to(socket.curr_room).emit('updateroom', tmp_player);
            });
        }
        else {
            socket.emit("mula");
        }
    });

    socket.on('create_room', function (data) {
        if (socket.userid) {
            if (data.name) {
                if (data.width >= 3 && data.width <= 15) {
                    if (data.height >= 3 && data.height <= 15) {
                        socket.tmp_map1 = "";
                        socket.tmp_map = "";
                        for (var i = 0; i < data.height; i++) {
                            if (i == (data.height - 1)) {
                                socket.tmp_map1 += "1#";
                            }
                            else {
                                socket.tmp_map1 += "1,";
                            }
                        }
                        for (var i = 0; i < data.width; i++) {
                            socket.tmp_map += socket.tmp_map1;
                        }
                        conn.query("INSERT INTO rooms (name, uid, maps) VALUES (" + conn.escape(data.name) + ", '" + conn.escape(socket.userid) + "'," + conn.escape(socket.tmp_map) + ")");
                    }
                }

            }
        }
        else {
            socket.emit("err", "Please refresh");
        }
    });

    socket.on('request_room', function (data) {
        if (socket.userid) {
            socket.emit('request_room', {
                clear: 1
            });
            if (data.type == "my") {
                conn.query("SELECT * FROM rooms WHERE uid = " + conn.escape(socket.userid), function (err, res) {
                    if (res.length == 0) {
                        socket.emit('request_room', {
                            type: "my",
                            id: 0,
                            name: 'No room yet'
                        });
                    }
                    else {
                        for (var i = 0; i < res.length; i++) {
                            socket.emit('request_room', {
                                type: "my",
                                id: res[i].id,
                                name: res[i].name
                            });
                        }
                    }

                });
            }
            if (data.type == "all") {
                var tmp_room = [...rooms];
                tmp_room.sort(function (a, b) { return a.cnt - b.cnt });
                for (var i = 0; i < tmp_room.length; i++) {
                    if (tmp_room[i]) {
                        socket.emit('request_room', {
                            type: "all",
                            id: tmp_room[i].id,
                            name: tmp_room[i].name,
                            cnt: tmp_room[i].cnt
                        });
                    }

                }
            }
            if (data.type == "public") {
                conn.query("SELECT * FROM rooms WHERE public = '1'", function (error, result) {
                    for (var i = 0; i < result.length; i++) {
                        socket.emit('request_room', {
                            type: "public",
                            id: result[i].id,
                            name: result[i].name
                        })
                    }
                });
            }
        }
        else {
            socket.emit("err", "Please refresh");
        }

    });

    socket.on('send_msg', function (data) {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            if (data.startsWith("/door")) {
                conn.query("SELECT uid FROM rooms WHERE id = " + conn.escape(socket.curr_room), function (err, res) {
                    if (res[0].uid == socket.userid) {
                        var location = players[socket.len].x + "," + players[socket.len].y;
                        conn.query("UPDATE rooms SET door = " + conn.escape(location) + " WHERE id = " + conn.escape(socket.curr_room));
                        socket.emit('send_msg', {
                            msg: "Your door set",
                            own: "@SYSTEM"
                        });
                    }
                })
            }
            else if (data.startsWith("/look")) {
                var look_arr = data.split(" ");
                var look_num = look_arr[1];
                socket.noerror = true;
                if (look_num == "1") {
                    socket.skin = "spaghetti_atlas_01";
                }
                else if (look_num == "2") {
                    socket.skin = "spaghetti_atlas_02";
                }
                else if (look_num == "3") {
                    socket.skin = "spaghetti_atlas_03";
                }
                else if (look_num == "4") {
                    socket.skin = "spaghetti_atlas_04";
                }
                else if (look_num == "5") {
                    socket.skin = "spaghetti_atlas_05";
                }
                else if (look_num == "6") {
                    socket.skin = "unicorn_atlas_01";
                }
                else if (look_num == "7") {
                    socket.skin = "unicorn_atlas_02";
                }
                else if (look_num == "8") {
                    socket.skin = "unicorn_atlas_03";
                }
                else if (look_num == "9") {
                    socket.skin = "unicorn_atlas_04";
                }
                else if (look_num == "10") {
                    socket.skin = "unicorn_atlas_05";
                }
                else {
                    socket.noerror = false;
                    socket.emit('send_msg', {
                        msg: "/look Number example /look 3 (1 - 10)",
                        own: "Error"
                    });
                }
                if (socket.noerror) {
                    conn.query("UPDATE users SET skin = " + conn.escape(socket.skin) + " WHERE id = " + socket.userid);
                }

                //update look
                players[socket.len].skin = socket.skin;
                var tmp_player = [];
                players.filter(function (curr) {
                    if (curr.room == socket.curr_room) { tmp_player.push(curr) }
                });
                io.to(socket.curr_room).emit("updateroom", tmp_player);

                conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, items.state AS state, furnis.x AS x, furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(socket.curr_room), function (err, res) {
                    io.to(socket.curr_room).emit("place_furni", res);
                });

            }
            else if (data.startsWith("/cmd") && data.length == 4) {
                socket.emit('send_msg', {
                    msg: "/cmd - This command list",
                    own: ">"
                });
                socket.emit('send_msg', {
                    msg: "/door - to set your door position",
                    own: ">"
                });
                socket.emit('send_msg', {
                    msg: "/look <1-10> - to set your character outfit",
                    own: ">"
                });
                socket.emit('send_msg', {
                    msg: "/pickall - Pick all furni in your room",
                    own: ">"
                });
            }
            else if (data.startsWith("/pickall")) {
                if (data.length == 8) {
                    conn.query("SELECT uid FROM rooms WHERE id = " + conn.escape(socket.curr_room), function (err, res) {
                        if (res[0].uid == socket.userid) {
                            conn.query("UPDATE furnis SET room_id = '0' WHERE room_id = " + conn.escape(socket.curr_room));

                            var tmp_player = [];
                            players.filter(function (curr) {
                                if (curr.room == socket.curr_room) { tmp_player.push(curr) }
                            });
                            io.to(socket.curr_room).emit("updateroom", tmp_player);
                            conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, furnis.rstate AS rotate_state, items.state AS state, furnis.x AS x, furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(socket.curr_room), function (err, res) {
                                io.to(socket.curr_room).emit("place_furni", res);
                            });
                            socket.emit('send_msg', {
                                msg: "All furni now in your inventory.",
                                own: "@SYSTEM"
                            });
                        }
                    });
                }
            }
            else {
                var chats = {
                    msg: data,
                    own: socket.username,
                    loc: 0
                }
                //io.emit('send_msg', chats);
                var time_now = new Date();
                var time_day = time_now.getDate();
                var time_mon = time_now.getMonth() + 1;
                var time_hour = time_now.getHours();
                var time_min = time_now.getMinutes();
                var time_total = time_day + "/" + time_mon + " " + time_hour + ":" + time_min;
                console.log("[" + time_total + "] " + socket.username + ": " + data);
                io.to(socket.curr_room).emit('send_msg', chats);
            }

        } else {
            socket.emit("mula");
        }
    });

    socket.on("pickall", function () {
        conn.query("SELECT uid FROM rooms WHERE id = " + conn.escape(socket.curr_room), function (err, res) {
            if (res[0].uid == socket.userid) {
                conn.query("UPDATE furnis SET room_id = '0' WHERE room_id = " + conn.escape(socket.curr_room));

                var tmp_player = [];
                players.filter(function (curr) {
                    if (curr.room == socket.curr_room) { tmp_player.push(curr) }
                });
                io.to(socket.curr_room).emit("updateroom", tmp_player);
                conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, furnis.rstate AS rotate_state, items.state AS state, furnis.x AS x, furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(socket.curr_room), function (err, res) {
                    io.to(socket.curr_room).emit("place_furni", res);
                });
                socket.emit('send_msg', {
                    msg: "All furni now in your inventory.",
                    own: "@SYSTEM"
                });
            }
        });
    })

    socket.on("move_item", function (data) {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            conn.query("SELECT uid FROM rooms WHERE id = " + conn.escape(socket.curr_room), function (err, res) {
                if (res[0].uid == socket.userid) {
                    conn.query("UPDATE furnis SET x = " + conn.escape(data.x) + ", y = " + conn.escape(data.y) + " WHERE id = " + conn.escape(data.id), function () {
                        var tmp_player = [];
                        players.filter(function (curr) {
                            if (curr.room == socket.curr_room) { tmp_player.push(curr); }
                        });
                        io.to(socket.curr_room).emit("updateroom", tmp_player);
                        conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, items.state AS state, furnis.x AS x,  furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(socket.curr_room), function (err, res2) {
                            io.to(socket.curr_room).emit("place_furni", res2);
                        });
                    });
                }
            });
        }
        else {
            socket.emit("mula");
        }
    });
    socket.on("rotate_item", function (data) {
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            conn.query("SELECT uid FROM rooms WHERE id = " + conn.escape(socket.curr_room), function (err, res) {
                if (res[0].uid == socket.userid) {

                    conn.query("UPDATE furnis SET rstate = " + conn.escape(data.rstate) + " WHERE id = " + conn.escape(data.id), function () {
                        var tmp_player = [];
                        players.filter(function (curr) {
                            if (curr.room == socket.curr_room) { tmp_player.push(curr); }
                        });
                        io.to(socket.curr_room).emit("updateroom", tmp_player);
                        conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, items.state AS state, furnis.x AS x, furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(socket.curr_room), function (err, res2) {
                            io.to(socket.curr_room).emit("place_furni", res2);
                        });
                    });
                }
            });
        }
        else {
            socket.emit("mula");
        }
    });
    socket.on("place_item", function (data) {
        //id, x, y
        if (typeof socket.len !== "undefined" || typeof players[socket.len] !== "undefined") {
            if (data.id != 0) {
                conn.query("SELECT uid FROM rooms WHERE id = " + conn.escape(socket.curr_room), function (err, res) {
                    if (res[0].uid == socket.userid) {
                        conn.query("UPDATE furnis SET room_id = " + conn.escape(socket.curr_room) + ", x = " + conn.escape(data.x) + ", y = " + conn.escape(data.y) + " WHERE uid = " + conn.escape(socket.userid) + " AND room_id = '0' AND item_id = " + conn.escape(data.id) + " LIMIT 1");
                    }
                });
            }
        }
        else {
            socket.emit("mula");
        }
    });

    /*
    socket.fr_move = 0;
    socket.on('move_char', function (data) {
        socket.fr_move++;
        for (var i = 0; i < players.length; i++) {
            if (players[i].id == socket.id) {
                var path = [];
                var x = players[i].x, y = players[i].y, d = players[i].dir;
                var X = 0;
                while (x != data.x || y != data.y) {
                    X++;
                    if (X > 50) {
                        console.log("control break freak movement");
                        return;
                    }
                    if (data.x < x) {
                        //player target on left
                        x -= 32;
                        socket.x = x;
                        if (data.y < y) {
                            //left and top \^
                            d = 5;
                            y -= 16;
                            socket.y = y;
                            for (var m = 0; m < maps.length; m++) {
                                if (maps[m].x == x) {
                                    if ((maps[m].y - 88) == y) {
                                        m = maps.length;
                                    }
                                }
                                else if (m == (maps.length - 1)) {
                                    x += 32;
                                    y += 16;
                                    socket.x = x;
                                    socket.y = y;
                                    x = data.x;
                                    y = data.y;
                                }
                            }
                        }
                        else if (data.y == y) {
                            //just straight to left
                            d = 6;
                            x -= 32;
                            socket.x = x;
                            for (var m = 0; m < maps.length; m++) {
                                if (maps[m].x == x) {
                                    if ((maps[m].y - 88) == y) {
                                        m = maps.length;
                                    }
                                }
                                else if (m == (maps.length - 1)) {
                                    x += 64;
                                    //y += 16;
                                    socket.x = x;
                                    socket.y = y;
                                    x = data.x;
                                    y = data.y;
                                }
                            }

                        }
                        else if (data.y > y) {
                            //left and bottom /v
                            d = 7;
                            y += 16;
                            socket.y = y;
                            for (var m = 0; m < maps.length; m++) {
                                if (maps[m].x == x) {
                                    if ((maps[m].y - 88) == y) {
                                        m = maps.length;
                                    }
                                }
                                else if (m == (maps.length - 1)) {
                                    x += 32;
                                    y -= 16;
                                    socket.x = x;
                                    socket.y = y;
                                    x = data.x;
                                    y = data.y;
                                }
                            }
                        }

                    }
                    else if (data.x == x) {
                        //up or down only
                        if (data.y < y) {
                            //top
                            d = 4;
                            y -= 32;
                            socket.y = y;
                            for (var m = 0; m < maps.length; m++) {
                                if (maps[m].x == x) {
                                    if ((maps[m].y - 88) == y) {
                                        m = maps.length;
                                    }
                                }
                                else if (m == (maps.length - 1)) {
                                    //x += 32;
                                    y += 32;
                                    socket.x = x;
                                    socket.y = y;
                                    x = data.x;
                                    y = data.y;
                                }
                            }
                        }
                        else if (data.y > y) {
                            //bottom
                            d = 0;
                            y += 32;
                            socket.y = y;
                            for (var m = 0; m < maps.length; m++) {
                                if (maps[m].x == x) {
                                    if ((maps[m].y - 88) == y) {
                                        m = maps.length;
                                    }
                                }
                                else if (m == (maps.length - 1)) {
                                    //x += 32;
                                    y -= 32;
                                    socket.x = x;
                                    socket.y = y;
                                    x = data.x;
                                    y = data.y;
                                }
                            }
                        }
                    }
                    else if (data.x > x) {
                        //target to right
                        x += 32;
                        socket.x = x;
                        if (data.y < y) {
                            //right and top
                            d = 3;
                            y -= 16;
                            socket.y = y;
                            for (var m = 0; m < maps.length; m++) {
                                if (maps[m].x == x) {
                                    if ((maps[m].y - 88) == y) {
                                        m = maps.length;
                                    }
                                }
                                else if (m == (maps.length - 1)) {
                                    x -= 32;
                                    y += 16;
                                    socket.x = x;
                                    socket.y = y;
                                    x = data.x;
                                    y = data.y;
                                }
                            }
                        }
                        else if (data.y == y) {
                            //just straight to right
                            d = 2;
                            x += 32;
                            socket.x = x;
                            for (var m = 0; m < maps.length; m++) {
                                if (maps[m].x == x) {
                                    if ((maps[m].y - 88) == y) {
                                        m = maps.length;
                                    }
                                }
                                else if (m == (maps.length - 1)) {
                                    x -= 64;
                                    //y -= 16;
                                    socket.x = x;
                                    socket.y = y;
                                    x = data.x;
                                    y = data.y;
                                }
                            }
                        }
                        else if (data.y > y) {
                            //right and top
                            d = 1;
                            y += 16;
                            socket.y = y;
                            for (var m = 0; m < maps.length; m++) {
                                if (maps[m].x == x) {
                                    if ((maps[m].y - 88) == y) {
                                        m = maps.length;
                                    }
                                }
                                else if (m == (maps.length - 1)) {
                                    x -= 32;
                                    y -= 16;
                                    socket.x = x;
                                    socket.y = y;
                                    x = data.x;
                                    y = data.y;
                                }
                            }
                        }
                    }
                    path.push({ "x": socket.x, "y": socket.y, "d": d });

                }//end while

                (function theLoop(index, pa, n, pla) {
                    setTimeout(function () {
                        if (pa[n].x) {
                            socket.x = pla.x = pa[n].x;
                            socket.y = pla.y = pa[n].y;
                            pla.dir = pa[n].d;
                            var tmp_player = [];
                            players.filter(function (curr) {
                                if (curr.room == socket.curr_room) { tmp_player.push(curr) }
                            });
                            //io.emit('updateroom', tmp_player);
                            io.to(socket.curr_room).emit('updateroom', tmp_player);
                            if (n < index && socket.fr_move == 1) {          // If i > 0, keep going || NONO we change if n less then i
                                n++;
                                theLoop(index, pa, n, pla);       // Call the loop again, and pass it the current value of i
                            }
                            else {
                                //stop loop
                                socket.fr_move = 0;
                            }
                        }

                    }, 1000);
                })((path.length - 1), path, 0, players[i]);
                i = players.length;

            }
        }
    });*/

    socket.on('login', function (data) {
        if (data.username != "") {
            var name_test = /^[a-zA-Z0-9]{3,8}$/;
            if (name_test.test(data.username)) {
                conn.query("SELECT id, password, username, skin, credits FROM users WHERE username = " + conn.escape(data.username), function (error, results) {
                    if (results.length == 0) {
                        socket.emit('login', "error#Username not found.");
                    }
                    else {
                        bcrypt.compare(data.password, results[0].password, function (err, res) {
                            if (res == true) {
                                var quick_check = true;
                                for (var i = 0; i < players.length; i++) {
                                    if (players[i].uid == results[0].id) {
                                        quick_check = false;
                                    }
                                }
                                if (quick_check) {
                                    conn.query("SELECT uid FROM rooms WHERE id = '1'", function (err, res1) {
                                        if (res1[0].uid == results[0].id) {
                                            socket.own_room = true;
                                        }
                                        else {
                                            socket.own_room = false;
                                        }
                                        socket.username = results[0].username;
                                        socket.userid = results[0].id;
                                        socket.x = 4;
                                        socket.y = 0;
                                        socket.skin = results[0].skin;
                                        socket.credits = results[0].credits
                                        socket.curr_room = "1";
                                        socket.len = players.length;
                                        players[players.length] = {
                                            name: socket.username,
                                            uid: socket.userid,
                                            room: socket.curr_room,
                                            x: 4,
                                            y: 0,
                                            skin: socket.skin,
                                            dir: 1,
                                            state: 0,
                                            credits: socket.credits,
                                            own_room: socket.own_room
                                        }
                                        socket.emit('login', "login#" + results[0].username + "#" + results[0].id + "#" + results[0].credits);
                                        socket.join("1");
                                        if (typeof rooms["1"] == "undefined") {
                                            rooms["1"] = { id: "1", name: "Main Lounge", cnt: 1 };
                                        }
                                        else {
                                            rooms["1"].cnt++;
                                        }
                                        var tmp_player = [];
                                        players.filter(function (curr) {
                                            if (curr.room == socket.curr_room) { tmp_player.push(curr) }
                                        });
                                        io.to(socket.curr_room).emit("updateroom", tmp_player);
                                        online_cnt++;
                                        io.emit("online_cnt", online_cnt + " Online");
                                    });
                                }
                                else {
                                    socket.emit('login', "error#Already in game");
                                }

                            }
                            else {
                                socket.emit('login', "error#Password not match.");
                            }
                        });
                    }
                });
            }
            else {
                socket.emit('login', "error#Username error.");
            }
        }
        else {
            socket.emit('login', "error#Username error.");
        }
    });

    socket.on('reg', function (data) {
        if (data.username != "") {
            var name_test = /^[a-zA-Z0-9]{3,8}$/;
            if (name_test.test(data.username)) {
                var email_test = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (email_test.test(data.email)) {
                    conn.query('SELECT id FROM users WHERE username = ' + conn.escape(data.username), function (error, results) {
                        if (results.length == 0) {
                            conn.query('SELECT id FROM users WHERE email = ' + conn.escape(data.email), function (error, results1) {
                                if (results1.length == 0) {
                                    socket.emit('reg', 'ok');
                                    bcrypt.hash(data.password, saltRound, function (err, hash) {
                                        conn.query('INSERT INTO users (username, password, email) VALUES (' + conn.escape(data.username) + ', ' + conn.escape(hash) + ', ' + conn.escape(data.email) + ')');
                                    });
                                }
                                else {
                                    socket.emit('reg', "error#Email already used.");
                                }
                            });
                        }
                        else {
                            socket.emit('reg', "error#Username already exist.");
                        }
                    });
                }
                else {
                    socket.emit('reg', "error#Email error.");
                }
            }
            else {
                socket.emit('reg', "error#Username need to be 3 - 8 character only. Letters or/and numbers only can be your username.");
            }
        }
        else {
            socket.emit('reg', "error#Username error.");
        }
    });

    socket.on('disconnect', function () {
        if (socket.userid) {
            online_cnt--;
            io.emit("online_cnt", online_cnt + " Online");
        }

        for (var i = 0; i < players.length; i++) {
            if (players[i].uid == socket.userid) {
                players.splice(i, 1);
                i = players.length;
                rooms[socket.curr_room].cnt--;
            }
        }

        var tmp_player = [];
        players.filter(function (curr) {
            if (curr.room == socket.curr_room) { tmp_player.push(curr); }
        });
        io.to(socket.curr_room).emit("updateroom", tmp_player);
        conn.query("SELECT furnis.id AS ids, furnis.uid AS uid, furnis.item_id AS item_id, furnis.room_id AS room_id, items.state AS state, furnis.x AS x, furnis.y AS y, furnis.rstate AS rotate_state, items.img AS img, items.name AS name FROM furnis JOIN items ON furnis.item_id = items.id WHERE furnis.room_id = " + conn.escape(socket.curr_room), function (err, res2) {
            io.to(socket.curr_room).emit("place_furni", res2);
        });

    });
});

http.listen(80, function () {
    console.log("Server start:" + http.address().port);
});