const DomModul = (function () {
    var ids = 21;
    var account = prompt('Enter account name(write "null" if logged out)', 'here');
    var name = document.getElementById('account');
    if (account !== 'null') {
        name.textContent = account;
    }
    else {
        name.textContent = '';
        name = null;
        var header = document.getElementById('header');
        var logOut = document.getElementById('log');
        var addPhoto = document.getElementById('add');
        header.removeChild(logOut);
        header.removeChild(addPhoto);
    }
    len = Modul.countLength();
    var newMassive = [];
    newMassive = Modul.getPhotoPosts(0, len);
    var nodes = [];

    for (var i = 0; i < len; i++) {
        var div = createPostDom(newMassive[i].author, newMassive[i].description, newMassive[i].photolink, newMassive[i].hashtags, newMassive[i].likes, newMassive[i].createdAt, newMassive[i].id);
        nodes[i] = div;
    }


    function createPostDom(author, descript, link, hashtags, likes, createdAt, id) {
        //Общий div поста
        var div = document.createElement('div');
        div.className = "post";
        //Автор
        var divAuthor = document.createElement('div');
        divAuthor.className = "name new-name";
        divAuthor.textContent = author;
        div.appendChild(divAuthor);

        //Дата создания
        var divData = document.createElement('div');
        divData.className = "data new-data";
        divData.textContent = createdAt;
        div.appendChild(divData);

        //Фотография
        var divPhoto = document.createElement('div');
        divPhoto.className = "picture new-picture";
        div.appendChild(divPhoto);
        var photograph = document.createElement('img');
        photograph.className = "post-photo";
        photograph.setAttribute('src', link);
        divPhoto.appendChild(photograph);

        //Элементы интерфейса
        var divLine = document.createElement('div');
        divLine.className = "inline-box inline-box-new";
        div.appendChild(divLine);
        if (name != null) {
            var divDelete = document.createElement('div');
            divDelete.className = "delete delete-new";
            divLine.appendChild(divDelete);
            var delPhoto = document.createElement('img');
            delPhoto.setAttribute('src', 'Styles/delete.png');
            delPhoto.setAttribute('width', '7%');
            divDelete.appendChild(delPhoto);
            var divEdit = document.createElement('div');
            divEdit.className = "edit edit-new";
            divLine.appendChild(divEdit);
            var editPhoto = document.createElement('img');
            editPhoto.setAttribute('src', 'Styles/edit.png');
            editPhoto.setAttribute('width', '12%');
            divEdit.appendChild(editPhoto);
            var divLike = document.createElement('div');
            divLike.className = "like like-new";
            divLine.appendChild(divLike);
            var likeButton = document.createElement('a');
            likeButton.className = "red-button new-red-button";
            likeButton.textContent = "Like";
            divLike.appendChild(likeButton);
        }
        //Подпись
        var divText = document.createElement('div');
        divText.className = "text text-new";
        divText.textContent = descript;
        div.appendChild(divText);

        //Хэштеги
        for (var j = 0; j < hashtags.length; j++) {
            var divHash = document.createElement('div');
            divHash.className = "posttag posttag-new";
            divHash.textContent = '#' + hashtags[j];
            div.appendChild(divHash);
        }
        div.setAttribute('delete', false);
        div.setAttribute('id', id);
        return div;
    }

    return {
        //Добавление нового фотопоста
        addPhotoPostDom: function (author, descript, link, hashtags, likes) {
            idst = String(ids);
            var newPost = {
                id: idst,
                author: author,
                description: descript,
                createdAt: new Date(),
                photolink: link,
                hashtags: hashtags,
                likes: likes
            }
            if (Modul.addPhotoPost(newPost) === true) {
                var dat = new Date();
                var div = createPostDom(author, descript, link, hashtags, likes, dat, idst);
                nodes.unshift(div);
                var filter = document.getElementById('filterBar');
                document.body.insertBefore(div, (filter).nextSibling);
                newMassive.unshift(newPost);
                ids++;
            }
        },

        //Удаление поста
        deletePhotoPsotDom: function (ids) {
            Modul.removePhotoPost(ids);
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute('id') === String(ids)) {
                    document.body.removeChild(nodes[i]);
                    nodes[i].setAttribute('delete', true);
                    console.log(nodes[i]);
                }
            }
        },

        //Редактирование фотопоста
        editPhotoPostDom: function (id, object) {
            Modul.editPhotoPost(id, object);
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute('id') === String(id)) {
                    var temp = Modul.getPhotoPost(id);
                    var div = createPostDom(temp.author, temp.description, temp.photolink, temp.hashtags, temp.likes, temp.data, temp.id);
                    var posts = document.getElementsByClassName('post');
                    for (var j = 0; j < posts.length; j++) {
                        if (posts[j].getAttribute('id') === String(id)) {
                            document.body.replaceChild(div, posts[j]);
                        }
                    }
                    nodes[i] = div;
                    console.log(nodes[i]);
                }
            }
        },


        //Отображение постов
        showPosts: function () {
            var authors = [];
            var list = document.getElementById('authors');
            var lists = list.children;
            for (i = 0; i < lists.length; i++) {
                lists[i].remove();
            }
            footer = document.getElementById('footer');
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute('delete') !== 'true') {
                    document.body.insertBefore(nodes[i], footer);
                    if (authors.indexOf(newMassive[i].author) === -1) {
                        authors.push(newMassive[i].author);
                    }
                }
            }
            footer = document.getElementById('footer');
            for (var j = 0; j < authors.length; j++) {
                var option = document.createElement('option');
                option.setAttribute('value', authors[j]);
                list.appendChild(option);
            }
        },

        testing: function () {
            DomModul.showPosts();
            console.log(nodes);
            console.log('Удаление поса с ID 12');
            DomModul.deletePhotoPsotDom(12);
            console.log(nodes);

            console.log('Изменение поста с id 2');
            DomModul.editPhotoPostDom(2, {description: 'Hello world'});
            console.log(nodes);

            console.log('Добавление поста');
            DomModul.addPhotoPostDom('Author', 'Nothing', 'Pictures/Brest.jpg',['Hello'], []);
            console.log('nodes');
        }
    }
})();