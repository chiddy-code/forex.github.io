let social_links = {
    visit: [["Facebook", "juvirtrades", "https://web.facebook.com/profile.php?id-100088174094010", true],
    ["Youtube", "juvirtrades", "https://youtube.com/c/juvirtrades", true],
    ["X", "JT", "https://x.com/${h}", false],
    ["Whatsapp", "JT", "https://wa.me/${h}", false],
    ["Instagram", "juvirtradesacademy", "https://instagram.com/juvirtradesacademy", true],
    ["TikTok", "JT", "https://tiktok.com/${h}", false],
    ["Telegram", "juvirtrades", "https://t.me/+cZULMzeLaBNIYmM0", true],
    ["Threads", "", "", false]
    ]
}

async function loadJSON(file) {
    const res = await fetch(`./${file}`)
    const data = await res.json()
    return Object.entries(data)
}

const articles = await loadJSON("articles.json")
const published_articles = articles[0][1]
const draft_articles = articles[1][1]


function get_social_checks(container) {
    let n = document.querySelector(container)
    for (const social of social_links.visit) {
        let status = social[3] ? "checked" : ""
        let nt = `<div class="social-checkbox">
              <input type="checkbox" name="Threads" id="Social" ${status}><span>${social[0]}</span><span style="display: none">${social[2]}</span>
            </div>`
        n.innerHTML += nt
    }
}

get_social_checks(".social-checks")
get_social_input(".social-inputs", ".social-checks")



function get_admin_articles() {
    let v = document.querySelector(".article-holder")
    let draft_index = 0
    for (const article of draft_articles) {
        let published_article = load_article(article.image, article.title, article.genre, article.Intro, article.view_count, article.timestamp, article.id)
        published_article.id = draft_index
        published_article.children[1].children[1].innerHTML = "&bull;"
        published_article.children[1].children[1].style.backgroundColor = "#d6a401"
        published_article.children[1].children[1].style.color = "#6e5605"
        published_article.remove(published_article.children[1].children[5].children[1])
        published_article.classList.add("draft")
        v.appendChild(published_article)
        draft_index += 1
    }
    let published_index = 0
    for (const article of published_articles) {
        let published_article = load_article(article.image, article.title, article.genre, article.Intro, article.view_count, article.timestamp)
        published_article.children[1].children[1].innerHTML = "&check;"
        published_article.id = published_index
        let mn = document.createElement('a')
        mn.target = "_blank"
        mn.href = `http://127.0.0.1:3000/article.html?id=${article.id}`
        mn.style.color = "white"
        mn.style.textDecoration = "none"
        mn.innerHTML = "Read"
        published_article.children[1].children[5].children[1].innerHTML = mn.outerHTML
        v.appendChild(published_article)
        published_index += 1
    }
}
get_admin_articles()
document.addEventListener('click', (e) => {
            const btn = e.target.closest(".art-edit");
            if (!btn) return;
            open_edit_popup(e.target)
        })

document.addEventListener('click', (e) => {
            const btn = e.target.closest("summary");
            if (!btn) return;
            open_create_popup()
        })
function get_social_input(container, checkbox) {
    for (const element of document.querySelector(checkbox).children) {
        //// console.log(element)
        if (element.children[0].checked) {
            let handle = element.children[1].textContent.trim()
            let link = element.children[2].innerText.trim()
            let m = document.querySelector(container)
            let mt = `<label class="field" for="s-x">${handle}</label><input type="text" id="s-x" name="x" placeholder="Type profile link / handle" value="${link}">`
            m.innerHTML += mt
        }
    }
}


function close_popup_from_back(parent) {
    document.body.removeChild(parent.parentElement)
}

function close_popup_from_btn(button) {
    document.body.removeChild(button.parentElement.parentElement.parentElement.parentElement)
}

function open_create_popup() {
    let popup_screen = document.createElement('div')
    popup_screen.className = "popup-screen"
    let popup_back = document.createElement('div')
    popup_back.className = "popup-back"
    popup_back.setAttribute("onclick", "close_popup_from_back(this)")
    let popup_content = document.createElement('div')
    popup_content.className = "popup-content"

    let publish_popup = `<div class="inside">
        <div class="form-top">
          <div class="form-title">Create article</div> <button class="button" onclick="close_popup_from_btn(this)">Close</button>
        </div>
        <div class="form-content">
          <div class="form-edit-content">
            <span style="font-size: small; margin:1em 0;">' * ' marks compulsory fields</span>
            <br><br>
            <label class="field">Title *</label>
            <textarea id="new-title" name="title" style="height: 6em;" required="" oninput="get_preview(this.parentElement)"></textarea>

            <label class="field" for="new-category">Category *</label>
            <select id="new-category" name="category" required="" oninput="get_preview(this.parentElement)">
              <option value="Forex Strategy">Forex Strategy</option>
              <option value="Market Analysis">Market Analysis</option>
              <option value="Trading Education">Trading Education</option>
              <option value="Trade Ideas">Trade Ideas</option>
              <option value="News">News</option>
            </select>

            <span style="font-size: small; margin:1em 0;"> - Leaving 'Article image link' blank will publish this
              article
              without picture</span>
            <br><br>

            <label class="field" for="new-pic">Article image link </label>
            <textarea id="new-pic" name="pic" style="height: 6em; min-height: 6em;" oninput="get_preview(this.parentElement)"></textarea>

            <div style="display: flex; align-items: center;padding-bottom: 1em;">
              <input type="checkbox" id="text-formatting" onclick="get_preview(this.parentElement.parentElement)">
              <span style="font-size: 0.8em; padding-left: 0.5em;">Advanced Text Formatting</span>
            </div>

            <label class="field" for="new-intro">Article Intro *</label>
            <textarea id="new-intro" name="intro" value="uu" required="" oninput="get_preview(this.parentElement)"></textarea>

            <label class="field" for="new-body">Article Text *</label>
            <textarea id="new-body" name="body" required="" oninput="get_preview(this.parentElement)"></textarea>

            <label class="field" for="new-footnote">Article Footnote</label>
            <textarea id="new-footnote" name="body" required="" oninput="get_preview(this.parentElement)"></textarea>

            <button class="button" type="submit" onclick="publish(this)">Save</button>
            <button class="button" style="background-color:#787978" onclick="Draft(this)">Draft</button>
          </div>
          <div class="form-edit-preview">
          </div>
        </div>
      </div>`
    popup_content.innerHTML = publish_popup

    popup_screen.appendChild(popup_back)
    popup_screen.appendChild(popup_content)

    document.body.appendChild(popup_screen)

}

function open_edit_popup(nu) {
    let popup_screen = document.createElement('div')
    popup_screen.className = "popup-screen"
    let popup_back = document.createElement('div')
    popup_back.className = "popup-back"
    popup_back.setAttribute("onclick", "close_popup_from_back(this)")
    let popup_content = document.createElement('div')
    popup_content.className = "popup-content"

    let title = nu.parentElement.parentElement.parentElement.childNodes[3].children[0].innerHTML
    let category = nu.parentElement.parentElement.children[2].innerHTML.trim()
    let img = nu.parentElement.parentElement.parentElement.children[0].children[0].src
    let intro = nu.parentElement.parentElement.parentElement.childNodes[3].children[4].innerHTML.trim()
    let content = get_article_message(nu, intro, category, title)
    let view_count = "0"
    let footnote = get_article_footnote(nu, intro, category, title)

    let edit_popup = `<div class="inside">
        <div class="form-top">
          <div class="form-title">Edit article</div> <button class="button" onclick="close_popup_from_btn(this)">Close</button>
        </div>
        <div class="form-content">
          <div class="form-edit-content">
            <span style="font-size: small; margin:1em 0;">' * ' marks compulsory fields</span>
            <br><br>
            <label class="field">Title *</label>
            <textarea id="new-title" name="title" style="height: 6em;" required="" oninput="get_preview(this.parentElement)">${title}</textarea>

            <label class="field" for="new-category">Category *</label>
            <select id="new-category" name="category" required="" oninput="get_preview(this.parentElement)">
              <option value="Forex Strategy">Forex Strategy</option>
              <option value="Market Analysis">Market Analysis</option>
              <option value="Trading Education">Trading Education</option>
              <option value="Trade Ideas">Trade Ideas</option>
              <option value="News">News</option>
            </select>

            <span style="font-size: small; margin:1em 0;"> - Leaving 'Article image link' blank will publish this
              article
              without picture</span>
            <br><br>

            <label class="field" for="new-pic">Article image link </label>
            <textarea id="new-pic" name="pic" style="height: 6em; min-height: 6em;" oninput="get_preview(this.parentElement)">${img}</textarea>

            <div style="display: flex; align-items: center;padding-bottom: 1em;">
              <input type="checkbox" id="text-formatting" onclick="get_preview(this.parentElement.parentElement)">
              <span style="font-size: 0.8em; padding-left: 0.5em;">Advanced Text Formatting</span>
            </div>

            <label class="field" for="new-intro">Article Intro *</label>
            <textarea id="new-intro" name="intro" value="uu" required="" oninput="get_preview(this.parentElement)">${intro}</textarea>

            <label class="field" for="new-body">Article Text *</label>
            <textarea id="new-body" name="body" required="" oninput="get_preview(this.parentElement)">${content}</textarea>

            <label class="field" for="new-footnote">Article Footnote</label>
            <textarea id="new-footnote" name="body" required="" oninput="get_preview(this.parentElement)">${footnote}</textarea>

            <button class="button" type="submit" onclick="publish(this)">Publish</button>
            <button class="button" style="background-color:#787978" onclick="Draft(this)">Draft</button>
          </div>
          <div class="form-edit-preview">
          </div>
        </div>
      </div>`

      
    popup_content.innerHTML = edit_popup
    popup_content.children[0].children[1].children[0].children[6].value = category


    popup_screen.appendChild(popup_back)
    popup_screen.appendChild(popup_content)
   /* document.querySelector('.form-edit-content > textarea, .form-edit-content > select, .form-edit-content > input').addEventListener('input', (e) => {get_preview})*/
    document.body.appendChild(popup_screen)

}

function load_article(img, title, category, intro, views, timestamp) {
    let m = document.createElement('div')
    m.className = "box"
    let status = ""

    m.innerHTML = `\n            <div class="article-img"><img src="${img}" alt="${title}"></div>\n            <div class="article-content-display">\n              <strong>${title}</strong> <span class="badge"></span> <span class="badge">${toNormalCase(category.replace("-", " "))}</span>\n              <div class="small"><span>${timestamp}</span> • <span>${views} views</span></div>\n              <p style="margin: 1em 0;" class="intro">${intro}</p>\n              <div class="article-functions">\n                <button class="button art-edit">Edit</button>\n               
     <button class="button visit"></button>\n                <button class="button" style="background-color: red;">Delete</button>\n              </div>\n            </div>\n\n          `

    return m
}

function publish(article_data) {

    let title = article_data.parentElement.children[4].value

    let category = article_data.parentElement.children[6].value

    let img = article_data.parentElement.children[11].value

    let intro = article_data.parentElement.children[14].value

    let body = article_data.parentElement.children[16].value

    let checked = article_data.parentElement.children[12].children[0].checked


    if (img.trim() == "") {
        img = "N/A"
    }

    let format = `Title: ${title}, \n Category: ${category}, \n Image: ${img}, \n Image: ${intro}, \n Body: ${body.toString()}, \n Checked: ${checked}`

    console.log(format)
}

function edit_article(nu) {
    let title = nu.parentElement.parentElement.children[0].textContent
    let category = nu.parentElement.parentElement.children[2].innerHTML.trim()
    let img = nu.parentElement.parentElement.parentElement.children[0].children[0].src
    let intro = nu.parentElement.parentElement.children[2].innerText.trim()
    let content = get_article_message(intro, category, title)
    let view_count = "0"
}


function get_article_message(bn, intro, category, title) {
    let o = "";
    if (bn.parentElement.parentElement.parentElement.classList.contains("draft")) {
        for (const sect of draft_articles) {
            if ((sect.genre == category.toLowerCase()) && (sect.Intro == intro) && (sect.title == title)) {
                o = sect.content
                break
            }
        }
    } else {
        for (const sect of published_articles) {
            if ((sect.genre == category.toLowerCase()) && (sect.Intro == intro) && (sect.title == title)) {
                o = sect.content
                break
            }
        }
    }
    console.log(o)
    return o;
}

function get_article_footnote(bn, intro, category, title) {
    let o = "";
    console.log("u")
    if (bn.parentElement.parentElement.parentElement.classList.contains("draft")) {
        for (const sect of draft_articles) {
            if ((sect.genre == category.toLowerCase()) && (sect.Intro == intro) && (sect.title == title)) {
                o = sect.footnote
                break
            }
        }
    } else {
        for (const sect of published_articles) {
            if ((sect.genre == category.toLowerCase()) && (sect.Intro == intro) && (sect.title == title)) {
                o = sect.footnote
                break
            }
        }
    }
    console.log(o)
    return o;
}


function Draft(article_data) {

    let title = article_data.parentElement.children[4].value

    let category = article_data.parentElement.children[6].value

    let img = article_data.parentElement.children[11].value

    let intro = article_data.parentElement.children[14].value

    let body = article_data.parentElement.children[16].value

    let checked = article_data.parentElement.children[12].children[0].checked


    if (img.trim() == "") {
        img = "N/A"
    }

    let format = `Title: ${title}, \n Category: ${category}, \n Image: ${img}, \n Image: ${intro}, \n Body: ${body.toString()}, \n Checked: ${checked}`
    console.log(format)
}

function toNormalCase(string) {
    let v = string
    let arr = v.split("")
    let first = arr[0].toUpperCase()
    arr[0] = first
    return arr.join('')
}

