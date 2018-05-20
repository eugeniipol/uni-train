let addBox = document.getElementById('addForm');

let model = (function () {
    let users = [];
    let newMassive = [];
    let nodes = [];

    getPostsAsync();


    async function getUsersAsync(name, password) {
        await getUsersProm(name, password);
    }


    function getUsersProm(name, password) {
        return new Promise(function (resolve, reject) {
            xhr = new XMLHttpRequest();
            xhr.open('POST', '/login');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.onload = function () {
                if (this.status === 200) {
                    userNewName = xhr.responseText;
                    console.log(userNewName);
                    view.pressLogYes(userNewName);
                    resolve(this.response);
                }
                else {
                    let logBox = document.getElementById('logInBox');
                    alert("Wrong user or password");
                    logBox.style.display = "none";
                    //let error = new Error(this.statusText);
                   // error.code = this.status;
                   // reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network Error'));
            };
            let user = JSON.stringify({"username":name,"password":password});
            console.log(user);
            xhr.send(user);
        })
    }


    function deletePostProm(ids) {
        return new Promise(function (resolve, reject) {
            xhr = new XMLHttpRequest();
            xhr.open('DELETE', '/removePhotoPost?id=' + ids);
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                }
                else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network Error'));
            };
            xhr.send();
        });
    }


    function editPostProm(temp, id) {
        return new Promise(function (resolve, reject) {
            xhr = new XMLHttpRequest();
            xhr.open('PUT', '/editPhotoPost?id=' + id);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = function () {
                if (this.status === 200) {
                    resolve(this.response);
                }
                else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network Error'));
            };
            xhr.send(JSON.stringify(temp));
        });
    }


    async function getPostsAsync() {
        await getPostsProm();
    }

    function getPostsProm() {
        return new Promise(function (resolve, reject) {
            xhr = new XMLHttpRequest();
            xhr.open('GET', '/getPhotoPostsAll');
            xhr.onload = function () {
                if (this.status === 200) {
                    newMassive = JSON.parse(xhr.responseText);
                    for (let i = 0; i < newMassive.length; i++) {
                        if (i === newMassive.length - 1) {
                            ids = parseInt(newMassive[i].id) + 1;
                        }
                        let div = createPostDom(newMassive[i].author, newMassive[i].description, newMassive[i].photolink, newMassive[i].hashtags, newMassive[i].likes, newMassive[i].createdAt, newMassive[i].id, newMassive[i].del);
                        nodes[i] = div;
                    }
                    resolve(this.response);
                }
                else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network Error'));
            };
            xhr.send();
        });
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

    function getUsers() {
        return users;
    }

    return {
        users, getUsers, newMassive, nodes, getNodes, getNewMassive, createPostDom, deletePostProm, editPostProm, getUsersProm, getUsersAsync//getUsers
    }
})();
