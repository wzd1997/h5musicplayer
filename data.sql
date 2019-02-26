SET NAMES UTF8;
DROP DATABASE IF EXISTS music;
CREATE DATABASE music CHARSET=UTF8;
USE music;
CREATE TABLE music_data (
    mid INT PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(64),
    audio VARCHAR(64),
    song VARCHAR(64),
    album VARCHAR(64),
    singer VARCHAR(64),
    duration INT,
    isLike BOOLEAN
);
INSERT INTO music_data VALUES (
    null,
    "/source/song_1.jpg",
    "/source/song_1.mp3",
    "丑八怪",
    "意外",
    "薛之谦",
    253,
    true
);
INSERT INTO music_data VALUES (
    null,
    "/source/song_2.jpg",
    "/source/song_2.mp3",
    "小半",
    "小梦大半",
    "陈粒",
    297,
    false
);
INSERT INTO music_data VALUES (
    null,
    "/source/song_3.jpg",
    "/source/song_3.mp3",
    "shape of you",
    "÷",
    "ed sheeran",
    235,
    false
);
SELECT * FROM music_data;