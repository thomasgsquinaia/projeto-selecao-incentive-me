require("dotenv").config();
const {App}=require('./app')
async function main(){
    const app = new App();
    app.init()
}
main()