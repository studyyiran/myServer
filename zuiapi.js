const http = require('http');
const execSync = require('child_process').execSync;
const port = 7010; // company
const fs = require('fs');
const querystring = require('querystring');

function macthUrl(req) {
  const { method, url} = req;
  console.log(method)
  let result
  if (method === 'POST') {
    const urlConfig = [
      {
        path: '/postIcons',
        func: postIcons
      },
    ]
    result = urlConfig.find(({path}) => url.indexOf(path) !== -1)
  } else {
    const urlConfig = [
      {
       path: '/getIcons',
       func: getIcons
      },
      {
        path: '/test',
        func: postIcons
      },
    ]

    result = urlConfig.find(({path}) => url.indexOf(path) !== -1)
  } 
  return result || {
    path: '404',
    func: func404,
  }
}

function func404(req, res) {
  return '404'
}


function getJsonFromData (req) {
  return new Promise((resolve, reject) => {
    let chunk = ''
    req.on('data', (data) => {
      chunk += data
    })
    req.on('end', () => {
      resolve(querystring.parse(chunk))
    })
  })
}

const run = (command) => {
	try {
    console.log('R: ' + command)
		const result = execSync(command);
		return result
	} catch (e) {
		throw new Error('Error is: ' + e.output.join('-'))
	}
}

function getIcons(req, res) {
  console.log('getIcons');
  try {
    run('touch iconConfig.txt')
    return fs.readFileSync('./iconConfig.txt', 'utf8');
  } catch(e) {
    console.error(e)
  }
}

function postIcons(req, res) {
  console.log('postIcons');
  const p = getJsonFromData(req).then((data) => {
    let target
    Object.keys(data).forEach((key) => {
      target = key
    })
    return fs.writeFileSync('./iconConfig.txt', JSON.stringify(target), 'utf8');
  })
  return p
}


http.createServer(function (req,res) {
  const {func} = macthUrl(req);
  const result = func(req, res);
  console.log(result)
  if (result instanceof Promise) {
    result.then((json) => {
      console.log(json)
	const result = {status: 'success', code: 200}
	res.end(JSON.stringify(result));
    })
  } else {
    const response = JSON.stringify({
      data: result
    })
    res.end(response);
  }

}).listen(port);

