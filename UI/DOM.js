const DomModul = (function () {
    var ids = 21;
    var name = document.getElementById('account');
    len = Modul.countLength();
    var newMassive = [];
    newMassive = Modul.getPhotoPosts(0, len);
    var nodes = [];

    for (var i = 0; i < len; i++) {
        var div = createPostDom(newMassive[i].author, newMassive[i].description, newMassive[i].photolink, newMassive[i].hashtags, newMassive[i].likes, newMassive[i].createdAt, newMassive[i].id);
        nodes[i] = div;
    }
    console.log(nodes);

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
        changeAccout: function () {
            var setName = prompt('Enter new account name', 'Vitaut');
            name.textContent = setName;
            DomModul.showPosts();
        },

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
            Modul.addPhotoPost(newPost);
            var dat = new Date();
            var div = createPostDom(author, descript, link, hashtags, likes, dat, idst);
            nodes.unshift(div);
            DomModul.showPosts();
            ids++;
        },

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

        editPhotoPostDom: function (id, object) {
            Modul.editPhotoPost(id, object);
            for(var i = 0; i < nodes.length; i++){
                if(nodes[i].getAttribute('id') === (id)){
                    var temp = Modul.getPhotoPost(id);
                    var div = createPostDom(temp.author, temp.description, temp.photolink, temp.hashtags, temp.likes, temp.data);
                    document.body.replaceChild(div,nodes[i]);
                    nodes[i] = div;

                }
            }
        },

        showMore: function () {
            DomModul.showPosts(10);
        },

        showPosts: function (more) {
            var more = more || 0;
            var authors = [];
            var list = document.getElementById('authors');
            var lists = list.children;
            for( i = 0; i <lists.length; i++){
                lists[i].remove();
            }
            footer = document.getElementById('footer');
            for (var i = 0; i < 10 + more; i++) {
                if (nodes[i].getAttribute('delete') !== true) {
                    document.body.insertBefore(nodes[i], footer);
                    console.log(nodes[i]);
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
        }
    }
})();