document.addEventListener('DOMContentLoaded', () => {
    // Generate Nav bar according to heading 2.
    const ul = document.querySelector('main ul');
    setNavDynamically(ul);
    // Set up an event listener for all <a> in nav ul.
    onClick(ul, 'a', scrollTo);

    const sections = document.querySelectorAll('section');
    const heights = [...sections].map(section => section.offsetTop);
    window.addEventListener('scroll', () => {
        let index = 0;
        heights.map(height => {
            if (window.pageYOffset > height) {
                reassignActiveClass(sections[index])
            }
            index += 1;
        });
    });


    function setNavDynamically(ul) {
        const h2s = document.querySelectorAll('h2');
        [...h2s].map(h2 => ul.innerHTML += getListItem(h2.innerText.toLowerCase()));
    }

    function getListItem(text) {
        return `<li><a href="#${text}">${text}</a></li>`
    }

    function onClick(selector, subSelector, callback) {
        selector.addEventListener('click', event => {
            if (event.target.tagName === subSelector.toUpperCase())
                callback(event);
        });
    }

    function scrollTo(event) {
        event.preventDefault();
        const h2 = document.getElementById(getID(event));
        h2.scrollIntoView({behavior: "smooth"});
        // return h2.parentNode
    }

    function reassignActiveClass(section) {
        const element = document.querySelector('.active');
        if (element) element.classList.remove('active');
        section.classList.add('active')
    }

    function getID(event) {
        return event.target.href.split('#')[1]
    }
});
