function getTimestampsByDescription(xml, description) {
  //  Write your code here
  const splitedXml = xml.split('\n');
  const timestamps = [];
  for (let i = 0; i < splitedXml.length; i++) {
    const xml = splitedXml[i];
    if (xml.indexOf(description) > -1) {
      const indexOfTimestamp = splitedXml[i - 1].indexOf('timestamp=') + 11;
      const timestamp = splitedXml[i - 1].substr(indexOfTimestamp, 10);
      timestamps.push(timestamp);
    }
  }
  return timestamps;
}

var xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<log>
  <event timestamp="1614285589">
    <description>Intrusion detected</description>
  </event>
  <event timestamp="1614286432">
    <description>Intrusion ended</description>
  </event>
</log>`;

var timestamps = getTimestampsByDescription(xmlData, 'Intrusion ended');
console.log(timestamps == undefined ? timestamps : timestamps.join());
