# 今明36小時天氣預報

這只是某堂課的期末作業。  
核心部份要有讀取 JSON 格式檔與引入其它片段檔，其餘不拘，因此界面以簡潔為主。



### 原始資料來源
- [政府資料開放平台：一般天氣預報-今明36小時天氣預報](https://data.gov.tw/dataset/6069)

### 原始資料備註
- [參考文件](https://opendata.cwb.gov.tw/opendatadoc/MFC/ForecastElement.pdf)

### 使用框架
- ~~Vanilla.js~~

### 備註
原始資料使用 fetch 取得時會遇到 CSP 與 CORS 等問題，一一排除後又會遇到 Request Rejected 的狀況。  
基於經驗不足，只好尋求替代方案，改用 curl 存檔後再交由網頁處理。

關於 Request Rejected 的錯誤截圖：
![](screenshots/request_rejected.png)