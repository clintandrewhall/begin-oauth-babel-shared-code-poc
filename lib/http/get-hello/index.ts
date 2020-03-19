import arc from '@architect/functions';
import { middleware } from '../../common/auth';

const html = `
<!doctype html>
<html>
<body>
<h1>Hello World</h1>
</body>
</html>`;

const http = async req => ({ html });

export const handler = arc.http.async(middleware, http);
