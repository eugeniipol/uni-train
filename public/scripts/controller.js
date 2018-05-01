let controller = (function () {
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


    let shown = 0;//переменная для отображения показанных постов.


    let newMassive = [];
    let nodes = [];


    let hashs = [];//Массив хэшTегов(фильTры) DOM
    let hashtags = [];//Массив хэштегов JS
    let hashsAdd = [];//Массив хэштегов для нового фото DOM
    let hashtagsAdd = [];//Массив хэштегов для нового фото JS


    //Кнопка log in/out
    logBtn.addEventListener("click", function () {
        view.pressLog();
    });


    spanLog.addEventListener("click", function () {
        view.pressLogCross();
    });


    logIn.addEventListener("click", function () {
            model.getUsers();
        }
    )


    //Кнока добавить пост
    addBtn.addEventListener("click", function () {
        view.addPostOpen();
    });


    //крест в addPhoto боксе
    spanAdd.addEventListener("click", function () {
        view.addPostClose();
    });


    //Добавление хэштега в списке фильтров
    addTag.addEventListener("click", function () {
        let hashtagsInput = document.getElementById("hashtahgsInput").value;
        if (hashtags.indexOf(hashtagsInput) === -1) {
            view.addHashFilter(hashtagsInput);
        }
    });


    //Добавление хэштега в создании поста
    newHashBtn.addEventListener("click", function () {
        let hashtagsInput = document.getElementById("newHashtag").value;
        view.createHashtagPost(hashtagsInput);
    });


    load.addEventListener("click", function () {
        view.showPosts(view.getShown() + 10);
    });


    refresh.addEventListener("click", function () {
        view.filterPosts();
    });


    newPost.addEventListener("click", function () {
        if (controller.repaired === false) {
            let descriptText = document.getElementById("descriptText").value;
            let createdAt = document.getElementById("addData").textContent;
            let likes = [];
            let filePath = "Pictures/" + fileChooser.files[0].name;
            let formData = new FormData();
            formData.append('file', fileChooser.files[0]);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/uploadImage');
            xhr.send(formData);
            view.addPhotoPostDom(account.textContent, descriptText, filePath, hashtagsAdd, likes);
            view.afterLogging();
            addBox.style.display = "none";
        }
        else {
            let newLink = "";
            if (fileChooser.files[0] !== undefined) {
                newLink = "Pictures/" + fileChooser.files[0].name;
            }
            else {
                newLink = templink;
            }
            let object = {
                photolink: newLink,
                description: descriptText.value,
                hashtags: hashtagsAdd
            }
            view.editPhotoPostDom(tempid, object);
            view.clearTape();
            view.showPosts(shown);
            addBox.style.display = "none";
            controller.repaired = false;
        }
    })



    return {
        hashs, hashtags, hashsAdd, hashtagsAdd, repaired //getNewMassive, getNodes, nodes, newMassive
    }

})()
