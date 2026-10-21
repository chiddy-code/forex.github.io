const articles = await loadJSON("articles.json")
const published_articles = articles[0][1]
const draft_articles = articles[1][1]
const inbox = await loadJSON("inbox.json")
const inbox_messages = inbox[0][1]
const unread_messages = inbox[1][1]


async function loadJSON(file) {
    const res = await fetch(`./${file}`)
    const data = await res.json()
    return Object.entries(data)
}

function get_articles(articles_container) {
    let frag = window.location.hash
    let id_check = true
    let id = frag.slice(1)
    let n = document.querySelector(articles_container)
    for (const article of published_articles) {

        if (id != article.id) {
            let z = load_article(article.image, article.title, article.genre, article.Intro, article.view_count, article.timestamp)
            z.children[1].removeChild(z.children[1].children[5])
            z.children[1].removeChild(z.children[1].children[1])
            let mn = document.createElement('a')
            mn.href = `http://127.0.0.1:3000/article.html#${article.id}`
            mn.innerHTML = "Read this article >"
            z.children[1].appendChild(mn)
            n.appendChild(z)
        }
    }
}

function get_genre_articles(articles_container, genre_focused = true) {
    let articles_holder = document.querySelector(articles_container).children
    /*let url = new URLSearchParams(window.location.search)
    let id = url.get('id')*/
    for (const e of articles_holder) {
        console.log(e)
        for (const article of published_articles) {
            if (article.genre == e.id) {
                let z = load_article(article.image, article.title, article.genre, article.Intro, article.view_count, article.timestamp)
                z.children[1].removeChild(z.children[1].children[5])
                z.children[1].removeChild(z.children[1].children[1])
                let mn = document.createElement('a')
                mn.href = `http://127.0.0.1:3000/article.html#${article.id}`
                mn.innerHTML = "Read this article >"
                z.children[1].appendChild(mn)
                e.appendChild(z)
            }
        }
    }

}

if (document.body.id == 'articles') {
    get_genre_articles('main.container')
}

if (document.body.id == 'article') {
    load_article_page()
    get_articles('.more')
}

if (document.body.id == 'bio') {
    get_latest_articles('.latest-articles')
}
function get_latest_articles(articles_container = "") {
    let v = document.querySelector(articles_container)
    let article_id_arr = []
    //let latest_article_count = 3
    for (const article of published_articles) {
        article_id_arr.push(Number(article.id))
    }

    let sorted_arr = sortNumArray(article_id_arr)
    for (const id of sorted_arr.slice(0, 3)) {
        for (const article of published_articles) {
            if (article.id == id.toString()) {

                let n = load_article(article.image, article.title, article.genre, article.Intro, article.view_count, article.timestamp)
                n.children[1].removeChild(n.children[1].children[5])
                n.children[1].removeChild(n.children[1].children[1])
                let mn = document.createElement('a')
                mn.href = `http://127.0.0.1:3000/article.html#${article.id}`
                 mn.innerHTML = "Read this article >"
                n.id = article_index
                n.children[1].appendChild(mn)
                v.appendChild(n)
            }
        }
    }
}

function load_article(img, title, category, intro, views, time_format) {
    let m = document.createElement('div')
    m.className = "box"
    let status = ""

    m.innerHTML = `\n            <div class="article-img"><img src="${img}" alt="${title}"></div>\n            <div class="article-content-display">\n              <strong>${title}</strong> <span class="badge"></span> <span class="badge">${toNormalCase(category.replace("-", " "))}</span>\n              <div class="small"><span>${time_format}</span> • <span>${views} views</span></div>\n              <p  class="intro">${intro}</p>\n              <div class="article-functions">\n                <button class="button" onclick="open_edit_popup(this)">Edit</button>\n                <button class="button">Backlink</button>\n                <button class="button" style="background-color: red;">Delete</button>\n              </div>\n            </div>\n\n          `

    return m
}



if (document.body.id == 'admin') {
    get_admin_articles()
}

function load_article_page() {
    let frag = window.location.hash
    let id_check = true
    let id = frag.slice(1)
    let m = document.querySelector('.article')
    if (id_check) {
        if (id == null || isNaN(Number(id))) {
            document.body.innerHTML = "Error: Forbidden Entry"
        } else {
            let found_id = false
            for (const article of published_articles) {
                if (article.id == id) {
                    document.title = article.title.trim()
                    m.innerHTML = get_article_layout(article.image, article.title, article.genre, article.Intro, article.content, article.view_count, article.footnote, article.timestamp)
                    found_id = true
                    break
                } else {
                    m.innerHTML = "loading article...."
                }
            }
            if (!found_id) {
                document.body.innerHTML = "Article does not exist!! 404 Not Found"
            }
        }
    } else {
        document.body.innerHTML = "Error: Forbidden Entry"
    }
}

function get_article_layout(image, title, category, intro, content, view_count, footnote, time_format) {
    return ` \n\n      <a class="back" href="articles.html">← Back to all articles</a>\n\n      <h1>${title}</h1>\n      <p class="date">${time_format} &bull; ${view_count} views <span class="category">${toNormalCase(category.replace("-", " "))}</span>\n      </p>\n\n      <img class="article-image" src="${image}" alt="Chart showing a position-sizing example">\n\n      \x3C!-- Write the article text here. Use <p> for paragraphs and <h2> for sub-headings. -->\n  <div class="article-body">${intro}</div> <br> <br>   <div class="article-body">${content}<p class="date">\n     <br> <br>   <div class="article-body date">${footnote}</div>.\n        </p>\n\n      </div>\n\n\n`
}

function get_article_demo_layout(image, title, category, intro, content, footnote, view_count = "0") {
    let img;
    if (image.trim() == "") {
        img = ""
    } else {
        img = `<img class="article-image" src="${image}" alt="Chart showing a position-sizing example"> `
    }

    return `<h1>${title}</h1>\n      <p class="date">${time_format} &bull; ${view_count} views <span class="category">${category}</span>\n      </p>\n\n      ${img}\n\n      \x3C!-- Write the article text here. Use <p> for paragraphs and <h2> for sub-headings. -->\n  <div class="article-body">${intro}</div> <br> <br>   <div class="article-body">${content}<p class="date">\n     <br> <br>   <div class="article-body date">${footnote}</div>.\n        </p>\n\n      </div>\n\n\n`
}

function sortNumArray(numArray) {
    let n = []
    for (let index = 0; index < numArray.length; index++) {
        let largest = 0
        for (const y of numArray) {
            if (!n.includes(y)) {
                if (y > largest) {
                    largest = y
                }
            }
        }
        n.push(largest)
    }
    return n
}

function toNormalCase(string) {
    let v = string
    let arr = v.split("")
    let first = arr[0].toUpperCase()
    arr[0] = first
    return arr.join('')
}
