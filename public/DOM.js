const DomModul = (function () {
    let ids = 21;
    let logBtn = document.getElementById('log');
    let logBox = document.getElementById('logInBox');
    let logText = document.getElementById('logText');
    let addBox = document.getElementById('addForm');
    let spanLog = document.getElementsByClassName('close')[0];
    let spanAdd = document.getElementsByClassName('close')[1];
    let logIn = document.getElementById('logIn');
    let account = document.getElementById('account');
    let addBtn = document.getElementById('add');
    let addData = document.getElementById('addData');
    let addAuthor = document.getElementById('author-add');
    let descriptText = document.getElementById("descriptText");
    let refresh = document.getElementById('refreshBtn');
    let load = document.getElementById("load");
    let addTag = document.getElementById("addTag");
    let newHashBtn = document.getElementById("newHashtagButton");
    let newPost = document.getElementById("newPost");
    let fileChooser = document.getElementById("fileChooser");
    //Переменная для регистрации статуса входа в аккаунт
    let entered = false;
    let repaired = false;
    let shown = 0;//переменная для отображения показанных постов.
    //len = Modul.countLength();
    let templink;
    let tempid;


    let newMassive = [];//Массив посTов js
    let strMas = localStorage.getItem("massive");
    newMassive = JSON.parse(strMas);

    let strIndeficator = localStorage.getItem("defenition");
    let indificator = JSON.parse(strIndeficator);

    let nodes = [];//Массив посTов DOM
    if(indificator == true) {
        for (let i = 0; i < newMassive.length; i++) {
            let div = createPostDom(newMassive[i].author, newMassive[i].description, newMassive[i].photolink, newMassive[i].hashtags, newMassive[i].likes, newMassive[i].createdAt, newMassive[i].id, false);
            nodes[i] = div;
        }
    }


    let users = [];//Массив пользователей
    let strUsers = localStorage.getItem("users");
    users = JSON.parse(strUsers);


    let hashs = [];//Массив хэшTегов(фильTры) DOM
    let hashtags = [];//Массив хэштегов JS
    let hashsAdd = [];//Массив хэштегов для нового фото DOM
    let hashtagsAdd = [];//Массив хэштегов для нового фото JS


    //Кнопка log in/out
    logBtn.addEventListener("click", function () {
        if (entered === false) {
            logBox.style.display = "block"
        }
        else {
            entered = false;
            addBtn.style.display = "none";
            logText.textContent = "Log in";
            account.textContent = null;
            DomModul.afterLoggingOut();
            DomModul.showPosts();
        }
    });


    //крест в log in/out боксе
    spanLog.addEventListener("click", function () {
        logBox.style.display = "none";
    });


    //Кнопка log in в боксе
    logIn.addEventListener("click", function () {
            let login = document.getElementById("login").value;
            let password = document.getElementById("password").value;
            let user = {username: login, password: password};
            for (let i = 0; i < users.length; i++) {
                if (String(users[i].username) === String(user.username) && String(users[i].password) === String(user.password)) {
                    account.textContent = login;
                    entered = true;
                    addBtn.style.display = "inline-block";
                    logText.textContent = "Log out";
                    logBox.style.display = "none";
                    DomModul.afterLogging();
                    DomModul.showPosts();
                    return;
                }
            }
            alert("Wrong user or password");
            logBox.style.display = "none";
        }
    );


    //Кнока добавить пост
    addBtn.addEventListener("click", function () {
        addBox.style.display = "block";
        let author = document.getElementById("author-add");
        author.textContent = account.textContent;
        let curDate = new Date();
        addData.textContent = String(curDate);
    });


    //крест в addPhoto боксе
    spanAdd.addEventListener("click", function () {
        addBox.style.display = "none";
    });


    //Добавление хэштега в списке фильтров
    addTag.addEventListener("click", function () {
        let filterBar = document.getElementById("filterBar");
        let hashtagsInput = document.getElementById("hashtahgsInput").value;
        if (hashtags.indexOf(hashtagsInput) === -1) {
            let div = createHashtagFilter(hashtagsInput);
            filterBar.insertBefore(div, refresh);
            div.addEventListener("click", function () {
                hashs.splice(hashs.indexOf(div), 1);
                hashtags.splice(hashtags.indexOf(hashtagsInput), 1);
                filterBar.removeChild(div);
                console.log(hashtags);
            })
            hashs.push(div);
            hashtags.push(hashtagsInput);
        }
    });


    //Добавление хэштега в создании поста
    newHashBtn.addEventListener("click", function () {
        let settings = document.getElementById("settings");
        let hashtagsInput = document.getElementById("newHashtag").value;
        let div = createHashtagFilterAdd(hashtagsInput);
        let newPost = document.getElementById("newPost");
        settings.appendChild(div);
        div.addEventListener("click", function () {
            hashsAdd.splice(hashsAdd.indexOf(div), 1);
            hashtagsAdd.splice(hashtagsAdd.indexOf(hashtagsInput), 1);
            settings.removeChild(div);
            console.log(hashtags);
        });
        hashsAdd.push(div);
        hashtagsAdd.push(hashtagsInput);
    });


    //Добавление//редактирование поста
    newPost.addEventListener("click", function () {
        console.log(repaired);
        if (repaired === false) {
            let descriptText = document.getElementById("descriptText").value;
            let createdAt = document.getElementById("addData").textContent;
            let likes = [];
            let filePath = "public/Pictures/" + fileChooser.files[0].name;
            console.log(filePath);
            DomModul.addPhotoPostDom(account.textContent, descriptText, filePath, hashtagsAdd, likes);
            DomModul.afterLogging();
            addBox.style.display = "none";
        }
        else {
            let newLink = "";
            if (fileChooser.files[0] !== undefined) {
                newLink = "public/Pictures/" + fileChooser.files[0].name;
            }
            else {
                newLink = templink;
            }
            let object = {
                photolink: newLink,
                description: descriptText.value,
                hashtags: hashtagsAdd
            }
            console.log(tempid);
            DomModul.editPhotoPostDom(tempid, object);
            DomModul.clearTape();
            DomModul.showPosts(shown);
            addBox.style.display = "none";
            repaired = false;
        }
    })

    //Добавление 10 постов
    load.addEventListener("click", function () {
        DomModul.showPosts(shown + 10);
    });


    //Фильтрация постов.
    refresh.addEventListener("click", function () {
        DomModul.clearTape();
        shown = 0;
        let authorIs = document.getElementById("authorIs");
        let authorInput = document.getElementById("authorInput").value;
        let dataIs = document.getElementById("dataIs");
        let dayInput = document.getElementById("dayInput").value;
        let mounthInput = document.getElementById("mounthInput").value;
        let yearInput = document.getElementById("yearInput").value;
        let hashtagsIs = document.getElementById("hashtahgsIs");
        nodes.splice(0, nodes.length);
        let filterConfig = {};
        filterConfig.author = false;
        filterConfig.hashtags = false;
        if (authorIs.checked === true) {
            filterConfig.author = authorInput;
        }
        if (hashtagsIs.checked === true) {
            filterConfig.hashtags = hashtags;
        }
        if (dataIs.checked === true) {
            filterConfig.data = new Date(yearInput, (mounthInput - 1), dayInput);
        }
        for (let i = 0; i < newMassive.length; i++) {
            if (checkFilters(newMassive[i], filterConfig)) {
                let div = createPostDom(newMassive[i].author, newMassive[i].description, newMassive[i].photolink, newMassive[i].hashtags, newMassive[i].likes, newMassive[i].createdAt, newMassive[i].id, newMassive[i].del);
                nodes.push(div);
            }
        }
        if (entered === true) {
            DomModul.afterLogging();
        }
        DomModul.showPosts(shown + 10);
    });


    function checkFilters(element, filters) {
        if (filters.hashtags) {
            for (k = 0; k < filters.hashtags.length; k++) {
                if (element.hashtags.indexOf(filters.hashtags[k]) == -1) {
                    return false;
                }
            }
        }
        if (filters.author) {
            if (filters.author != element.author) {
                return false;
            }
        }
        if (filters.data) {
            console.log(filters.data);
            console.log(element.createdAt);
            if (String(filters.data) !== String(element.createdAt)) {
                return false;
            }
        }
        return true;
    }


    function createHashtagFilter(hashtag) {
        let div = document.createElement('div');
        div.className = "hashtag";
        let img = document.createElement('img');
        let text = document.createElement('b');
        text.textContent = " #" + hashtag;
        img.className = "filter";
        img.setAttribute('src', 'Styles/cross.png');
        img.setAttribute('alt', 'cross');
        img.setAttribute('width', '1.5%');
        div.appendChild(img);
        div.appendChild(text);
        return div;
    }


    function createHashtagFilterAdd(hashtag) {
        let div = document.createElement('div');
        div.className = "hashtag";
        let img = document.createElement('img');
        let text = document.createElement('b');
        text.textContent = " #" + hashtag;
        img.className = "filter";
        img.setAttribute('src', 'Styles/cross.png');
        img.setAttribute('alt', 'cross');
        img.setAttribute('width', '5%');
        div.appendChild(img);
        div.appendChild(text);
        return div;
    }


    function createPostDom(author, descript, link, hashtags, likes, createdAt, id, del) {
        let name = document.getElementById('account');
        //Общий div поста
        let div = document.createElement('div');
        div.className = "post";
        //Автор
        let divAuthor = document.createElement('div');
        divAuthor.className = "name new-name";
        divAuthor.textContent = author;
        div.appendChild(divAuthor);

        //Дата создания
        let divData = document.createElement('div');
        divData.className = "data new-data";
        divData.textContent = createdAt;
        div.appendChild(divData);

        //Фотография
        let divPhoto = document.createElement('div');
        divPhoto.className = "picture new-picture";
        div.appendChild(divPhoto);
        let photograph = document.createElement('img');
        photograph.className = "post-photo";
        photograph.setAttribute('src', link);
        divPhoto.appendChild(photograph);

        //Элементы интерфейса
        let divLine = document.createElement('div');
        divLine.className = "inline-box inline-box-new";
        div.appendChild(divLine);
        let divDelete = document.createElement('div');
        divDelete.className = "delete delete-new";
        divDelete.style.display = "none";
        divDelete.addEventListener("click", function () {
            DomModul.deletePhotoPsotDom(id);
        });
        divLine.appendChild(divDelete);
        let delPhoto = document.createElement('img');
        delPhoto.setAttribute('src', 'Styles/delete.png');
        delPhoto.setAttribute('width', '7%');
        delPhoto.setAttribute("cursor", "pointer");
        divDelete.appendChild(delPhoto);
        let divEdit = document.createElement('div');
        divEdit.className = "edit edit-new";
        divEdit.style.display = "none";
        divEdit.addEventListener("click", function () {
            repaired = true;
            addBox.style.display = "block";
            let author = document.getElementById("author-add");
            author.textContent = account.textContent;
            addData.textContent = createdAt;
            descriptText.textContent = descript;
            let img = document.getElementById("photoToPost");
            img.setAttribute("src", link);
            hashtagsAdd = hashtags;
            hashsAdd.splice(0, hashsAdd.length);
            let settings = document.getElementById("settings");
            for (let i = 0; i < hashtags.length; i++) {
                let div = createHashtagFilterAdd(hashtags[i]);
                settings.appendChild(div);
                div.addEventListener("click", function () {
                    hashsAdd.splice(hashsAdd.indexOf(div), 1);
                    hashtagsAdd.splice(hashtagsAdd.indexOf(hashtags[i]), 1);
                    settings.removeChild(div);
                    console.log(hashtags);
                });
                hashs.push(div);
                console.log(id.value);
            }
            templink = link;
            tempid = id;
        })
        divLine.appendChild(divEdit);
        let editPhoto = document.createElement('img');
        editPhoto.setAttribute('src', 'Styles/edit.png');
        editPhoto.setAttribute('width', '12%');
        divEdit.appendChild(editPhoto);
        let divLike = document.createElement('div');
        divLike.className = "like like-new";
        divLike.style.display = "none";
        divLike.addEventListener("click", function () {
            DomModul.likePhotoPostDom(id);
        })
        divLine.appendChild(divLike);
        let likeButton = document.createElement('a');
        likeButton.className = "red-button new-red-button";
        likeButton.textContent = "Like";
        divLike.appendChild(likeButton);
        //Подпись
        let divText = document.createElement('div');
        divText.className = "text text-new";
        divText.textContent = descript;
        div.appendChild(divText);

        //Хэштеги
        for (let j = 0; j < hashtags.length; j++) {
            let divHash = document.createElement('div');
            divHash.className = "posttag posttag-new";
            divHash.textContent = '#' + hashtags[j];
            div.appendChild(divHash);
        }
        div.setAttribute('delete', del);
        div.setAttribute('id', id);
        return div;
    }


    return {
        //Первый запуск, сохранение массива в local storage
        firstTime: function () {
            //Массив пользователей
            let users = [{
                username: "Eugeniipol",
                password: "password"
            },
                {
                    username: "Alina_rosso",
                    password: "coffee"
                },
                {
                    username: "Vasya",
                    password: "hleb"
                }
            ];
            let indef = true;
            let firstNodes = [];
            let firstMassive = [];
            let len = Modul.countLength();
            firstMassive = Modul.getPhotoPosts(0, len);
            for (let i = 0; i < len; i++) {
                let div = createPostDom(firstMassive[i].author, firstMassive[i].description, firstMassive[i].photolink, firstMassive[i].hashtags, firstMassive[i].likes, firstMassive[i].createdAt, firstMassive[i].id, false);
                firstNodes[i] = div;
            }
            let strIndef = JSON.stringify(indef);
            let strUsers = JSON.stringify(users);
            let strFirstMassive = JSON.stringify(firstMassive);
            let strFirstNodes = JSON.stringify(firstNodes);
            localStorage.setItem("defenition", strIndef);
            localStorage.setItem("massive", strFirstMassive);
            localStorage.setItem("nodes", strFirstNodes);
            localStorage.setItem("users", strUsers);
        },

        //Обновление localStorage
        uploadLocal: function () {
            let strNewMas = JSON.stringify(newMassive);
            let strNodes = JSON.stringify(nodes);
            localStorage.setItem("massive", strNewMas);
            localStorage.setItem("nodes", strNodes);
        },


        //Добавление нового фотопоста
        addPhotoPostDom: function (author, descript, link, hashtags, likes) {
            idst = String(ids);
            let newPost = {
                id: idst,
                author: author,
                description: descript,
                createdAt: new Date(),
                photolink: link,
                hashtags: hashtags,
                likes: likes
            }
            if (Modul.addPhotoPost(newPost) === true) {
                let dat = new Date();
                let div = createPostDom(author, descript, link, hashtags, likes, dat, idst, false);
                nodes.unshift(div);
                let filter = document.getElementById('filterBar');
                document.body.insertBefore(div, (filter).nextSibling);
                newMassive.unshift(newPost);
                ids++;
                DomModul.uploadLocal();
            }
        },


        afterLogging: function () {
            let login = document.getElementById('account').textContent;
            console.log(document.getElementById('account'));
            for (let i = 0; i < nodes.length; i++) {
                let authorName = nodes[i].getElementsByClassName('name new-name');
                if (authorName[0].textContent === account.textContent) {
                    let deletes = nodes[i].getElementsByClassName("delete delete-new");
                    deletes[0].style.display = "inline-block";
                    let edits = nodes[i].getElementsByClassName("edit edit-new");
                    edits[0].style.display = "inline-block";
                }
                let likes = nodes[i].getElementsByClassName("like like-new");
                likes[0].style.display = "inline-block";
            }
        },


        afterLoggingOut: function () {
            for (let i = 0; i < nodes.length; i++) {
                let deletes = nodes[i].getElementsByClassName("delete delete-new");
                deletes[0].style.display = "none";
                let edits = nodes[i].getElementsByClassName("edit edit-new");
                edits[0].style.display = "none";
                let likes = nodes[i].getElementsByClassName("like like-new");
                likes[0].style.display = "none";
            }
        },


        //Удаление поста
        deletePhotoPsotDom: function (ids) {
            // Modul.removePhotoPost(ids);
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute('id') === String(ids)) {
                    document.body.removeChild(nodes[i]);
                    nodes[i].setAttribute('delete', true);
                    console.log(nodes[i]);
                    shown--;
                }
            }
            for (let i = 0; i < newMassive.length; i++) {
                if (newMassive[i].id === String(ids)) {
                    newMassive[i].del = true;
                    DomModul.uploadLocal();
                }
            }
        },


        likePhotoPostDom: function (ids) {
            for (let i = 0; i < newMassive.length; i++) {
                if (newMassive[i].id === String(ids)) {
                    if (newMassive[i].likes.indexOf(account.textContent) === -1) {
                        newMassive[i].likes.push(account.textContent);
                        console.log(account.textContent);
                        console.log(newMassive[i].likes);
                        DomModul.uploadLocal();
                    }
                }
            }
        },


        //Редактирование фотопоста
        editPhotoPostDom: function (id, object) {
            DomModul.editPhotoPost(id, object);
            for (let i = 0; i < nodes.length; i++) {
                if (String(nodes[i].getAttribute('id')) === String(id)) {
                    let temp;
                    for (let i = 0; i < newMassive.length; i++) {
                        if (newMassive[i].id === String(id)) {
                            temp = newMassive[i];
                        }
                    }
                    let div = createPostDom(temp.author, temp.description, temp.photolink, temp.hashtags, temp.likes, temp.createdAt, temp.id, false);
                    let posts = document.getElementsByClassName('post');
                    for (let j = 0; j < posts.length; j++) {
                        if (posts[j].getAttribute('id') === String(id)) {
                            document.body.replaceChild(div, posts[j]);
                        }
                    }
                    nodes[i] = div;
                    DomModul.afterLogging();
                    DomModul.uploadLocal();
                }
            }
        },


        //Очистка ленты
        clearTape: function () {
            let files = document.getElementsByClassName('post');
            while (files.length > 0) {
                let del = files[0];
                document.body.removeChild(del);
            }
        },


        //Отображение постов
        showPosts: function (ten) {
            let authors = [];
            let list = document.getElementById('authors');
            let lists = list.children;
            loadMore = document.getElementById('moreBtn');
            let num = 0;//счётчик для установки последнего фотопоста
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].getAttribute('delete') !== 'true' && num < ten) {
                    num++;
                    shown++;
                    document.body.insertBefore(nodes[i], loadMore);
                    if (authors.indexOf(newMassive[i].author) === -1) {
                        authors.push(newMassive[i].author);
                    }
                }
            }
            for (let j = 0; j < authors.length; j++) {
                let option = document.createElement('option');
                option.setAttribute('value', authors[j]);
                list.appendChild(option);
            }
        },


        editPhotoPost: function (id, object) {
            for (var i = 0; i < newMassive.length; i++) {
                if (String(newMassive[i].id) === String(id)) {
                    var temp = {};
                    for (var key in newMassive[i]) {
                        temp[key] = newMassive[i][key];
                    }
                    for (var key in object) {
                        switch (key) {
                            case 'description':
                                temp.description = object.description;
                                break;
                            case 'photolink':
                                temp.photolink = object.photolink;
                                break;
                            case 'hashtags':
                                temp.hashtags = object.hashtags;
                                break;
                        }
                    }
                    if (DomModul.validatePhotoPost(temp) === true) {
                        newMassive[i] = temp;
                        return true;
                    }
                }
            }
            return false;
        },


        validatePhotoPost: function (object) {
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
                            console.log('Wrong type!');
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
                        if ((object.createdAt instanceof Date) == false) {
                            console.log('Wrong type!');
                            return false;
                        }
                        break;
                    case 'photolink':
                        if (object.photolink.length == 0) {
                            console.log('Empty photoLink field');
                            return false;
                        }
                    case 'author':
                        if (object.author.length == 0) {
                            console.log('Empty author field');
                            return false;
                        }
                }
            }
            return true;
        },


        testing: function () {
            DomModul.showPosts();
            console.log(nodes);
            console.log('Удаление поста с ID 12');
            DomModul.deletePhotoPsotDom(12);
            console.log(nodes);

            console.log('Изменение поста с id 2');
            DomModul.editPhotoPostDom(2, {description: 'Hello world'});
            console.log(nodes);

            console.log('Добавление поста');
            DomModul.addPhotoPostDom('Author', 'Nothing', 'Pictures/Brest.jpg', ['Hello'], []);
            console.log('nodes');
        }
    }
})
();