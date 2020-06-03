let _metaData = {};
let _sortedData = [];

(async function() {
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
        // 各個屬性的 time 部份因固定拆分成三區段，每個區段間隔 12 小時
        // 故省略開始與結束時間，繪製時再即時計算即可
        // 五種屬性皆只取出 parameterName，大幅簡化資料結構
        forecastData.dataset.location.forEach(county => {
            let temp;

            temp["name"] = county.locationName;

            county.weatherElement.forEach(element => {
                temp[element.elementName] = [1,2,3];
            });
        });
    }
}());