const fs = require('fs')

// Recursively check blog folderss

function getAllPosts(dirPath, arrayOfFiles) {
  
    files = fs.readdirSync(dirPath)
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {

      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllPosts(dirPath + "/" + file, arrayOfFiles)
      } else {

        if(file.endsWith('.md')){
            // const f = matter.read(__dirname + '/public/blog/' + file.slice(0, -3) + '/' + file);
            arrayOfFiles.push({filename : file, path : dirPath + "/" + file })
        }
      }
    })
    return arrayOfFiles
}

  let path = 'blog'
  let posts = getAllPosts(path);
  console.log(posts)

  // Write JSON file

  fs.writeFile('paths.json', JSON.stringify(posts), err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
