function close_popup_from_back(parent) {
    document.body.removeChild(parent.parentElement)
}

function close_popup_from_btn(button) {
    document.body.removeChild(button.parentElement.parentElement.parentElement.parentElement)
}

function edit_article_popup() {
    /*
    let creation_form = document.createElement('div')
    creation_form.className = "inside"
    let form_top = document.createElement('div')
    form_top.className = "form-top"
    let second_div = document.createElement('div')
    let form_title = document.createElement('div')
    form_title.className = "form_title"
    let close_button = document.createElement('button')
    close_button.className = "button"
    close_button.innerHTML = "Close"

    let compulsory_note = document.createElement('span')
    compulsory_note.innerHTML = "' * ' marks compulsory fields"
    compulsory_note.style.fontSize = "small"
    compulsory_note.style.margin = "1em 0"

    let br = document.createElement('br')

    let label_1 = document.createElement('label')
    label.innerHTML = "Title *"
    let label_2 = document.createElement('label')
    label.innerHTML = "Title *"
    let label_3 = document.createElement('label')
    label.innerHTML = "Title *"
    let label = document.createElement('label')
    label.innerHTML = "Title *"
    */
    let creation_form = ""

}

function open_create_popup() {
    let popup_screen = document.createElement('div')
    popup_screen.className = "popup-screen"
    let popup_back = document.createElement('div')
    popup_back.className = "popup-back"
    popup_back.setAttribute("onclick", "close_popup_from_back(this)")
    let popup_content = document.createElement('div')
    popup_content.className = "popup-content"

    let publish_popup = `<div class="inside">\n        <div class="form-top">\n          <div class="form-title">Create article</div> <button class="button" onclick="close_popup_from_btn(this)">Close</button>\n        </div>\n        <div>\n          <span style="font-size: small; margin:1em 0;">' * ' marks compulsory fields</span>\n          <br><br>\n          <label class="field">Title *</label>\n          <textarea id="new-title" name="title" style="height: 6em;" required=""></textarea>\n\n          <label class="field" for="new-category">Category *</label>\n          <select id="new-category" name="category">\n            <option value="Forex Strategy">Forex Strategy</option>\n            <option value="Market Analysis">Market Analysis</option>\n            <option value="Trading Education">Trading Education</option>\n            <option value="Trade Ideas">Trade Ideas</option>\n            <option value="News">News</option>\n          </select>\n\n          <span style="font-size: small; margin:1em 0;"> - Leaving 'Article image link' blank will publish an article without  picture</span>\n          <br><br>\n\n          <label class="field" for="new-pic">Article image link </label>\n          <textarea id="new-pic" name="pic" style="height: 6em; min-height: 6em;" required=""></textarea>\n\n          <div style="display: flex; align-items: center;padding-bottom: 1em;">\n            <input type="checkbox" id="text-formatting">\n            <span style="font-size: 0.8em; padding-left: 0.5em;">Advanced Text Formatting</span>\n          </div>\n\n          <label class="field" for="new-intro">Article Intro *</label>\n          <textarea id="new-intro" name="intro" value="uu" required=""></textarea>\n\n          <label class="field" for="new-body">Article Text *</label>\n          <textarea id="new-body" name="body" required=""></textarea>\n\n          <button class="button" type="submit" onclick="publish(this)">Publish</button>\n          <button class="button" style="background-color:#787978" onclick="Draft(this)">Draft</button>\n        </div>\n      </div>`
    popup_content.innerHTML = publish_popup

    popup_screen.appendChild(popup_back)
    popup_screen.appendChild(popup_content)

    document.body.innerHTML += popup_screen.outerHTML

}

function open_edit_popup(nu) {
    let popup_screen = document.createElement('div')
    popup_screen.className = "popup-screen"
    let popup_back = document.createElement('div')
    popup_back.className = "popup-back"
    popup_back.setAttribute("onclick", "close_popup_from_back(this)")
    let popup_content = document.createElement('div')
    popup_content.className = "popup-content"

    let title = nu.parentElement.parentElement.children[0].textContent
    let category = nu.parentElement.parentElement.children[2].innerHTML.trim()
    let img = nu.parentElement.parentElement.parentElement.children[0].children[0].src
    let intro = nu.parentElement.parentElement.children[4].innerText.trim()
    let content = get_article_message(nu, intro, category, title)
    let view_count = "0"

    let edit_popup = `<div class="inside">\n        <div class="form-top">\n          <div class="form-title">Edit article</div> <button class="button" onclick="close_popup_from_btn(this)">Close</button>\n        </div>\n        <div>\n          <span style="font-size: small; margin:1em 0;">' * ' marks compulsory fields</span>\n          <br><br>\n          <label class="field">Title *</label>\n          <textarea id="new-title" name="title" style="height: 6em;" required="">${title}</textarea>\n\n          <label class="field" for="new-category">Category *</label>\n          <select id="new-category" name="category">\n            <option value="Forex Strategy">Forex Strategy</option>\n            <option value="Market Analysis">Market Analysis</option>\n            <option value="Trading Education">Trading Education</option>\n            <option value="Trade Ideas">Trade Ideas</option>\n            <option value="News">News</option>\n          </select>\n\n          <span style="font-size: small; margin:1em 0;"> - Leaving 'Article image link' blank will publish this article\n            without picture</span>\n          <br><br>\n\n          <label class="field" for="new-pic">Article image link </label>\n          <textarea id="new-pic" name="pic" style="height: 6em; min-height: 6em;">${img}</textarea>\n\n          <div style="display: flex; align-items: center;padding-bottom: 1em;">\n            <input type="checkbox" id="text-formatting">\n            <span style="font-size: 0.8em; padding-left: 0.5em;">Advanced Text Formatting</span>\n          </div>\n\n          <label class="field" for="new-intro">Article Intro *</label>\n          <textarea id="new-intro" name="intro" value="uu" required="">${intro}</textarea>\n\n          <label class="field" for="new-body">Article Text *</label>\n          <textarea id="new-body" name="body" required="">${content}</textarea>\n\n          <button class="button" type="submit" onclick="publish(this)">Save</button>\n          <button class="button" style="background-color:#787978" onclick="Draft(this)">Draft</button>\n        </div>\n      </div>`
    popup_content.innerHTML = edit_popup
    popup_content.children[0].children[1].children[6].value = category


    popup_screen.appendChild(popup_back)
    popup_screen.appendChild(popup_content)

    document.body.innerHTML += popup_screen.outerHTML

}

function load_article(img, title, category, intro, views) {
    let m = document.createElement('div')
    m.className = "box"
    let status = ""

    m.innerHTML = `\n            <div class="article-img"><img src="${img}" alt="${title}"></div>\n            <div class="article-content-display">\n              <strong>${title}</strong> <span class="badge"></span> <span class="badge">${category}</span>\n              <div class="small"><span>1 Oct 2026</span> • <span>2:54PM</span> • <span>${views} views</span></div>\n              <p style="margin: 1em 0;" class="intro">${intro}</p>\n              <div class="article-functions">\n                <button class="button" onclick="open_edit_popup(this)">Edit</button>\n                <button class="button">Backlink</button>\n                <button class="button" style="background-color: red;">Delete</button>\n              </div>\n            </div>\n\n          `

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
    console.log("u")
    if (bn.parentElement.parentElement.parentElement.classList.contains("draft")) {
        for (const sect of articles.draft) {
            if ((sect.genre == category) && (sect.Intro == intro) && (sect.title == title)) {
                o = sect.content
                break
            }
        }
    } else {
        for (const sect of articles.published) {
            if ((sect.genre == category) && (sect.Intro == intro) && (sect.title == title)) {
                o = sect.content
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