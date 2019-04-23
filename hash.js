const bcrypt  = require('bcryptjs');



async function run(){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('1234',salt);
    console.log(salt);
    console.log(hash);
}

run();