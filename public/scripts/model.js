let addBox = document.getElementById('addForm');

let model = (function () {
    let users = [];
    let newMassive = [];
    let nodes = [];

    function getUsers()
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/getUsers');
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
                return;
            }
            else {
                users = JSON.parse(xhr.responseText);
                console.log(users);
                view.pressLogYes(users);
                return 'hui';
            }
        }
        xhr.send();
    }


    function deletePost(ids){
        xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/removePhotoPost?id=' + ids);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
        xhr.send();
    }


    function editPost(temp, id){
        xhr = new XMLHttpRequest();
        xhr.open('PUT', '/editPhotoPost?id=' + id);
        xhr.setRequestHeader('Content-type', 'application/json');
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
        xhr.send(JSON.stringify(temp));
        return;
    }


    xhr = new XMLHttpRequest();
    xhr.open('GET', '/getPhotoPostsAll');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) {
            return;
        }
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
        else {
            newMassive = JSON.parse(xhr.responseText);
            for (let i = 0; i < newMassive.length; i++) {
                if (i === newMassive.length - 1) {
                    ids = parseInt(newMassive[i].id) + 1;
                }
                let div = createPostDom(newMassive[i].author, newMassive[i].description, newMassive[i].photolink, newMassive[i].hashtags, newMassive[i].likes, newMassive[i].createdAt, newMassive[i].id, newMassive[i].del);
                nodes[i] = div;
            }
            //controller.getNewMassive(newMassive);
            //controller.getNodes(nodes);

        }
    }
    xhr.send();


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
            view.deletePhotoPsotDom(id);
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
            controller.repaired = true;
            addBox.style.display = "block";
            let author = document.getElementById("author-add");
            author.textContent = account.textContent;
            addData.textContent = createdAt;
            descriptText.textContent = descript;
            let img = document.getElementById("photoToPost");
            img.setAttribute("src", link);
            controller.hashtagsAdd = hashtags;
            controller.hashsAdd.splice(0, controller.hashsAdd.length);
            let settings = document.getElementById("settings");
            for (let i = 0; i < hashtags.length; i++) {
                let div = view.createHashtagFilterAdd(hashtags[i]);
                settings.appendChild(div);
                div.addEventListener("click", function () {
                    controller.hashsAdd.splice(controller.hashsAdd.indexOf(div), 1);
                    controller.hashtagsAdd.splice(controller.hashtagsAdd.indexOf(hashtags[i]), 1);
                    settings.removeChild(div);
                    console.log(hashtags);
                });
                controller.hashs.push(div);
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
            view.likePhotoPostDom(id);
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


    function getNodes() {
        return nodes;
    }

    function getNewMassive() {
        return newMassive;
    }

    return {
        getUsers, users, newMassive, nodes, getNodes, getNewMassive, createPostDom, deletePost, editPost
    }
})();
