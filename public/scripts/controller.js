const controller = (function () {
  const logBtn = document.getElementById('log');
  const logBox = document.getElementById('logInBox');
  const logText = document.getElementById('logText');
  const addBox = document.getElementById('addForm');
  const spanLog = document.getElementsByClassName('close')[0];
  const spanAdd = document.getElementsByClassName('close')[1];
  const logIn = document.getElementById('logIn');
  const account = document.getElementById('account');
  const addBtn = document.getElementById('add');
  const addData = document.getElementById('addData');
  const addAuthor = document.getElementById('author-add');
  const descriptText = document.getElementById('descriptText');
  const refresh = document.getElementById('refreshBtn');
  const load = document.getElementById('load');
  const addTag = document.getElementById('addTag');
  const newHashBtn = document.getElementById('newHashtagButton');
  const newPost = document.getElementById('newPost');
  const fileChooser = document.getElementById('fileChooser');
  const repaired = false;


  const shown = 0;// переменная для отображения показанных постов.


  const newMassive = [];
  const nodes = [];


  const hashs = [];// Массив хэшTегов(фильTры) DOM
  const hashtags = [];// Массив хэштегов JS
  const hashsAdd = [];// Массив хэштегов для нового фото DOM
  const hashtagsAdd = [];// Массив хэштегов для нового фото JS


  // Кнопка log in/out
  logBtn.addEventListener('click', () => {
    view.pressLog();
  });


  spanLog.addEventListener('click', () => {
    view.pressLogCross();
  });


  logIn.addEventListener('click', () => {
    model.getUsersAsync();
  });


  // Кнока добавить пост
  addBtn.addEventListener('click', () => {
    view.addPostOpen();
  });


  // крест в addPhoto боксе
  spanAdd.addEventListener('click', () => {
    view.addPostClose();
  });


  // Добавление хэштега в списке фильтров
  addTag.addEventListener('click', () => {
    const hashtagsInput = document.getElementById('hashtahgsInput').value;
    if (hashtags.indexOf(hashtagsInput) === -1) {
      view.addHashFilter(hashtagsInput);
    }
  });


  // Добавление хэштега в создании поста
  newHashBtn.addEventListener('click', () => {
    const hashtagsInput = document.getElementById('newHashtag').value;
    view.createHashtagPost(hashtagsInput);
  });


  load.addEventListener('click', () => {
    view.showPosts(view.getShown() + 10);
  });


  refresh.addEventListener('click', () => {
    view.filterPosts();
  });


  newPost.addEventListener('click', () => {
    if (controller.repaired === false) {
      const descriptText = document.getElementById('descriptText').value;
      const createdAt = document.getElementById('addData').textContent;
      const likes = [];
      const filePath = `Pictures/${fileChooser.files[0].name}`;
      const formData = new FormData();
      formData.append('file', fileChooser.files[0]);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/uploadImage');
      xhr.send(formData);
      view.addPhotoPostDom(account.textContent, descriptText, filePath, hashtagsAdd, likes);
      view.afterLogging();
      addBox.style.display = 'none';
    } else {
      let newLink = '';
      if (fileChooser.files[0] !== undefined) {
        newLink = `Pictures/${fileChooser.files[0].name}`;
      } else {
        newLink = templink;
      }
      const object = {
        photolink: newLink,
        description: descriptText.value,
        hashtags: hashtagsAdd,
      };
      view.editPhotoPostDom(tempid, object);
      view.clearTape();
      view.showPosts(shown);
      addBox.style.display = 'none';
      controller.repaired = false;
    }
  });


  return {
    hashs, hashtags, hashsAdd, hashtagsAdd, repaired, // getNewMassive, getNodes, nodes, newMassive
  };
}());
