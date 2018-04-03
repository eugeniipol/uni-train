const Modul = (function () {
    var photoPosts = [{
        id: '1',
        description: 'Mirskiy castle',
        createdAt: new Date(2016, 5, 4),
        author: 'Vitaut',
        photolink: 'Pictures/castle.jpg',
        hashtags: ['beauty', 'Belarus'],
        likes: ['Vasya', 'Eugeniipol'],
        del: false
    },
        {
            id: '2',
            description: 'Bizon',
            createdAt: new Date(2016, 3, 4),
            author: 'Vasya',
            photolink: 'Pictures/bison.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Eugeniipol'],
            del: false
        },
        {
            id: '3',
            description: 'Polotsk',
            createdAt: new Date(2017, 12, 4),
            author: 'Eugeniipol',
            photolink: 'Pictures/Polotsk.jpg',
            hashtags: ['Belarus'],
            likes: ['Vitaut', 'Vasya'],
            del: false
        },
        {
            id: '4',
            description: 'Nesvizhskiy castle',
            createdAt: new Date(2018, 1, 14),
            author: 'Vitaut',
            photolink: 'Pictures/Nesvizh.png',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vasya', 'Eugeniipol'],
            del: false
        },
        {
            id: '5',
            description: 'Homel',
            createdAt: new Date(2014, 3, 9),
            author: 'Vitaut',
            photolink: 'Pictures/Homel.jpg',
            hashtags: ['Belarus'],
            likes: ['Vasya', 'Eugeniipol'],
            del: false
        },
        {
            id: '6',
            description: 'Vitebsk',
            createdAt: new Date(2017, 5, 9),
            author: 'Eugeniipol',
            photolink: 'Pictures/Vitebsk.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Vasya'],
            del: false
        },
        {
            id: '7',
            description: 'Grodno',
            createdAt: new Date(2014, 11, 12),
            author: 'Vasya',
            photolink: 'Pictures/Grodno.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Eugeniipol'],
            del: false
        },
        {
            id: '8',
            description: 'Brest',
            createdAt: new Date(2016, 5, 13),
            author: 'Vitaut',
            photolink: 'Pictures/Brest.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vasya', 'Eugeniipol'],
            del: false
        },
        {
            id: '9',
            description: 'Mogilev',
            createdAt: new Date(2016, 5, 14),
            author: 'Vasya',
            photolink: 'Pictures/Mogilev.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Eugeniipol'],
            del: false
        },
        {
            id: '10',
            description: 'Minsk',
            createdAt: new Date(2016, 5, 16),
            author: 'Eugeniipol',
            photolink: 'Pictures/Minsk.jpg',
            hashtags: ['beauty', 'Belarus'],
            likes: ['Vitaut', 'Vasya'],
            del: false
        },
        {
            id: '11',
            description: 'Mir',
            createdAt: new Date(2016, 1, 4),
            author: 'Vasya',
            photolink: 'Pictures/castle.jpg',
            hashtags: [],
            likes: ['Eugeniipol'],
            del: false
        },
        {
            id: '12',
            description: 'Zubr',
            createdAt: new Date(2017, 8, 4),
            author: 'Vitaut',
            photolink: 'Pictures/bison.jpg',
            hashtags: ['beauty'],
            likes: ['Vitaut', 'Eugeniipol'],
            del: false
        },
        {
            id: '13',
            description: 'Old city',
            createdAt: new Date(2018, 1, 4),
            author: 'Eugeniipol',
            photolink: 'Pictures/Grodno.jpg',
            hashtags: ['Belarus'],
            likes: [],
            del: false
        },
        {
            id: '14',
            description: 'Nesvizh',
            createdAt: new Date(2018, 1, 14),
            author: 'Vitaut',
            photolink: 'Pictures/Nesvizh.png',
            hashtags: [],
            likes: ['Vasya'],
            del: false
        },
        {
            id: '15',
            description: 'Palace',
            createdAt: new Date(2013, 12, 12),
            author: 'Vitaut',
            photolink: 'Pictures/Homel.jpg',
            hashtags: [],
            likes: ['Eugeniipol'],
            del: false
        },
        {
            id: '16',
            description: 'Hills',
            createdAt: new Date(2013, 7, 23),
            author: 'Eugeniipol',
            photolink: 'Pictures/Vitebsk.jpg',
            hashtags: ['beauty'],
            likes: [],
            del: false
        },
        {
            id: '17',
            description: 'Skyline',
            createdAt: new Date(2017, 12, 31),
            author: 'Vasya',
            photolink: 'Pictures/Grodno.jpg',
            hashtags: [],
            likes: ['Vitaut', 'Eugeniipol'],
            del: false
        },
        {
            id: '18',
            description: 'Sovietskaya street',
            createdAt: new Date(2017,8 , 14),
            author: 'Vitaut',
            photolink: 'Pictures/Brest.jpg',
            hashtags: ['Belarus'],
            likes: ['Vasya'],
            del: false
        },
        {
            id: '19',
            description: 'Theatre',
            createdAt: new Date(2012, 11, 14),
            author: 'Vasya',
            photolink: 'Pictures/Mogilev.jpg',
            hashtags: ['culture'],
            likes: ['Vitaut'],
            del: false
        },
        {
            id: '20',
            description: 'Big city life',
            createdAt: new Date(2017, 6, 6),
            author: 'Eugeniipol',
            photolink: 'Pictures/Minsk.jpg',
            hashtags: ['evening'],
            likes: ['Vitaut', 'Vasya'],
            del: false
        }
    ];

    return {
        getPhotoPosts: function (begin, number, filterCondig) {
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
                    if (Modul.checkFilters(photoPosts[i], filterCondig)) {
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
                aDate = new Date(a.createdAt);
                bDate = new Date(b.createdAt);
                return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
            });
            return newPosts;
        },

        checkFilters: function (element, filters) {
            if (filters.hashtags) {
                for (k = 0; k < filters.hashtags.length; k++) {
                    if (element.hashtags.indexOf(filters.hashtags[k]) === -1) {
                        return false;
                    }
                }
            }
            if (filters.author) {
                if (filters.author !== element.author) {
                    return false;
                }
            }
            return true;
        },


        getPhotoPost: function (number) {
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
                        if ((object.createdAt instanceof Date) === false) {
                            console.log('Wrong type!');
                            return false;
                        }
                        break;
                    case 'photoLin':
                        if (object.photolink.length === 0) {
                            console.log('Empty photoLink field');
                            return false;
                        }
                    case 'author':
                        if (object.author.length === 0) {
                            console.log('Empty author field');
                            return false;
                        }
                }
            }
            return true;
        },


        addPhotoPost: function (element) {
            for (var k = 0; k < photoPosts.length; k++) {
                if (photoPosts[k].id === element.id) {
                    console.log('Element with such ID already exists');
                    return false;
                }
            }
            if (Modul.validatePhotoPost(element) == true) {
                photoPosts.push(element);
                return true;
            }
            return false;
        },


        editPhotoPost: function (id, object) {
            let success = false;
            let requested = photoPosts.find(function (element, index, array) {
                if (element.id === String(id)) {
                    let temp = {};
                    for (let key in element) {
                        temp[key] = element[key];
                    }
                    for (let key in object) {
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
                    if (Modul.validatePhotoPost(temp) === true) {
                        photoPosts[index] = temp;
                        success = true;
                    }
                }
            });
            return success;
        },

        removePhotoPost: function (object) {
            var idx = object - 1;
            if (idx < photoPosts.length && idx >= 0) {
                photoPosts.splice(idx, 1);
                return true;
            }
            return false;
        },

        countLength: function () {
            return photoPosts.length;
        }

        /*testing: function () {

//Получение новых массивов:
            var newMassive = [];
            var newMassiveAuthor = [];
            var newMassiveHashAuthor = [];
            var newShowMassive = [];
//Новый массив отфильтрованый по хэштегам и автору
            newMassiveHashAuthor = Modul.getPhotoPosts(1, 8, {hashtags: ['beauty'], author: 'Vitaut'});
            console.log(newMassiveHashAuthor);
//Новый массив отфильтрованый только по автору
            newMassiveAuthor = Modul.getPhotoPosts(1, 8, {author: 'Eugeniipol'});
            console.log(newMassiveAuthor);
//Новый массив без применения фильтров
            newMassive = Modul.getPhotoPosts(1, 8);
            console.log(newMassive);
//Создание массива эквивалентного исходному для наглядной демонстрации работы методов
            newShowMassive = Modul.getPhotoPosts(0, 20);
            console.log(newShowMassive);


//Получение объекта по id
            var photoPost = Modul.getPhotoPost(10);
            console.log(photoPost);
//Выход за пределы массива
            var falsePhotoPost = Modul.getPhotoPost(22);
            console.log(falsePhotoPost);


//Проверка на валидность элемента
            console.log(Modul.validatePhotoPost(photoPosts[3]));
//Проверка на валидность даёт отрицательный резульатат
            console.log(Modul.validatePhotoPost((photoPosts[12])));


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
            console.log(Modul.addPhotoPost(addObject));
            console.log(photoPosts);
//Объект не пройдёт проверку на валидность и добавление не произойдёт
            var addFasleObject = {
                id: '23',
                description: 'Fasle object',
                author: 'Somebody',
                hashtags: [],
                likes: []
            }
            console.log(Modul.addPhotoPost(addFasleObject));


//Изменение фотопоста
            console.log(Modul.editPhotoPost(2, {description: 'Hello world'}));
//Вывод изменённого элемента(в скопированных в самом начале массивах, объект c id = 2 имеет другое описание)
            console.log(photoPosts[1]);


//Удаление фотопоста(в скопированном в самом начале массиве, элемент с таким id существует)
            Modul.removePhotoPost(5);
            console.log(photoPosts);
        }*/
    }
})();



