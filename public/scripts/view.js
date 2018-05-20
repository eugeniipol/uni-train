const view = (function () {
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

  let entered = false;
  let shown = 0;

  // Кнопка log in/out
  function pressLog() {
    if (entered === false) {
      logBox.style.display = 'block';
    } else {
      entered = false;
      addBtn.style.display = 'none';
      logText.textContent = 'Log in';
      account.textContent = null;
      afterLoggingOut();
      showPosts();
    }
  }


  function pressLogCross() {
    logBox.style.display = 'none';
  }


  function pressLogYes(users) {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const user = { username: login, password };
    for (let i = 0; i < users.length; i++) {
      if (String(users[i].username) === String(user.username) && String(users[i].password) === String(user.password)) {
        account.textContent = login;
        entered = true;
        addBtn.style.display = 'inline-block';
        logText.textContent = 'Log out';
        logBox.style.display = 'none';
        afterLogging();
        showPosts();
        return;
      }
    }
    alert('Wrong user or password');
    logBox.style.display = 'none';
  }


  function addPostOpen() {
    addBox.style.display = 'block';
    const author = document.getElementById('author-add');
    author.textContent = account.textContent;
    const curDate = new Date();
    addData.textContent = String(curDate);
  }


  function addPostClose() {
    addBox.style.display = 'none';
  }


  function addHashFilter(hashtagsInput) {
    const filterBar = document.getElementById('filterBar');
    const div = createHashtagFilter(hashtagsInput);
    filterBar.insertBefore(div, refresh);
    div.addEventListener('click', () => {
      controller.hashs.splice(controller.hashs.indexOf(div), 1);
      controller.hashtags.splice(controller.hashtags.indexOf(hashtagsInput), 1);
      filterBar.removeChild(div);
    });
    controller.hashs.push(div);
    controller.hashtags.push(hashtagsInput);
  }


  function createHashtagFilter(hashtag) {
    const div = document.createElement('div');
    div.className = 'hashtag';
    const img = document.createElement('img');
    const text = document.createElement('b');
    text.textContent = ` #${hashtag}`;
    img.className = 'filter';
    img.setAttribute('src', 'Styles/cross.png');
    img.setAttribute('alt', 'cross');
    img.setAttribute('width', '1.5%');
    div.appendChild(img);
    div.appendChild(text);
    return div;
  }


  // Добавление хештега в создании поста
  function createHashtagPost(hashtagsInput) {
    const settings = document.getElementById('settings');
    const div = createHashtagFilterAdd(hashtagsInput);
    const newPost = document.getElementById('newPost');
    settings.appendChild(div);
    div.addEventListener('click', () => {
      controller.hashsAdd.splice(controller.hashsAdd.indexOf(div), 1);
      controller.hashtagsAdd.splice(controller.hashtagsAdd.indexOf(hashtagsInput), 1);
      settings.removeChild(div);
    });
    controller.hashsAdd.push(div);
    controller.hashtagsAdd.push(hashtagsInput);
  }


  function createHashtagFilterAdd(hashtag) {
    const div = document.createElement('div');
    div.className = 'hashtag';
    const img = document.createElement('img');
    const text = document.createElement('b');
    text.textContent = ` #${hashtag}`;
    img.className = 'filter';
    img.setAttribute('src', 'Styles/cross.png');
    img.setAttribute('alt', 'cross');
    img.setAttribute('width', '5%');
    div.appendChild(img);
    div.appendChild(text);
    return div;
  }


  function afterLogging() {
    const nodes = model.getNodes();
    const newMassive = model.getNewMassive();
    const login = document.getElementById('account').textContent;
    for (let i = 0; i < nodes.length; i++) {
      const authorName = nodes[i].getElementsByClassName('name new-name');
      if (authorName[0].textContent === account.textContent) {
        const deletes = nodes[i].getElementsByClassName('delete delete-new');
        deletes[0].style.display = 'inline-block';
        const edits = nodes[i].getElementsByClassName('edit edit-new');
        edits[0].style.display = 'inline-block';
      }
      const likes = nodes[i].getElementsByClassName('like like-new');
      likes[0].style.display = 'inline-block';
    }
    model.nodes = nodes;
    model.newMassive = newMassive;
  }


  function afterLoggingOut() {
    const nodes = model.getNodes();
    const newMassive = model.getNewMassive();
    for (let i = 0; i < nodes.length; i++) {
      const deletes = nodes[i].getElementsByClassName('delete delete-new');
      deletes[0].style.display = 'none';
      const edits = nodes[i].getElementsByClassName('edit edit-new');
      edits[0].style.display = 'none';
      const likes = nodes[i].getElementsByClassName('like like-new');
      likes[0].style.display = 'none';
    }
    model.nodes = nodes;
    model.newMassive = newMassive;
  }


  function showPosts(ten) {
    shown = 0;
    nodes = model.getNodes();
    newMassive = model.getNewMassive();
    const authors = [];
    const list = document.getElementById('authors');
    const lists = list.children;
    loadMore = document.getElementById('moreBtn');
    let num = 0;// счётчик для установки последнего фотопоста
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
      const option = document.createElement('option');
      option.setAttribute('value', authors[j]);
      list.appendChild(option);
    }
  }


  // Очистка ленты
  function clearTape() {
    const files = document.getElementsByClassName('post');
    while (files.length > 0) {
      const del = files[0];
      document.body.removeChild(del);
    }
  }


  function filterPosts() {
    const newMassive = model.getNewMassive();
    const nodes = model.getNodes();
    clearTape();
    shown = 0;
    const authorIs = document.getElementById('authorIs');
    const authorInput = document.getElementById('authorInput').value;
    const dataIs = document.getElementById('dataIs');
    const dayInput = document.getElementById('dayInput').value;
    const mounthInput = document.getElementById('mounthInput').value;
    const yearInput = document.getElementById('yearInput').value;
    const hashtagsIs = document.getElementById('hashtahgsIs');
    model.nodes.splice(0, nodes.length);
    const filterConfig = {};
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
        const div = model.createPostDom(newMassive[i].author, newMassive[i].description, newMassive[i].photolink, newMassive[i].hashtags, newMassive[i].likes, newMassive[i].createdAt, newMassive[i].id, newMassive[i].del);
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


  // Добавление нового фотопоста
  function addPhotoPostDom(author, descript, link, hashtags, likes) {
    let ids = model.getNodes().length + 1;
    const nodes = model.getNodes();
    const newMassive = model.getNewMassive();
    idst = String(ids);
    const newPost = {
      id: idst,
      author,
      description: descript,
      createdAt: new Date(),
      photolink: link,
      hashtags,
      likes,
    };
    console.log(idst);
    if (Modul.addPhotoPost(newPost) === true) {
      const dat = new Date();
      const div = model.createPostDom(author, descript, link, hashtags, likes, dat, idst, false);
      nodes.unshift(div);
      const filter = document.getElementById('filterBar');
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
          console.log(`${xhr.status}: ${xhr.statusText}`);
        } else {
        }
      };
      xhr.send(JSON.stringify(newPost));
    }
    model.newMassive = newMassive;
    model.nodes = nodes;
  }

  // Удаление поста
  function deletePhotoPsotDom(ids) {
    const nodes = model.getNodes();
    const newMassive = model.getNewMassive();
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
    model.deletePostProm(ids);
    model.newMassive = newMassive;
    model.nodes = nodes;
  }


  function likePhotoPostDom(ids) {
    const nodes = model.getNodes();
    const newMassive = model.getNewMassive();
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
    return repaired;
  }


  function editPhotoPostDom(id, object) {
    const nodes = model.getNodes();
    const newMassive = model.getNewMassive();
    editPhotoPost(id, object);
    for (let i = 0; i < nodes.length; i++) {
      if (String(nodes[i].getAttribute('id')) === String(id)) {
        let temp;
        for (let i = 0; i < newMassive.length; i++) {
          if (newMassive[i].id === String(id)) {
            temp = newMassive[i];
          }
        }
        const div = model.createPostDom(temp.author, temp.description, temp.photolink, temp.hashtags, temp.likes, temp.createdAt, temp.id, false);
        const posts = document.getElementsByClassName('post');
        for (let j = 0; j < posts.length; j++) {
          if (posts[j].getAttribute('id') === String(id)) {
            document.body.replaceChild(div, posts[j]);
          }
        }
        nodes[i] = div;
        afterLogging();
        model.editPostProm(temp, id);
      }
    }
    model.nodes = nodes;
    model.newMassive = newMassive;
  }


  function editPhotoPost(id, object) {
    const nodes = model.getNodes();
    const newMassive = model.getNewMassive();
    for (let i = 0; i < newMassive.length; i++) {
      if (String(newMassive[i].id) === String(id)) {
        const temp = {};
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
      console.log("Absent 'id' fields");
      return false;
    }
    if (!object.description) {
      console.log("Absent 'description' field");
      return false;
    }
    if (!object.author) {
      console.log("Absent 'author' field");
      return false;
    }
    if (!object.createdAt) {
      console.log("Absent 'createdAt' field");
      return false;
    }
    if (!object.hashtags) {
      console.log("Absent 'hashtags' field");
      return false;
    }
    if (!object.likes) {
      console.log("Absent 'likes' field");
      return false;
    }
    if (!object.photolink) {
      console.log("Absent 'photolink' field");
      return false;
    }
    for (const key in object) {
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
    clearTape,
  };
}());

