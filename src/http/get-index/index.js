'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var arc = _interopDefault(require('@architect/functions'));
require('tiny-json-http');

const isAuth = req => {
  return req.session && req.session.account;
};

const getAuthUrl = () => {
  let client_id = process.env.GITHUB_CLIENT_ID;
  let redirect_uri = process.env.GITHUB_REDIRECT;
  let base = 'https://github.com/login/oauth/authorize';
  return `${base}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
};

const html = `
<!doctype html>
<html>
<body>
<a href=${getAuthUrl()}>Sign in with GitHub</a>
</body>
</html>`;

async function http(req) {
  if (isAuth(req)) {
    return {
      location: '/hello',
    };
  }

  return {
    html,
  };
}

const handler = arc.http.async(http);

exports.handler = handler;
