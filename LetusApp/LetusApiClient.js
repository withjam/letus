import { LETUS_API_URL } from '@env';

export function mapRecords(jsonData) {
  const records = jsonData.records
    ? jsonData.records.map((record) => {
        const { _header, _values } = record;
        const mapped = _header.map((header, index) => [header, _values[index]]);
        return mapped.reduce((mapped, header) => {
          mapped[header[0]] = header[1];
          return mapped;
        }, {});
      })
    : [];
  return records;
}

export function LetusApiClient(user) {
  this.user = user;
}
LetusApiClient.prototype.authHeader = function () {
  return { 'x-letus-app': this.user.token };
};
LetusApiClient.prototype.getPosts = async function (asUser) {
  console.log('get posts', this.authHeader());
  let result = [];
  try {
    const res = await fetch(LETUS_API_URL + '/GetPosts?as=' + asUser);
    const json = await res.json();
    result = mapRecords(json);
  } catch (ex) {
    console.log(ex);
  }
  return result;
};
LetusApiClient.prototype.createPost = async function (text, asUser) {
  let results = [];
  try {
    const jsonData = { text };
    const [classificationResponse, analyzeResponse] = await Promise.all([
      this.postData('/ClassifyText', jsonData),
      this.postData('/AnalyzeSentiment', jsonData),
    ]);
    const { categories } = await classificationResponse.json();
    const { sentiment } = await analyzeResponse.json();
    console.log({
      text,
      name: asUser,
      categories,
      sentiment,
    });
    const res = await postData('/CreatePost', {
      text,
      name: asUser,
      categories,
      sentiment,
    });
    results = await res.json();
    console.log('createPost', results);
  } catch (ex) {
    console.log('error', ex);
  }
  return results;
};
LetusApiClient.prototype.editUser = async function (info) {
  let results = {};
  try {
    const res = await this.postData('/EditUser', { info });
    const json = await res.json();
    results = json;
  } catch (ex) {
    console.log(ex);
  }
  return results;
};
LetusApiClient.prototype.postData = function (url, data) {
  return fetch(LETUS_API_URL + url, {
    method: 'POST',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      ...this.authHeader(),
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
};
