
const express = require('express');
const fs=require('fs');
const app = express();
const parser = require('body-parser');

app.use(express.static('public'));
app.use(parser.json());

app.listen(3000, ()=> {
    console.log('request starting...');
});

//fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));

app.get('/getPhotoPost', (req, res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    let post = photoPosts.find((post)=>req.query.id === post.id);
    post ? res.send(post) : res.status(404).end();
});


app.delete('/removePhotoPost', (req, res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    for(let i = 0; i < photoPosts.length;i++){
        if(photoPosts[i].id === req.query.id){
            photoPosts[i].del = true;
        }
    }
    fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
    let post = photoPosts.find((post)=>req.query.id === post.id);
    post ? res.send(post) : res.status(404).end();
});


app.post('/getPhotoPosts', (req,res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    if (req.query.begin > photoPosts.length) {
        console.log('Overflow');
        return;
    }
    let filterConfig = req.body;
    var newPosts = [];
    begin = req.query.begin || 0;
    number = req.query.number || 10;
    var count = 0;
    var j = 0;
    var i = req.query.begin;
    if (filterConfig) {
        while (i < photoPosts.length && j < number) {
            if (checkFilters(photoPosts[i], filterConfig)) {
                var temp = {};
                for (var key in photoPosts[i]) {
                    temp[key] = photoPosts[i][key];
                }
                newPosts.push(temp);
                j++;
                i++;
            }
            i++;
        }
    }
    else {
        while (i < photoPosts.length && j < number) {
            var temp = {};
            for (var key in photoPosts[i]) {
                temp[key] = photoPosts[i][key];
            }
            newPosts.push(temp);
            i++;
            j++;
        }
    }
    newPosts.sort(function (a, b) {
        aDate = new Date(a.createdAt);
        bDate = new Date(b.createdAt);
        return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
    });
    newPosts ? res.send(newPosts) : res.status(404).end();
})


app.post('/addPhotoPost', (req, res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    let element = req.body;
    let date = element.createdAt;
    element.createdAt = new Date(date);
    console.log(date);
    for (var k = 0; k < photoPosts.length; k++) {
        if (photoPosts[k].id === element.id) {
            console.log('Element with such ID already exists');
        }
    }
    if (validatePhotoPost(element) === true) {
        photoPosts.push(element);
        fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
    }
    res.status(200).end();
});


app.put('/editPhotoPost', (req,res)=>{
    let photoPosts = JSON.parse(fs.readFileSync('./server/data/posts.json', 'utf8'));
    let object = req.body;
    console.log(object);
    let temp = {};
    let requested = photoPosts.find(function (element, index, array) {
        if (element.id === String(req.query.id)) {
            for (let key in element) {
                temp[key] = element[key];
            }
            let tempDate = temp.createdAt;
            temp.createdAt = new Date(tempDate);
            for (let key in object) {
                switch (key) {
                    case 'description':
                        temp.description = object.description;
                        break;
                    case 'photoLink':
                        temp.description = object.description;
                        break;
                    case 'Hashtags':
                        //console.log('Asd');
                        temp.hashtags = object.Hashtags;
                }
            }
            if (validatePhotoPost(temp) === true) {
                photoPosts[index] = temp;
                fs.writeFileSync('./server/data/posts.json', JSON.stringify(photoPosts));
            }
        }
    });
    temp ? res.send(temp) : res.status(404).end()
})


function checkFilters(element, filters) {
    if (filters.hashtags) {
        for (k = 0; k < filters.hashtags.length; k++) {
            if (element.hashtags.indexOf(filters.hashtags[k]) === -1) {
                return false;
            }
        }
    }
    if (filters.author) {
        if (filters.author !== element.author) {
            return false;
        }
    }
    return true;
}

function validatePhotoPost(object) {
    if (!object.id) {
        console.log("Absent 'id' fields")
        return false;
    }
    if (!object.description) {
        console.log("Absent 'description' field")
        return false;
    }
    if (!object.author) {
        console.log("Absent 'author' field")
        return false;
    }
    if (!object.createdAt) {
        console.log("Absent 'createdAt' field")
        return false;
    }
    if (!object.hashtags) {
        console.log("Absent 'hashtags' field")
        return false;
    }
    if (!object.likes) {
        console.log("Absent 'likes' field")
        return false;
    }
    if (!object.photolink) {
        console.log("Absent 'photolink' field")
        return false;
    }
    for (var key in object) {
        switch (key) {
            case 'id':
                if (typeof object.id !== 'string') {
                    console.log('Wrong type! id');
                    return false;
                }
                break;
            case 'description':
                if (object.description.length > 200) {
                    console.log('Overflow');
                    return false;
                }
                break;
            case 'createdAt':
                if ((object.createdAt instanceof Date) === false) {
                    console.log('Wrong type! createdAt');
                    return false;
                }
                break;
            case 'photoLin':
                if (object.photolink.length === 0) {
                    console.log('Empty photoLink field');
                    return false;
                }
            case 'author':
                if (object.author.length === 0) {
                    console.log('Empty author field');
                    return false;
                }
        }
    }
    return true;
}


function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
console.log("server running at 'localhost:3000'");