const cardData = [
    {
        image: 'http://192.168.37.37/laboratoare/03/img/01.jpg',
        title: 'The Joy of Javascript',
        author: "Luis Atencio",
        year: '2021',
        url: 'https://github.com/JoyOfJavaScript/joj',
    },
    {
        image: 'http://192.168.37.37/laboratoare/03/img/02.jpg',
        title: 'Javascript from Begginer to Professional',
        author: "Laurence Lars Svekis, Maaike van Putten, Rob Percival",
        year: '2022',
        url: 'https://www.libristo.ro/ro/carte/javascript-from-beginner-to-professional_38446600',

    },
    {
        image: 'http://192.168.37.37/laboratoare/03/img/03.jpg',
        title: 'JavaScript From Zero to Hero',
        author: 'Rick Sekuloski',
        year: '2022',
        url: 'https://www.amazon.com/JavaScript-Zero-Hero-Complete-Programming-ebook/dp/B09R73RWH2',
    },
    {
        image: 'http://192.168.37.37/laboratoare/03/img/04.jpg',
        title: 'Javascript: Javascript basics for Beginners',
        author: 'Vickler, Andy',
        year: '2023',
        url: 'https://www.amazon.com/Javascript-basics-Beginners-Andy-Vickler-ebook/dp/B08XPQRFJK/',
    },
    {
        image: 'http://192.168.37.37/laboratoare/03/img/06.png',
        title: 'Eloquent JavaScript, 3rd Edition',
        author: 'Marijn Haverbeke',
        year: '2021',
        url: 'https://www.amazon.com/Eloquent-JavaScript-3rd-Introduction-Programming-ebook/dp/B07C96Q217/',
    },
    {
        image: 'http://192.168.37.37/laboratoare/03/img/08.jpg',
        title: 'Secrets of the JavaScript Ninja',
        author: 'John Resig, Bear Bibeault, Josip Maras',
        year: '2018',
        url: 'https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition',
    },
    {
        image: 'http://192.168.37.37/laboratoare/03/img/07.png',
        title: 'Learn JavaScript Quickly',
        author: 'Josip Maras',
        year: '2018',
        url: 'https://techbootcamps.utexas.edu/blog/best-ways-to-learn-javascript/',
    },
    {
        image: 'http://192.168.37.37/laboratoare/03/img/09.jpg',
        title: 'Distributed Systems with Node.js',
        author: 'Thomas Hunter II',
        year: '2020',
        url: 'https://www.oreilly.com/library/view/distributed-systems-with/9781492077282/',
    },
    {
        image: 'http://192.168.37.37/laboratoare/03/img/05.jpg',
        title: 'MERN Projects for Beginners',
        author: 'Nabendu Biswas',
        year: '2019',
        url: 'https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition',
    },



];
const postContainer = document.querySelector('.card-container');
console.log(postContainer);
const postMethods = () => {
    cardData.map((postData) => {
        const postElement = document.createElement('div');
        postElement.classList.add('card');
        postElement.innerHTML = `
        <img src = "${postData.image}" alt = "Eroare" width ="110">
        
        <a href="${postData.url}" class="card-title">${postData.title}</a>
        <p class = "card-author">${postData.author}</p>
        <p class = "card-year">${postData.year}</p>
        `
        postContainer.appendChild(postElement);
    })
}
postMethods();