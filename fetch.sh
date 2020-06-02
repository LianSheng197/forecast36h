#!/bin/bash

curl --silent --header "Accept: application/json" \
"https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=rdec-key-123-45678-011121314&format=JSON" > ./resources/data.json