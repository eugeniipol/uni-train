(function () {
    var photoPosts = [{
        id: '1',
        description: 'Mirskiy castle',
        createdAt: new Date(2016, 05, 4),
        author: 'Vitaut',
        photolink: 'Pictures/castle.jpg',
        hashtags: ['beauty', 'Belarus'],
        likes: ['Vasya', 'Eugeniipol']
    },
        {
            id: '2',
            description: 'Bizon',
            createdAt: new Date(2016, 03, 4),
            author: 'Vasya',
            photolink: 'Pictures/bison.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Eugeniipol']
        },
        {
            id: '3',
            description: 'Polotsk',
            createdAt: new Date(2017, 12, 4),
            author: 'Eugeniipol',
            photolink: 'Pictures/Polotsk.jpg',
            hashtags: ['Belarus'],
            likes: ['Vitaut', 'Vasya']
        },
        {
            id: '4',
            description: 'Nesvizhskiy castle',
            createdAt: new Date(2018, 01, 14),
            author: 'Vitaut',
            photolink: 'Pictures/Nesvizh.png',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vasya', 'Eugeniipol']
        },
        {
            id: '5',
            description: 'Homel',
            createdAt: new Date(2014, 03, 09),
            author: 'Vitaut',
            photolink: 'Pictures/Homel.jpg',
            hashtags: ['Belarus'],
            likes: ['Vasya', 'Eugeniipol']
        },
        {
            id: '6',
            description: 'Vitebsk',
            createdAt: new Date(2017, 05, 9),
            author: 'Eugeniipol',
            photolink: 'Pictures/Vitebsk.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Vasya']
        },
        {
            id: '7',
            description: 'Grodno',
            createdAt: new Date(2014, 11, 12),
            author: 'Vasya',
            photolink: 'Pictures/Grodno.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Eugeniipol']
        },
        {
            id: '8',
            description: 'Brest',
            createdAt: new Date(2016, 05, 13),
            author: 'Vitaut',
            photolink: 'Pictures/Brest.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vasya', 'Eugeniipol']
        },
        {
            id: '9',
            description: 'Mogilev',
            createdAt: new Date(2016, 05, 14),
            author: 'Vasya',
            photolink: 'Pictures/Mogilev.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Eugeniipol']
        },
        {
            id: '10',
            description: 'Minsk',
            createdAt: new Date(2016, 05, 16),
            author: 'Eugeniipol',
            photolink: 'Pictures/Minsk.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Vasya']
        },
        {
            id: '11',
            description: 'Mir',
            createdAt: new Date(2016, 01, 4),
            author: 'Vasya',
            photolink: 'Pictures/castle.jpg',
            hashtags: [],
            likes: ['Eugeniipol']
        },
        {
            id: '12',
            description: 'Zubr',
            createdAt: new Date(2017, 08, 04),
            author: 'Vitaut',
            photolink: 'Pictures/bison.jpg',
            hashtags: ['beauty'],
            likes: ['Vitaut', 'Eugeniipol']
        },
        {
            id: '13',
            description: 'Old city',
            createdAt: new Date(2018, 01, 04),
            author: 'Eugeniipol',
            hashtags: ['Belarus'],
            likes: []
        },
        {
            id: '14',
            description: 'Nesvizh',
            createdAt: new Date(2018, 01, 14),
            author: 'Vitaut',
            photolink: 'Pictures/Nesvizh.png',
            hashtags: [],
            likes: ['Vasya']
        },
        {
            id: '15',
            description: 'Palace',
            createdAt: new Date(2013, 12, 12),
            author: 'Vitaut',
            photolink: 'Pictures/Homel.jpg',
            hashtags: [],
            likes: ['Eugeniipol']
        },
        {
            id: '16',
            description: 'Hills',
            createdAt: new Date(2013, 07, 23),
            author: 'Eugeniipol',
            photolink: 'Pictures/Vitebsk.jpg',
            hashtags: ['beauty'],
            likes: []
        },
        {
            id: '17',
            description: 'Skyline',
            createdAt: new Date(2017, 12, 31),
            author: 'Vasya',
            photolink: 'Pictures/Grodno.jpg',
            hashtags: [],
            likes: ['Vitaut', 'Eugeniipol']
        },
        {
            id: '18',
            description: 'Sovietskaya street',
            createdAt: new Date(2017, 08, 14),
            author: 'Vitaut',
            photolink: 'Pictures/Brest.jpg',
            hashtags: ['Belarus'],
            likes: ['Vasya']
        },
        {
            id: '19',
            description: 'Theatre',
            createdAt: new Date(2012, 11, 14),
            author: 'Vasya',
            photolink: 'Pictures/Mogilev.jpg',
            hashtags: ['culture'],
            likes: ['Vitaut']
        },
        {
            id: '20',
            description: 'Big city life',
            createdAt: new Date(2017, 06, 06),
            author: 'Eugeniipol',
            photolink: 'Pictures/Minsk.jpg',
            hashtags: ['evening'],
            likes: ['Vitaut', 'Vasya']
        }
    ]


    function getPhotoPosts(begin, number, filterCondig) {
        if (begin > photoPosts.length) {
            console.log('Overflow');
            return;
        }
        var newPosts = [];
        begin = begin || 0;
        number = number || 10;
        var count = 0;
        var j = 0;
        var i = begin;
        if (filterCondig) {
            while (i < photoPosts.length && j < number) {
                if (checkFilters(photoPosts[i], filterCondig)) {
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
            a = new Date(a.createdAt);
            b = new Date(b.createdAt);
            return a > b ? -1 : a < b ? 1 : 0;
        });
        return newPosts;
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
        return true;
    }


    function getPhotoPost(number) {
        if (number < photoPosts.length && number >= 0) {
            for (var i = 0; i < photoPosts.length; i++) {
                if (number == photoPosts[i].id) {
                    return photoPosts[i];
                }
            }
        }
        else {
            console.log('Overflow!');
            return;
        }
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
                case 'photoLin':
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


    function addPhotoPost(element) {
        for (var k = 0; k < photoPosts.length; k++) {
            if (photoPosts[k].id === element.id) {
                console.log('Element with such ID already exists');
                return false;
            }
        }
        if (validatePhotoPost(element) == true) {
            photoPosts.push(element);
            return true;
        }
        return false;
    }


    function editPhotoPost(id, object) {
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id == id) {
                var temp = {};
                for (var key in photoPosts[i]) {
                    temp[key] = photoPosts[i][key];
                }
                for (var key in object) {
                    switch (key) {
                        case 'description':
                            temp.description = object.description;
                            break;
                        case 'photoLink':
                            temp.description = object.description;
                            break;
                        case 'Hashtags':
                            temp.hashtags = object.hashtags;
                    }
                }
                if (validatePhotoPost(temp) == true) {
                    photoPosts[i] = temp;
                    return true;
                }
            }
        }
        return false;
    }


    function removePhotoPost(object) {
        var idx = object - 1;
        if (idx < photoPosts.length && idx >= 0) {
            photoPosts.splice(idx, 1);
            return true;
        }
        return false;
    }


//Получение новых массивов:
    var newMassive = [];
    var newMassiveAuthor = [];
    var newMassiveHashAuthor = [];
    var newShowMassive = [];
//Новый массив отфильтрованый по хэштегам и автору
    newMassiveHashAuthor = getPhotoPosts(1, 8, {hashtags: ['beauty'], author: 'Vitaut'});
    console.log(newMassiveHashAuthor);
//Новый массив отфильтрованый только по автору
    newMassiveAuthor = getPhotoPosts(1, 8, {author: 'Eugeniipol'});
    console.log(newMassiveAuthor);
//Новый массив без применения фильтров
    newMassive = getPhotoPosts(1, 8);
    console.log(newMassive);
//Создание массива эквивалентного исходному для наглядной демонстрации работы методов
    newShowMassive = getPhotoPosts(0, 20);
    console.log(newShowMassive);


//Получение объекта по id
    var photoPost = getPhotoPost(10);
    console.log(photoPost);
//Выход за пределы массива
    var falsePhotoPost = getPhotoPost(22);
    console.log(falsePhotoPost);


//Проверка на валидность элемента
    console.log(validatePhotoPost(photoPosts[3]));
//Проверка на валидность даёт отрицательный резульатат
    console.log(validatePhotoPost((photoPosts[12])));


//Добавленеи объекта в массив
    var addObject = {
        id: '22',
        description: 'New castle',
        createdAt: new Date(2017, 04, 28),
        author: 'Eugeniipol',
        photolink: 'Pictures/Minsk.jpg',
        hashtags: ['beauty'],
        likes: []
    }
    console.log(addPhotoPost(addObject));
    console.log(photoPosts);
//Объект не пройдёт проверку на валидность и добавление не произойдёт
    var addFasleObject = {
        id: '23',
        description: 'Fasle object',
        author: 'Somebody',
        hashtags: [],
        likes: []
    }
    console.log(addPhotoPost(addFasleObject));


//Изменение фотопоста
    console.log(editPhotoPost(2, {description: 'Hello world'}));
//Вывод изменённого элемента(в скопированных в самом начале массивах, объект c id = 2 имеет другое описание)
    console.log(photoPosts[1]);


//Удаление фотопоста(в скопированном в самом начале массиве, элемент с таким id существует)
    removePhotoPost(5);
    console.log(photoPosts);
})();



