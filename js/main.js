let _metaData = {};
let _sortedData = [];

(async function () {
    // 取得預報資料
    let forecastData = await fetch("resources/data.json").then(
        r => r.json()
    ).then(
        j => j.cwbopendata
    ).catch(
        e => {
            console.log(e);
            return "error";
        }
    );

    if (forecastData != "error") {
        _metaData = {
            "description": forecastData.dataset.datasetInfo.datasetDescription,
            "provider": forecastData.sender,
            "updateTime": forecastData.sent
        };

        // 資料預處理，並簡化格式
        // 各個屬性的 time 部份因固定拆分成三區段
        // 故省略開始與結束時間，繪製時再即時計算即可
        // 五種屬性皆只取出 parameterName，大幅簡化資料結構
        forecastData.dataset.location.forEach(county => {
            let temp = {};

            temp["name"] = county.locationName;

            county.weatherElement.forEach(element => {
                temp[element.elementName] = [];

                // 每個屬性都被切成三個時段
                // 若發佈時間爲早上，則中午 12 時開始，每段爲 [6, 12, 12] 小時
                // 若發佈時間爲傍晚，則晚上 18 時開始，每段爲 [12, 12, 12] 小時
                for (let i = 0; i < 3; i++) {
                    temp[element.elementName][i] = element.time[i].parameter.parameterName;
                }
            });

            _sortedData.push(temp);
        });

        console.log(_metaData);
        console.log(_sortedData);
    } else {
        alert("取得預報資料時出錯，請重新整理");
        return;
    }
}());


// 觸發導入片段檔的事件註冊
document.querySelectorAll("a[data-link]").forEach(each => {
    each.addEventListener("click", async () => {
        let link = each.getAttribute("data-link");
        insertPartialHTML(link);
    });
});

// 引入外部片段檔
async function insertPartialHTML(filename) {
    let content = document.querySelector("div#content");
    let targetFile = `pages/${filename}.html`;

    let html = await fetch(targetFile).then(
        r => r.text()
    );

    // 添加非 script 的 HTML
    content.innerHTML = html.replace(/<script>[^]+?<\/script>/, "");
    

    // 添加 script
    let script = html.match(/<script>([^]+?)<\/script>/);

    if (script != null) {
        let s = document.createElement('script');
        s.type = "text/javascript";
        
        s.innerHTML = script[1];
        content.appendChild(s);
    }    
}

insertPartialHTML("index");