const articles = await loadJSON("articles.json")
export const published_articles = articles[0][1]
export const draft_articles = articles[1][1]
const inbox = await loadJSON("inbox.json")
export const inbox_messages = inbox[0][1]
export const unread_messages = inbox[1][1]


async function loadJSON(file) {
    const res = await fetch(`./${file}`)
    const data = await res.json()
    return Object.entries(data)
}


let n = new Date().toString()
let time_split = n.split(" ")
let month = time_split[1]
let date = time_split[2]
let year = time_split[3]
export const time_format = `${month} ${date} ${year}`

function get_pub_count() {
    let pubcount = published_articles.length
    document.querySelector('.stats > .publish').children[0].innerHTML = pubcount
}

function get_draft_count() {
    let draft_count = draft_articles.length
    document.querySelector('.stats > .drafts').children[0].innerHTML = draft_count
}

function get_total_views() {
    let total_view = 0
    for (const element of published_articles) {
        total_view += element.view_count
    }
    document.querySelector('.stats > .views').children[0].innerHTML = total_view.toString()
}

function get_message_count() {
    let message_count = 0
    for (const element of inbox_messages) {
        if (!element.readMessage) {
            message_count += 1
        }
    }
    document.querySelector('.stats > .messages').children[0].innerHTML = message_count.toString()
}

function get_most_read() {
    let most_read_name = ""
    let most_read_views = 0
    for (const element of published_articles) {
        if (element.view_count > most_read_views) {
            most_read_views = element.view_count
            most_read_name = element.title
        }
    }
    document.querySelector('.most-viewed').children[1].innerHTML = `${most_read_name} (${most_read_views} views)`
}
if (document.body.id == "admin") {
    get_most_read()
    get_message_count()
    get_total_views()
    get_draft_count()
    get_pub_count()
}
function get_admin_links() {
    let m = document.querySelector('.link-article')
    social_links.visit.forEach(i => {
        let o = document.createElement("a")
        o.className = "click"
        o.innerHTML = `\n                    <svg width="24" fill="currentColor"><use href="#${i[0].toLowerCase()}"></use></svg>\n                    @${i[1]}\n                `
        if (i[2]) {
            o.href = i[2]
            m.appendChild(o)
        }
    })
}



