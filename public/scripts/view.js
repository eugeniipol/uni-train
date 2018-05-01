let view = (function () {
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
    let repaired = false;

    let entered = false;
    let shown = 0;

    //Кнопка log in/out
    function pressLog() {
        if (entered === false) {
            logBox.style.display = "block"
        }
        else {
            entered = false;
            addBtn.style.display = "none";
            logText.textContent = "Log in";
            account.textContent = null;
            afterLoggingOut();
            DomModul.showPosts();
        }
    }


    function pressLogCross() {
        logBox.style.display = "none";
    }


    function pressLogYes(users) {
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
                afterLogging();
                showPosts();
                return;
            }
        }
        alert("Wrong user or password");
        logBox.style.display = "none";
    }


    function addPostOpen() {
        addBox.style.display = "block";
        let author = document.getElementById("author-add");
        author.textContent = account.textContent;
        let curDate = new Date();
        addData.textContent = String(curDate);
    }


    function addPostClose() {
        addBox.style.display = "none";
    }


    function addHashFilter(hashtagsInput) {
        let filterBar = document.getElementById("filterBar");
        let div = createHashtagFilter(hashtagsInput);
        filterBar.insertBefore(div, refresh);
        div.addEventListener("click", function () {
            controller.hashs.splice(controller.hashs.indexOf(div), 1);
            controller.hashtags.splice(controller.hashtags.indexOf(hashtagsInput), 1);
            filterBar.removeChild(div);
        })
        controller.hashs.push(div);
        controller.hashtags.push(hashtagsInput);
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


    //Добавление хештега в создании поста
    function createHashtagPost(hashtagsInput) {
        let settings = document.getElementById("settings");
        let div = createHashtagFilterAdd(hashtagsInput);
        let newPost = document.getElementById("newPost");
        settings.appendChild(div);
        div.addEventListener("click", function () {
            controller.hashsAdd.splice(controller.hashsAdd.indexOf(div), 1);
            controller.hashtagsAdd.splice(controller.hashtagsAdd.indexOf(hashtagsInput), 1);
            settings.removeChild(div);
        });
        controller.hashsAdd.push(div);
        controller.hashtagsAdd.push(hashtagsInput);
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


    function afterLogging() {
        let nodes = model.getNodes();
        let newMassive = model.getNewMassive();
        let login = document.getElementById('account').textContent;
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
        model.nodes = nodes;
        model.newMassive = newMassive;
    }


    function afterLoggingOut() {
        for (let i = 0; i < controller.nodes.length; i++) {
            let deletes = controller.nodes[i].getElementsByClassName("delete delete-new");
            deletes[0].style.display = "none";
            let edits = controller.nodes[i].getElementsByClassName("edit edit-new");
            edits[0].style.display = "none";
            let likes = controller.nodes[i].getElementsByClassName("like like-new");
            likes[0].style.display = "none";
        }
    }


    function showPosts(ten) {
        shown = 0;
        nodes = model.getNodes();
        newMassive = model.getNewMassive();
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
    }


    //Очистка ленты
    function clearTape() {
        let files = document.getElementsByClassName('post');
        while (files.length > 0) {
            let del = files[0];
            document.body.removeChild(del);
        }
    }


    function filterPosts() {
        let newMassive = model.getNewMassive();
        let nodes = model.getNodes();
        clearTape();
        shown = 0;
        let authorIs = document.getElementById("authorIs");
        let authorInput = document.getElementById("authorInput").value;
        let dataIs = document.getElementById("dataIs");
        let dayInput = document.getElementById("dayInput").value;
        let mounthInput = document.getElementById("mounthInput").value;
        let yearInput = document.getElementById("yearInput").value;
        let hashtagsIs = document.getElementById("hashtahgsIs");
        model.nodes.splice(0, nodes.length);
        let filterConfig = {};
        filterConfig.author = false;
        filterConfig.hashtags = false;
        if (authorIs.checked === true) {
            filterConfig.author = authorInput;
        }
        if (hashtagsIs.checked === true) {
            filterConfig.hashtags = controller.hashtags;
        }
        if (dataIs.checked === true) {
            filterConfig.data = new Date(yearInput, (mounthInput - 1), dayInput);
        }
        for (let i = 0; i < newMassive.length; i++) {
            if (checkFilters(newMassive[i], filterConfig)) {
                let div = model.createPostDom(newMassive[i].author, newMassive[i].description, newMassive[i].photolink, newMassive[i].hashtags, newMassive[i].likes, newMassive[i].createdAt, newMassive[i].id, newMassive[i].del);
                model.nodes.push(div);
            }
        }
        if (entered === true) {
            afterLogging();
        }
        showPosts(shown + 10);
    }


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


    //Добавление нового фотопоста
    function addPhotoPostDom(author, descript, link, hashtags, likes) {
        let ids = model.getNodes().length + 1;
        let nodes = model.getNodes();
        let newMassive = model.getNewMassive();
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
        console.log(idst);
        if (Modul.addPhotoPost(newPost) === true) {
            let dat = new Date();
            let div = model.createPostDom(author, descript, link, hashtags, likes, dat, idst, false);
            nodes.unshift(div);
            let filter = document.getElementById('filterBar');
            document.body.insertBefore(div, (filter).nextSibling);
            model.newMassive.unshift(newPost);
            ids++;
            xhr = new XMLHttpRequest();
            xhr.open('POST', '/addPhotoPost');
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (xhr.status !== 200) {
                    console.log(xhr.status + ': ' + xhr.statusText);
                }
                else {
                }
            }
            xhr.send(JSON.stringify(newPost));
        }
        model.newMassive = newMassive;
        model.nodes = nodes;
    }

    //Удаление поста
    function deletePhotoPsotDom(ids) {
        let nodes = model.getNodes();
        let newMassive = model.getNewMassive();
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
            }
        }
        model.deletePost(ids);
        model.newMassive = newMassive;
        model.nodes = nodes;
    }


    function likePhotoPostDom(ids) {
        let nodes = model.getNodes();
        let newMassive = model.getNewMassive();
        for (let i = 0; i < newMassive.length; i++) {
            if (newMassive[i].id === String(ids)) {
                if (newMassive[i].likes.indexOf(account.textContent) === -1) {
                    newMassive[i].likes.push(account.textContent);
                    console.log(account.textContent);
                    console.log(newMassive[i].likes);
                }
            }
        }
        model.newMassive = newMassive;
        model.nodes = nodes;
    }


    function getShown() {
        return shown;
    }


    function getRepaired() {
        return repaired
    }


    function editPhotoPostDom(id, object) {
        let nodes = model.getNodes();
        let newMassive = model.getNewMassive();
        editPhotoPost(id, object);
        for (let i = 0; i < nodes.length; i++) {
            if (String(nodes[i].getAttribute('id')) === String(id)) {
                let temp;
                for (let i = 0; i < newMassive.length; i++) {
                    if (newMassive[i].id === String(id)) {
                        temp = newMassive[i];
                    }
                }
                let div = model.createPostDom(temp.author, temp.description, temp.photolink, temp.hashtags, temp.likes, temp.createdAt, temp.id, false);
                let posts = document.getElementsByClassName('post');
                for (let j = 0; j < posts.length; j++) {
                    if (posts[j].getAttribute('id') === String(id)) {
                        document.body.replaceChild(div, posts[j]);
                    }
                }
                nodes[i] = div;
                afterLogging();
                model.editPost(temp, id);
            }
        }
        model.nodes = nodes;
        model.newMassive = newMassive;
    }


    function editPhotoPost(id, object) {
        let nodes = model.getNodes();
        let newMassive = model.getNewMassive();
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
                temp.createdAt = new Date(temp.data);
                if (validatePhotoPost(temp) === true) {
                    newMassive[i] = temp;
                    model.nodes = nodes;
                    model.newMassive = newMassive;
                    return true;
                }
            }
        }
        return false;
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
    }


    return {
        pressLog,
        pressLogCross,
        pressLogYes,
        addPostOpen,
        addPostClose,
        addHashFilter,
        createHashtagPost,
        createHashtagFilterAdd,
        showPosts,
        getShown,
        filterPosts,
        checkFilters,
        getRepaired,
        addPhotoPostDom,
        afterLogging,
        deletePhotoPsotDom,
        likePhotoPostDom,
        editPhotoPostDom,
        clearTape
    }


})()

